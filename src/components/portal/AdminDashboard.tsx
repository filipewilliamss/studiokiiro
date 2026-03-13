import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { LogOut, Users, FolderKanban, DollarSign, FileText, Receipt, Sparkles, Layers, BarChart3, Clock } from "lucide-react";
import ClientsTab from "./admin/ClientsTab";
import ProjectsTab from "./admin/ProjectsTab";
import FinanceTab from "./admin/FinanceTab";
import ServiceOrdersTab from "./admin/ServiceOrdersTab";
import QuotesTab from "./admin/QuotesTab";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { key: "clients", label: "Clientes", icon: Users },
  { key: "projects", label: "Projetos", icon: FolderKanban },
  { key: "finance", label: "Financeiro", icon: DollarSign },
  { key: "quotes", label: "Orçamentos", icon: Receipt },
  { key: "service-orders", label: "Ordens de Serviço", icon: FileText },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const AdminDashboard = () => {
  const { profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>("clients");
  const [counts, setCounts] = useState({ clients: 0, projects: 0, quotes: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isInPanel, setIsInPanel] = useState(false);

  useEffect(() => {
    const fetchCounts = async () => {
      const [{ count: clientCount }, { count: projectCount }, { count: quoteCount }] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("projects").select("*", { count: "exact", head: true }).in("status", ["em_andamento", "em andamento", "ativo"]),
        supabase.from("quotes").select("*", { count: "exact", head: true }).eq("status", "pendente"),
      ]);
      setCounts({
        clients: clientCount ?? 0,
        projects: projectCount ?? 0,
        quotes: quoteCount ?? 0,
      });
    };
    fetchCounts();
  }, [activeTab]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  const summaryCards = [
    { label: "Clientes ativos", value: counts.clients, icon: Users },
    { label: "Projetos em andamento", value: counts.projects, icon: Layers },
    { label: "Orçamentos em revisão", value: counts.quotes, icon: BarChart3 },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "clients": return <ClientsTab />;
      case "projects": return <ProjectsTab />;
      case "finance": return <FinanceTab />;
      case "quotes": return <QuotesTab />;
      case "service-orders": return <ServiceOrdersTab />;
    }
  };

  return (
    <div
      className="min-h-screen relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInPanel(true)}
      onMouseLeave={() => setIsInPanel(false)}
    >
      {/* Custom cursor */}
      {isInPanel && (
        <div
          className="fixed w-8 h-8 rounded-full border-2 border-primary/40 pointer-events-none z-[9999] mix-blend-difference"
          style={{
            transform: `translate(${cursorPos.x - 16}px, ${cursorPos.y - 16}px)`,
            willChange: 'transform',
          }}
        />
      )}

      {/* Layered background - white */}
      <div className="fixed inset-0 bg-white" />
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(0 0% 80%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 80%) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10">
        <Navbar />

        {/* Sticky sub-header */}
        <header className="border-b border-black/10 bg-white/70 backdrop-blur-2xl sticky top-16 md:top-20 z-30 mt-16 md:mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold">Studio Workspace</span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] text-black/50 ml-2 border-l border-black/10 pl-3">
                <Clock className="h-3 w-3" />
                Última atualização há 2 min
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-black/50 hover:text-black gap-2 text-xs hover:bg-black/5 transition-all duration-300">
              <LogOut className="h-3.5 w-3.5" />
              Sair
            </Button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
          {/* ── Hero Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-2xl pointer-events-none" />

            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary p-7 sm:p-9 lg:p-11 shadow-2xl shadow-primary/20">
              {/* Decorative orbs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.08] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/[0.06] rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

              <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-14 items-start">
                {/* Left: Welcome text */}
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/10 border border-black/10 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-primary-foreground font-semibold">Painel ativo</span>
                  </div>
                  <h1 className="font-display text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-primary-foreground leading-[1.15] mb-4">
                    Bem-vindo ao seu estúdio
                    <br />
                    dentro do Studio Kiiro.
                  </h1>
                  <p className="text-primary-foreground/70 text-sm sm:text-[15px] leading-relaxed max-w-xl">
                    Aqui você acompanha clientes, projetos, orçamentos, finanças e ordens de serviço com a mesma atenção aos detalhes que colocamos no design.
                  </p>
                </div>

                {/* Right: Summary mini-cards */}
                <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-auto">
                  {summaryCards.map((card, i) => (
                    <motion.div
                      key={card.label}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                      className="group flex-1 lg:w-56 rounded-xl border border-black/10 bg-black/5 p-4 flex items-center gap-3.5 transition-all duration-300 hover:border-primary-foreground/30 hover:bg-black/10 cursor-default"
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary-foreground/10 text-primary-foreground transition-all duration-300">
                        <card.icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-2xl sm:text-3xl font-bold font-display text-primary-foreground leading-none">{card.value}</span>
                        <span className="block text-[10px] uppercase tracking-[0.15em] text-primary-foreground/60 mt-1 truncate">{card.label}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Navigation Pills ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-3.5 ml-1 font-medium">Seções do seu estúdio</p>
            <div className="rounded-2xl border border-border/40 bg-secondary/15 backdrop-blur-md p-2 flex flex-wrap gap-1.5">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <tab.icon className={`h-4 w-4 transition-transform duration-300 ${isActive ? "" : "group-hover:scale-110"}`} />
                    <span className="hidden sm:inline">{tab.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabGlow"
                        className="absolute inset-0 rounded-xl bg-primary -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* ── Content Area ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative"
          >
            {/* Outer glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent pointer-events-none" />

            <div className="relative rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md shadow-2xl shadow-background/60 p-1.5 sm:p-2.5">
              {/* Inner pane */}
              <div className="rounded-xl border border-border/20 bg-card/70 backdrop-blur-sm p-5 sm:p-7 min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {renderTab()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
