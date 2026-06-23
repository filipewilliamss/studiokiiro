import { useEffect, useState, type ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  LogOut, FolderOpen, DollarSign, ArrowLeft, Clock, TrendingUp,
  CheckCircle2, Circle, AlertCircle, Filter, MessageSquare, BookOpen, Download, LayoutDashboard, Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import kiiroLogo from "@/assets/logo.webp";
import { toast } from "sonner";

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

const statusLabels: Record<string, string> = {
  briefing: "Briefing", planejamento: "Em planejamento", producao: "Em produção",
  revisao: "Em revisão", finalizacao: "Finalização", entregue: "Entregue",
};

interface PartnerProject {
  id: string; name: string; type: string; status: string; progress: number;
  deadline: string | null; start_date: string | null; partner_notes: string | null;
  client_name: string; partner_message: string | null; client_id: string;
}

interface PartnerPayment {
  id: string; project_id: string; commission_amount: number; commission_paid_to_partner: boolean;
  commission_paid_date: string | null; sale_date: string | null;
  projects?: { name: string; type: string; profiles?: { full_name: string } };
}

interface Stage {
  id: string; name: string; status: string; sort_order: number; description: string | null; completed_at: string | null;
}

const DashboardWrapper = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen relative">
    <div className="fixed inset-0 bg-black" />
    <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 40%, hsl(0 0% 8%) 0%, transparent 100%)" }} />
    <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsl(0 0% 25%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 25%) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
    <div className="relative z-10">{children}</div>
  </div>
);

const SummaryCard = ({ label, value, color = "text-foreground" }: { label: string; value: string; color?: string }) => (
  <div className="bg-card border border-border rounded-xl p-4 flex flex-col justify-center">
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">{label}</p>
    <p className={`text-xl font-bold font-display ${color}`}>{value}</p>
  </div>
);

