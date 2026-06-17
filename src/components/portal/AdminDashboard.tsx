import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { LogOut, Users, FolderKanban, DollarSign, FileText, Receipt, Layers, BarChart3, Clock, BookOpen, Send, Key } from "lucide-react";
import NotificationBell from "./admin/NotificationBell";
import ClientsTab from "./admin/ClientsTab";
import ProjectsTab from "./admin/ProjectsTab";
import FinanceTab from "./admin/FinanceTab";
import ServiceOrdersTab from "./admin/ServiceOrdersTab";
import QuotesTab from "./admin/QuotesTab";
import ProposalsTab from "./admin/ProposalsTab";
import MethodologyTab from "./admin/MethodologyTab";
import { motion, AnimatePresence } from "framer-motion";
import AccessTab from "./admin/AccessTab";

const tabs = [
  { key: "clients", label: "Clientes", icon: Users },
  { key: "projects", label: "Projetos", icon: FolderKanban },
  { key: "access", label: "Acessos", icon: Key },
  { key: "finance", label: "Financeiro", icon: DollarSign },
  { key: "quotes", label: "Orçamentos", icon: Receipt },
  { key: "proposals", label: "Propostas", icon: Send },
  { key: "service-orders", label: "Ordens de Serviço", icon: FileText },
  { key: "methodology", label: "Metodologia", icon: BookOpen },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const AdminDashboard = () => {
  const { profile, signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>("clients");
  const [counts, setCounts] = useState({ clients: 0, projects: 0, quotes: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      if (!user) return;

      const [clientsRes, projectsRes, quotesRes] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("projects").select("*", { count: "exact", head: true }).in("status", ["briefing", "planejamento", "producao", "revisao", "finalizacao", "em_andamento", "em andamento", "ativo"]),
        supabase.from("quotes").select("*", { count: "exact", head: true }).eq("status", "pendente"),
      ]);

      if (clientsRes.error || projectsRes.error || quotesRes.error) {
        return;
      }

      setCounts({
        clients: clientsRes.count ?? 0,
        projects: projectsRes.count ?? 0,
        quotes: quotesRes.count ?? 0,
      });
    };

    fetchCounts();
  }, [activeTab, user?.id]);

  const summaryCards = [
    { label: "Clientes ativos", value: counts.clients, icon: Users },
    { label: "Projetos em andamento", value: counts.projects, icon: Layers },
    { label: "Orçamentos em revisão", value: counts.quotes, icon: BarChart3 },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "clients": return <ClientsTab />;
      case "projects": return <ProjectsTab />;
      case "access": return <AccessTab />;
      case "finance": return <FinanceTab />;
      case "quotes": return <QuotesTab />;
      case "proposals": return <ProposalsTab />;
      case "service-orders": return <ServiceOrdersTab />;
      case "methodology": return <MethodologyTab />;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Black background */}
      <div className="fixed inset-0 bg-black" />
      {/* Radial gradient for depth */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, hsl(0 0% 8%) 0%, transparent 100%)',
        }}
      />
      {/* Grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(hsl(0 0% 25%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 25%) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10">
        <Navbar forceBlack />

        {/* Sticky sub-header — black */}
        <header className="border-b border-white/10 bg-black sticky top-[calc(7rem-55px)] md:top-[calc(9rem-55px)] z-[60] mt-[calc(8rem-55px)] md:mt-[calc(10rem-55px)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold">Studio Kiiro Workspace</span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] text-white/40 ml-2 border-l border-white/10 pl-3">
                <Clock className="h-3 w-3" />
                Ferramenta interna do Studio Kiiro
              </span>
            </div>
            <div className="flex items-center gap-1">
              <NotificationBell />
              <Button variant="ghost" size="sm" onClick={signOut} className="text-white/50 hover:text-white gap-2 text-xs hover:bg-white/5 transition-all duration-300">
                <LogOut className="h-3.5 w-3.5" />
                Sair
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
          {/* ── Hero Card — yellow ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-3xl bg-primary/15 blur-3xl pointer-events-none" />

            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary p-7 sm:p-9 lg:p-11 shadow-2xl shadow-primary/20 hover:-translate-y-[1px] hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.35)] transition-all duration-500">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.06] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/[0.04] rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

              <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-14 items-start">
                {/* Left: Welcome text */}
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/10 border border-black/10 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-black font-bold">Painel ativo</span>
                  </div>
                  <h1 className="font-display text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-black leading-[1.15] mb-4">
                    Bem-vindo {profile?.full_name || ""},<br />ao sistema do Studio Kiiro.
                  </h1>
                  <p className="text-black/70 text-sm sm:text-[15px] leading-relaxed max-w-xl">
                    Aqui você acompanha clientes, projetos, orçamentos, finanças e ordens de serviço com a mesma atenção aos detalhes que colocamos no design. <span className="hidden sm:inline italic opacity-60">— Gerindo o presente, projetando o futuro.</span>
                  </p>
                </div>

                {/* Right: Summary mini-cards — black bg */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
                  {summaryCards.map((card, i) => (
                    <motion.div
                      key={card.label}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.04, y: -2, transition: { duration: 0.2 } }}
                      className="group flex-1 lg:w-56 rounded-xl border border-white/10 bg-black p-4 flex items-center gap-3.5 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-black/10 cursor-default"
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/10 text-primary transition-all duration-300">
                        <card.icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-2xl sm:text-3xl font-bold font-display text-white leading-none">{card.value}</span>
                        <span className="block text-[10px] uppercase tracking-[0.15em] text-white/55 mt-1 font-medium">{card.label}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Navigation Pills — black container ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/35 mb-3.5 ml-1 font-semibold">Seções do seu estúdio</p>
            <div className="rounded-xl border border-white/10 bg-black p-2 flex flex-wrap gap-1.5 overflow-x-auto">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative flex items-center gap-2.5 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white/10 text-primary shadow-lg shadow-black/20"
                        : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                    }`}
                  >
                    <tab.icon className={`h-4 w-4 transition-transform duration-200 ${isActive ? "" : "group-hover:scale-110"}`} />
                    <span className="hidden sm:inline">{tab.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="adminActiveTabGlow"
                        className="absolute inset-0 rounded-lg bg-white/10 -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* ── Content Area — black container ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-xl shadow-black/[0.1] p-1.5 sm:p-2.5">
              <div className="rounded-xl border border-white/5 bg-[#111111] p-5 sm:p-7 min-h-[400px]">
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
