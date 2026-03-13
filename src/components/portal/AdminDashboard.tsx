import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { LogOut, Users, FolderKanban, DollarSign, FileText, Receipt, Sparkles, Layers, BarChart3 } from "lucide-react";
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

  const summaryCards = [
    { label: "Clientes ativos", value: counts.clients, icon: Users, accent: false },
    { label: "Projetos em andamento", value: counts.projects, icon: Layers, accent: true },
    { label: "Orçamentos em revisão", value: counts.quotes, icon: BarChart3, accent: false },
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
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Sticky sub-header */}
      <header className="border-b border-border/60 bg-card/60 backdrop-blur-xl sticky top-16 md:top-20 z-30 mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-primary font-semibold">Studio Workspace</span>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground hover:text-foreground gap-2 text-xs">
            <LogOut className="h-3.5 w-3.5" />
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* ── Hero Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-secondary/40 p-6 sm:p-8 lg:p-10"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/3 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left: Welcome text */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-primary font-medium">Painel ativo</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-3">
                Bem-vindo ao seu estúdio
                <br />
                <span className="text-primary">dentro do Studio Kiiro.</span>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl">
                Aqui você acompanha clientes, projetos, orçamentos, finanças e ordens de serviço com a mesma atenção aos detalhes que colocamos no design.
              </p>
            </div>

            {/* Right: Summary mini-cards */}
            <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-auto">
              {summaryCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className={`flex-1 lg:w-52 rounded-xl border p-4 flex items-center gap-3 transition-all duration-300 ${
                    card.accent
                      ? "border-primary/30 bg-primary/5 hover:bg-primary/10"
                      : "border-border/60 bg-secondary/30 hover:bg-secondary/50"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    card.accent ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    <card.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xl sm:text-2xl font-bold font-display text-foreground leading-none">{card.value}</span>
                    <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5 truncate">{card.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Navigation Pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3 ml-1">Seções do seu estúdio</p>
          <div className="rounded-xl border border-border/60 bg-secondary/20 backdrop-blur-sm p-1.5 flex flex-wrap gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
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
          className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm shadow-lg shadow-background/50 p-1 sm:p-2"
        >
          {/* Inner glass-like pane */}
          <div className="rounded-xl border border-border/30 bg-card/80 p-4 sm:p-6 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {renderTab()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