const PartnerDashboard = () => {
  const { profile, signOut } = useAuth();
  const [projects, setProjects] = useState<PartnerProject[]>([]);
  const [payments, setPayments] = useState<PartnerPayment[]>([]);
  const [activeView, setActiveView] = useState<"dashboard" | "commissions" | "resources">("dashboard");
  const [selectedProject, setSelectedProject] = useState<PartnerProject | null>(null);
  const [stages, setStages] = useState<Stage[]>([]);

  // Commission filters
  const [filterMonth, setFilterMonth] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterClient, setFilterClient] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: paymentsData } = await supabase
      .from("partner_payments_view" as any)
      .select("id, project_id, commission_amount, commission_paid_to_partner, commission_paid_date, sale_date, projects(name, type, client_id)")
      .order("sale_date", { ascending: false });

    if (paymentsData) {
      const projectIds = [...new Set((paymentsData as any[]).map((p: any) => p.project_id))];
      let projectsData: any[] = [];
      const profileMap = new Map<string, string>();

      if (projectIds.length > 0) {
        const { data: pData } = await supabase
          .from("projects")
          .select("id, name, type, status, progress, deadline, start_date, partner_notes, client_id, partner_message")
          .in("id", projectIds);
        projectsData = pData || [];

        const clientIds = [...new Set(projectsData.map(p => p.client_id).filter(Boolean))];
        if (clientIds.length > 0) {
          const { data: profilesData } = await supabase
            .from("partner_client_names" as any)
            .select("id, full_name")
            .in("id", clientIds);
          (profilesData || []).forEach((p: any) => profileMap.set(p.id, p.full_name));
        }

        setProjects(projectsData.map(p => ({
          ...p,
          client_name: profileMap.get(p.client_id) || "Cliente",
        })) as any);
      }

      // Enrich payments with client full_name so existing UI lookups keep working
      const enrichedPayments = (paymentsData as any[]).map((p: any) => ({
        ...p,
        projects: p.projects
          ? { ...p.projects, profiles: { full_name: profileMap.get(p.projects.client_id) || "Cliente" } }
          : p.projects,
      }));
      setPayments(enrichedPayments as any);
    }
  };

  const openProjectDetail = async (project: PartnerProject) => {
    setSelectedProject(project);
    const { data } = await supabase
      .from("project_stages")
      .select("*")
      .eq("project_id", project.id)
      .order("sort_order");
    if (data) setStages(data as any);
  };

  const totalCommissionsPending = payments
    .filter(p => !p.commission_paid_to_partner)
    .reduce((s, p) => s + Number(p.commission_amount), 0);
  const totalCommissionsReceived = payments
    .filter(p => p.commission_paid_to_partner)
    .reduce((s, p) => s + Number(p.commission_amount), 0);
  const totalCommissions = payments.reduce((s, p) => s + Number(p.commission_amount), 0);

  const nextCommission = payments
    .filter(p => !p.commission_paid_to_partner)
    .sort((a, b) => new Date(a.sale_date || "").getTime() - new Date(b.sale_date || "").getTime())[0];

  const activeProjects = projects.filter(p => p.status !== "entregue");
  const statusCounts: Record<string, number> = {};
  projects.forEach(p => {
    const label = statusLabels[p.status] || p.status;
    statusCounts[label] = (statusCounts[label] || 0) + 1;
  });

  const filteredPayments = payments.filter(p => {
    const monthMatch = filterMonth === "all" || p.sale_date?.startsWith(filterMonth);
    const statusMatch = filterStatus === "all"
      ? true
      : filterStatus === "pending" ? !p.commission_paid_to_partner : p.commission_paid_to_partner;
    const clientMatch = filterClient === "all" || p.projects?.profiles?.full_name === filterClient;
    return monthMatch && statusMatch && clientMatch;
  });

  const availableClients = [...new Set(payments.map(p => p.projects?.profiles?.full_name).filter(Boolean))].sort();
  const availableMonths = [...new Set(payments.map(p => p.sale_date?.substring(0, 7)).filter(Boolean))].sort().reverse();

  const monthLabel = (m: string) => {
    const [y, mo] = m.split("-");
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    return `${months[parseInt(mo) - 1]} ${y}`;
  };

  if (selectedProject) {
    const projectPayment = payments.find(p => p.project_id === selectedProject.id);
    return (
      <DashboardWrapper>
        <Navbar forceBlack />
        <header className="border-b border-white/10 bg-black sticky top-[calc(7rem-55px)] md:top-[calc(9rem-55px)] z-[60] mt-[calc(8rem-55px)] md:mt-[calc(10rem-55px)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <button onClick={() => setSelectedProject(null)} className="flex items-center gap-2 text-sm text-white/40 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" /> Voltar
            </button>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-white/40 hover:text-white">
              <LogOut className="h-4 w-4 mr-2" /> Sair
            </Button>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/15 blur-2xl pointer-events-none" />
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary p-6 sm:p-8 shadow-2xl shadow-primary/20">
              <div className="relative">
                <h1 className="text-2xl sm:text-3xl font-bold text-black font-display">{selectedProject.name}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-sm text-black/70">{selectedProject.type}</p>
                  <span className="text-[10px] px-2.5 py-1 rounded-lg bg-black/10 text-black font-semibold border border-black/10">
                    {statusLabels[selectedProject.status] || selectedProject.status}
                  </span>
                </div>
                <p className="text-xs text-black/60 mt-1">Cliente: {selectedProject.client_name}</p>
                <div className="mt-5 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-black/70">Progresso geral</span>
                    <span className="font-bold text-black">{selectedProject.progress}%</span>
                  </div>
                  <div className="h-2.5 bg-black/15 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${selectedProject.progress}%` }} transition={{ duration: 0.4, delay: 0.3 }} className="h-full bg-black rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Comunicação Rápida com o Studio</p>
            </div>
            <Textarea
              placeholder="Ex.: Cliente André está pensando em um pack de reels..."
              defaultValue={selectedProject.partner_message || ""}
              className="text-sm bg-black/20 border-border/50 min-h-[80px]"
              onBlur={async (e) => {
                const val = e.target.value.trim() || null;
                if (val !== selectedProject.partner_message) {
                  await supabase.from("projects").update({ partner_message: val }).eq("id", selectedProject.id);
                  toast.success("Mensagem enviada ao Studio!");
                }
              }}
            />
          </motion.div>

          {selectedProject.partner_notes && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/10 border border-primary/20 rounded-xl p-4">
              <p className="text-[10px] uppercase tracking-wider text-primary font-bold mb-1">Recado do Studio para você</p>
              <p className="text-sm text-foreground italic">"{selectedProject.partner_notes}"</p>
            </motion.div>
          )}

          {projectPayment && (
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Comissão deste projeto</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-foreground">{formatCurrency(Number(projectPayment.commission_amount))}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                  projectPayment.commission_paid_to_partner
                    ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
                    : "text-primary bg-primary/10 border-primary/20"
                }`}>
                  {projectPayment.commission_paid_to_partner ? "Recebida" : "A receber"}
                </span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Etapas do Projeto</h2>
            <div className="space-y-2">
              {stages.map((stage, i) => {
                const isDone = stage.status === "concluida";
                const isCurrent = !isDone && (i === 0 || stages[i - 1]?.status === "concluida");
                return (
                  <motion.div key={stage.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className={`flex items-start gap-3 p-3 rounded-xl border ${isCurrent ? "border-primary/30 bg-primary/5" : "border-border bg-card"}`}>
                    {isDone ? <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" /> :
                     isCurrent ? <Circle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" /> :
                     <Circle className="h-5 w-5 text-muted-foreground/30 mt-0.5 flex-shrink-0" />}
                    <div>
                      <p className={`text-sm font-medium ${isDone ? "text-muted-foreground line-through" : "text-foreground"}`}>{stage.name}</p>
                      {stage.description && <p className="text-xs text-muted-foreground mt-0.5">{stage.description}</p>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </main>
      </DashboardWrapper>
    );
  }

  return (
    <DashboardWrapper>
      <Navbar forceBlack />
      <header className="border-b border-white/10 bg-black sticky top-[calc(7rem-55px)] md:top-[calc(9rem-55px)] z-[60] mt-[calc(8rem-55px)] md:mt-[calc(10rem-55px)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold">Painel do Parceiro</span>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut} className="text-white/50 hover:text-white gap-2 text-xs">
            <LogOut className="h-3.5 w-3.5" /> Sair
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-primary/15 blur-3xl pointer-events-none" />
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary p-7 sm:p-9 shadow-2xl shadow-primary/20">
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/10 border border-black/10 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-black font-bold">Parceiro ativo</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-black leading-tight mb-3">Olá {profile?.full_name || "Parceiro"}</h1>
              <p className="text-sm text-black/70 max-w-xl">Seja bem-vindo ao seu painel de parceiro do Studio Kiiro. Acompanhe o andamento dos projetos que você trouxe para o estúdio e suas comissões. <span className="hidden sm:inline italic opacity-60">— Sua ponte para grandes marcas começa aqui.</span></p>
            </div>
          </div>
        </motion.div>

        <div className="rounded-xl border border-white/10 bg-black p-2 flex gap-1.5 overflow-x-auto">
          {[
            { key: "dashboard" as const, label: "Projetos", icon: FolderOpen },
            { key: "commissions" as const, label: "Minhas Comissões", icon: DollarSign },
            { key: "resources" as const, label: "Recursos para Venda", icon: BookOpen },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveView(tab.key)}
              className={`relative flex items-center gap-2.5 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeView === tab.key ? "bg-white/10 text-primary shadow-lg" : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"}`}>
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeView} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-xl p-1.5 sm:p-2.5">
              <div className="rounded-xl border border-white/5 bg-[#111111] p-5 sm:p-7 min-h-[400px]">
                {activeView === "dashboard" ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      <SummaryCard label="Projetos ativos" value={String(activeProjects.length)} />
                      <SummaryCard label="A receber" value={formatCurrency(totalCommissionsPending)} color="text-primary" />
                      <SummaryCard label="Já recebido" value={formatCurrency(totalCommissionsReceived)} color="text-emerald-400" />
                      {nextCommission && (
                        <div className="col-span-2 bg-primary/10 border border-primary/20 rounded-xl p-4 flex flex-col justify-center">
                          <p className="text-[10px] uppercase tracking-wider text-primary font-bold mb-1">Próxima comissão</p>
                          <p className="text-lg font-bold text-foreground">{formatCurrency(Number(nextCommission.commission_amount))}</p>
                          <p className="text-[10px] text-muted-foreground truncate">Projeto: {nextCommission.projects?.name}</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Seus Projetos</h2>
                      {projects.length === 0 ? (
                        <div className="bg-card border border-border rounded-xl p-8 text-center"><p className="text-muted-foreground text-sm">Nenhum projeto encontrado.</p></div>
                      ) : (
                        projects.map((project, i) => {
                          const pmt = payments.find(p => p.project_id === project.id);
                          return (
                            <motion.div key={project.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                              onClick={() => openProjectDetail(project)}
                              className="bg-card border border-border rounded-xl p-5 space-y-3 cursor-pointer hover:border-primary/30 transition-colors">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-medium text-foreground">{project.name}</h3>
                                  <p className="text-xs text-muted-foreground mt-0.5">{project.client_name} · {project.type}</p>
                                </div>
                                {pmt && (
                                  <div className="text-right flex-shrink-0">
                                    <p className="text-sm font-semibold text-foreground">{formatCurrency(Number(pmt.commission_amount))}</p>
                                    <span className={`text-[10px] ${pmt.commission_paid_to_partner ? "text-emerald-400" : "text-primary"}`}>{pmt.commission_paid_to_partner ? "Recebida" : "A receber"}</span>
                                  </div>
                                )}
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-[10px]"><span className="text-muted-foreground">Progresso</span><span className="font-medium text-foreground">{project.progress}%</span></div>
                                <div className="h-1.5 bg-muted rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} className="h-full bg-primary rounded-full" /></div>
                              </div>
                            </motion.div>
                          );
                        })
                      )}
                    </div>
                  </div>
                ) : activeView === "commissions" ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-3">
                      <SummaryCard label="A receber" value={formatCurrency(totalCommissionsPending)} color="text-primary" />
                      <SummaryCard label="Já recebido" value={formatCurrency(totalCommissionsReceived)} color="text-emerald-400" />
                      <SummaryCard label="Total acumulado" value={formatCurrency(totalCommissions)} />
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3"><Filter className="h-4 w-4 text-primary" /><h3 className="text-sm font-semibold text-foreground">Filtros</h3></div>
                      <div className="flex flex-wrap gap-3">
                        <Select value={filterMonth} onValueChange={setFilterMonth}><SelectTrigger className="w-36 h-8 text-xs"><SelectValue placeholder="Mês" /></SelectTrigger><SelectContent><SelectItem value="all">Todos os meses</SelectItem>{availableMonths.map(m => <SelectItem key={m} value={m!}>{monthLabel(m!)}</SelectItem>)}</SelectContent></Select>
                        <Select value={filterStatus} onValueChange={setFilterStatus}><SelectTrigger className="w-36 h-8 text-xs"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">Todos os status</SelectItem><SelectItem value="pending">A receber</SelectItem><SelectItem value="paid">Recebida</SelectItem></SelectContent></Select>
                        <Select value={filterClient} onValueChange={setFilterClient}><SelectTrigger className="w-48 h-8 text-xs"><SelectValue placeholder="Cliente" /></SelectTrigger><SelectContent><SelectItem value="all">Todos os clientes</SelectItem>{availableClients.map(c => <SelectItem key={c} value={c!}>{c}</SelectItem>)}</SelectContent></Select>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {filteredPayments.length === 0 ? (<div className="bg-card border border-border rounded-xl p-8 text-center"><p className="text-muted-foreground text-sm">Nenhuma comissão encontrada.</p></div>) : (
                        filteredPayments.map((payment, i) => (
                          <motion.div key={payment.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4">
                            <div className="min-w-0"><p className="text-sm font-medium text-foreground truncate">{payment.projects?.name || "—"}</p><p className="text-xs text-muted-foreground">{payment.projects?.profiles?.full_name} · {payment.projects?.type || "—"}</p></div>
                            <div className="text-right flex-shrink-0"><p className="text-sm font-bold text-foreground">{formatCurrency(Number(payment.commission_amount))}</p><span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${payment.commission_paid_to_partner ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" : "text-primary bg-primary/10 border-primary/20"}`}>{payment.commission_paid_to_partner ? "Recebida" : "A receber"}</span></div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="space-y-2"><h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Materiais de Apoio para Venda</h2><p className="text-xs text-muted-foreground">Utilize estes materiais para facilitar suas vendas e apresentações do Studio Kiiro.</p></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-card border border-border rounded-xl p-5 space-y-4 hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Download className="h-5 w-5" /></div><div><h3 className="text-sm font-bold text-foreground">Tabela de Preços e Serviços</h3><p className="text-[10px] text-muted-foreground uppercase tracking-wider">PDF • Atualizado em Jan/2024</p></div></div>
                        <p className="text-xs text-muted-foreground">Contém os valores de tabela para todos os serviços do estúdio, descrições e prazos médios.</p>
                        <Button variant="outline" size="sm" className="w-full gap-2 text-xs" onClick={() => window.open('https://studiokiiro.com/servicos.pdf', '_blank')}>Baixar PDF</Button>
                      </div>
                      <div className="bg-card border border-border rounded-xl p-5 space-y-4 hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400"><LayoutDashboard className="h-5 w-5" /></div><div><h3 className="text-sm font-bold text-foreground">Modelos de Abordagem</h3><p className="text-[10px] text-muted-foreground uppercase tracking-wider">TEXTO • WhatsApp & E-mail</p></div></div>
                        <p className="text-xs text-muted-foreground">Scripts prontos para você copiar e adaptar no primeiro contato com potenciais clientes.</p>
                        <Button variant="outline" size="sm" className="w-full gap-2 text-xs" onClick={() => toast.info("Link para modelos em breve!")}>Ver Modelos</Button>
                      </div>
                      <div className="bg-card border border-border rounded-xl p-5 space-y-4 hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-emerald-400/10 flex items-center justify-center text-emerald-400"><Search className="h-5 w-5" /></div><div><h3 className="text-sm font-bold text-foreground">Portfólio Online</h3><p className="text-[10px] text-muted-foreground uppercase tracking-wider">LINK • studiokiiro.com</p></div></div>
                        <p className="text-xs text-muted-foreground">Link direto para o nosso portfólio oficial para você mostrar aos seus prospects.</p>
                        <Button variant="outline" size="sm" className="w-full gap-2 text-xs" onClick={() => window.open('https://studiokiiro.com/portfolio', '_blank')}>Abrir Portfólio</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </DashboardWrapper>
  );
};

export default PartnerDashboard;
