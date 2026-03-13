import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  LogOut, FolderOpen, CheckCircle2, Clock, Circle, FileDown,
  ExternalLink, DollarSign, MessageSquare, Send, ArrowLeft, ClipboardList,
  Receipt, ThumbsUp, ThumbsDown, Hash, Sparkles, FileText, Printer,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { briefingQuestions } from "@/data/briefingQuestions";
import { motion, AnimatePresence } from "framer-motion";
import kiiroLogo from "@/assets/logo.png";

interface Project {
  id: string; name: string; type: string; status: string; progress: number; deadline: string | null;
}
interface Stage {
  id: string; name: string; status: string; sort_order: number; description: string | null; completed_at: string | null;
}
interface ProjectFile { name: string; viewUrl: string | null; downloadUrl: string | null; }
interface Payment {
  id: string; budget_total: number; initial_payment: number | null; initial_payment_date: string | null;
  remaining_amount: number | null; installments_total: number | null; installments_paid: number | null;
  next_payment_date: string | null; notes: string | null;
}
interface Message { id: string; sender_id: string; content: string; created_at: string; }
interface QuoteItem { description: string; quantity: number; unit_price: number; }
interface Quote {
  id: string; sequential_number: number; project_type: string; description: string | null;
  items: QuoteItem[]; total_value: number; payment_terms: string | null;
  validity_date: string | null; status: string; created_at: string; notes: string | null;
}
interface ServiceItem { description: string; qty: number; unit_price: number; }
interface ServiceOrder {
  id: string; sequential_number: number; service_type: string; description: string | null;
  total_value: number; payment_terms: string | null; notes: string | null;
  status: string; created_at: string; items: ServiceItem[]; deadline: string | null;
  profiles?: { full_name: string; email: string | null };
}

const PROVIDER = {
  name: "Filipe Soares",
  document: "449.403.838-57",
  address: "Rua Osvaldo Avilez, 147 - Casa 2, Jardim Ponte Alta I, Guarulhos/SP, CEP 07179300",
};

const statusLabels: Record<string, string> = {
  briefing: "Briefing", planejamento: "Em planejamento", producao: "Em produção",
  revisao: "Em revisão", finalizacao: "Finalização", entregue: "Entregue",
};

const statusGradients: Record<string, string> = {
  briefing: "from-blue-500/20 to-blue-600/5",
  planejamento: "from-amber-500/20 to-amber-600/5",
  producao: "from-primary/20 to-primary/5",
  revisao: "from-purple-500/20 to-purple-600/5",
  finalizacao: "from-emerald-500/20 to-emerald-600/5",
  entregue: "from-muted to-muted/50",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const ClientDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [stages, setStages] = useState<Stage[]>([]);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Briefing state
  const [briefingSubmitted, setBriefingSubmitted] = useState<boolean>(false);
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [briefingAnswers, setBriefingAnswers] = useState<Record<string, string>>({});
  const [submittingBriefing, setSubmittingBriefing] = useState(false);
  const [projectBriefingStatus, setProjectBriefingStatus] = useState<Record<string, boolean>>({});

  // Quotes state
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [respondingQuote, setRespondingQuote] = useState<Quote | null>(null);

  // Service orders state
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
  const [viewOrder, setViewOrder] = useState<ServiceOrder | null>(null);
  const osPrintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("id, name, type, status, progress, deadline")
        .order("created_at", { ascending: false });
      if (data) {
        setProjects(data);
        const { data: briefings } = await supabase
          .from("briefing_responses")
          .select("project_id")
          .in("project_id", data.map((p) => p.id));
        const submittedIds = new Set((briefings || []).map((b: any) => b.project_id));
        const statusMap: Record<string, boolean> = {};
        data.forEach((p) => { statusMap[p.id] = submittedIds.has(p.id); });
        setProjectBriefingStatus(statusMap);
      }
    };
    const fetchQuotes = async () => {
      const { data } = await supabase
        .from("quotes")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setQuotes(data as any);
    };
    const fetchServiceOrders = async () => {
      const { data } = await supabase
        .from("service_orders")
        .select("*, profiles(full_name, email)")
        .order("created_at", { ascending: false });
      if (data) setServiceOrders(data as any);
    };
    fetchProjects();
    fetchQuotes();
    fetchServiceOrders();
  }, []);

  // Realtime messages
  useEffect(() => {
    if (!selectedProject) return;
    const channel = supabase
      .channel(`messages-${selectedProject.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `project_id=eq.${selectedProject.id}` },
        (payload) => { setMessages((prev) => [...prev, payload.new as Message]); })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [selectedProject]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openProjectDetail = async (project: Project) => {
    setSelectedProject(project);
    setIsLoadingFiles(true);
    setFiles([]); setPayment(null); setMessages([]); setBriefingAnswers({});
    setBriefingSubmitted(projectBriefingStatus[project.id] || false);

    const [stagesRes, filesRes, paymentRes, messagesRes] = await Promise.all([
      supabase.from("project_stages").select("*").eq("project_id", project.id).order("sort_order"),
      supabase.storage.from("project-files").list(project.id),
      supabase.from("payments").select("*").eq("project_id", project.id).maybeSingle(),
      supabase.from("messages").select("*").eq("project_id", project.id).order("created_at", { ascending: true }),
    ]);

    if (stagesRes.data) setStages(stagesRes.data);
    if (paymentRes.data) setPayment(paymentRes.data);
    if (messagesRes.data) setMessages(messagesRes.data);

    if (filesRes.data && filesRes.data.length > 0) {
      const filesWithLinks = await Promise.all(
        filesRes.data.map(async (file) => {
          const objectPath = `${project.id}/${file.name}`;
          const [viewRes, downloadRes] = await Promise.all([
            supabase.storage.from("project-files").createSignedUrl(objectPath, 3600),
            supabase.storage.from("project-files").createSignedUrl(objectPath, 3600, { download: file.name }),
          ]);
          return { name: file.name, viewUrl: viewRes.data?.signedUrl ?? null, downloadUrl: downloadRes.data?.signedUrl ?? null };
        })
      );
      setFiles(filesWithLinks);
    }
    setIsLoadingFiles(false);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedProject || !user) return;
    setSendingMessage(true);
    await supabase.from("messages").insert({ project_id: selectedProject.id, sender_id: user.id, content: newMessage.trim() });
    setNewMessage("");
    setSendingMessage(false);
  };

  const submitBriefing = async () => {
    if (!selectedProject) return;
    const questions = briefingQuestions[selectedProject.type];
    if (!questions) return;
    const missing = questions.filter((q) => q.required && !briefingAnswers[q.id]?.trim());
    if (missing.length > 0) {
      toast.error(`Preencha os campos obrigatórios: ${missing.map((q) => q.question.slice(0, 40)).join(", ")}`);
      return;
    }
    setSubmittingBriefing(true);
    const { error } = await supabase.from("briefing_responses").insert({ project_id: selectedProject.id, responses: briefingAnswers });
    if (error) toast.error("Erro ao enviar briefing. Tente novamente.");
    else {
      toast.success("Briefing enviado com sucesso! 🎉");
      setBriefingSubmitted(true);
      setBriefingOpen(false);
      setProjectBriefingStatus((prev) => ({ ...prev, [selectedProject.id]: true }));
    }
    setSubmittingBriefing(false);
  };

  const respondToQuote = async (quote: Quote, status: "aprovado" | "recusado") => {
    const { error } = await supabase.from("quotes").update({
      status,
      client_response_at: new Date().toISOString(),
    }).eq("id", quote.id);
    if (error) toast.error("Erro ao responder orçamento");
    else {
      toast.success(status === "aprovado" ? "Orçamento aprovado! ✅" : "Orçamento recusado.");
      setQuotes((prev) => prev.map((q) => q.id === quote.id ? { ...q, status, client_response_at: new Date().toISOString() } : q));
      setRespondingQuote(null);
    }
  };

  const getOsHash = (order: ServiceOrder) => {
    const date = new Date(order.created_at);
    return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(order.sequential_number).padStart(4, "0")}`;
  };

  const formatCurrencyValue = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  const formatDateLong = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
  };

  const formatDateTimeLong = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })} às ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
  };

  const handlePrintOS = () => {
    if (!osPrintRef.current) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`<!DOCTYPE html><html><head><title>Ordem de Serviço</title>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>* { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: 'Space Grotesk', sans-serif; color: #1a1a1a; } @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }</style>
    </head><body>${osPrintRef.current.innerHTML}</body></html>`);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  const activeProjects = projects.filter((p) => p.status !== "entregue");
  const completedProjects = projects.filter((p) => p.status === "entregue");
  const completedStages = stages.filter((s) => s.status === "concluida").length;
  const currentStageIndex = stages.findIndex((s) => s.status !== "concluida");
  const currentBriefingQuestions = selectedProject ? briefingQuestions[selectedProject.type] : null;
  const showBriefingBanner = selectedProject && !briefingSubmitted && currentBriefingQuestions;
  const pendingQuotes = quotes.filter((q) => q.status === "pendente");

  // Project detail view
  if (selectedProject) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <header className="border-b border-black/10 bg-white/70 backdrop-blur-xl sticky top-16 md:top-20 z-30 mt-16 md:mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <button onClick={() => setSelectedProject(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Voltar
            </button>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          {/* Project header with gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`rounded-2xl bg-gradient-to-br ${statusGradients[selectedProject.status] || "from-muted to-muted/50"} border border-border/50 p-6`}
          >
            <h1 className="text-2xl font-bold text-foreground font-display">{selectedProject.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-sm text-muted-foreground">{selectedProject.type}</p>
              <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold border border-primary/30">
                {statusLabels[selectedProject.status] || selectedProject.status}
              </span>
            </div>
            {/* Progress bar */}
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progresso geral</span>
                <span className="font-semibold text-primary">{selectedProject.progress}%</span>
              </div>
              <div className="h-2 bg-background/50 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedProject.progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-kiiro-glow rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Briefing banner */}
          <AnimatePresence>
            {showBriefingBanner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/30 rounded-2xl p-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <ClipboardList className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Briefing Pendente</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Responda o briefing para iniciarmos seu projeto.
                    </p>
                  </div>
                </div>
                <Button onClick={() => setBriefingOpen(true)} className="shrink-0 gap-2 rounded-xl">
                  <Sparkles className="h-4 w-4" />
                  Responder
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Briefing Dialog */}
          <Dialog open={briefingOpen} onOpenChange={setBriefingOpen}>
            <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle style={{ fontFamily: "var(--font-display)" }}>
                  Briefing — {selectedProject.type}
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Preencha com o máximo de detalhes possível para um resultado incrível.
                </p>
              </DialogHeader>
              <div className="space-y-5 mt-4">
                {currentBriefingQuestions?.map((q) => {
                  if (q.type === "section") {
                    return (
                      <div key={q.id} className="pt-4 pb-1 border-b border-primary/20">
                        <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">{q.question}</h3>
                      </div>
                    );
                  }
                  return (
                    <div key={q.id} className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">
                        {q.question} {q.required && <span className="text-destructive">*</span>}
                      </label>
                      {(q.type === "text" || q.type === "email" || q.type === "phone") && (
                        <Input
                          type={q.type === "email" ? "email" : q.type === "phone" ? "tel" : "text"}
                          value={briefingAnswers[q.id] || ""}
                          onChange={(e) => setBriefingAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                          placeholder={q.placeholder || "Sua resposta..."}
                          className="rounded-xl"
                        />
                      )}
                      {q.type === "textarea" && (
                        <Textarea
                          value={briefingAnswers[q.id] || ""}
                          onChange={(e) => setBriefingAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                          placeholder={q.placeholder || "Sua resposta..."}
                          rows={3}
                          className="rounded-xl"
                        />
                      )}
                      {q.type === "select" && q.options && (
                        <div className="space-y-2">
                          <div className="space-y-1.5">
                            {q.options.map((opt) => (
                              <label key={opt} className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-primary/5 cursor-pointer transition-colors border border-transparent hover:border-primary/20">
                                <input type="radio" name={q.id} checked={(briefingAnswers[q.id] || "").startsWith(opt)} onChange={() => setBriefingAnswers((prev) => ({ ...prev, [q.id]: opt }))} className="h-4 w-4 text-primary accent-primary" />
                                <span className="text-sm text-foreground">{opt}</span>
                              </label>
                            ))}
                          </div>
                          {q.hasConditionalText && briefingAnswers[q.id] && (
                            <Input value={briefingAnswers[`${q.id}_detail`] || ""} onChange={(e) => setBriefingAnswers((prev) => ({ ...prev, [`${q.id}_detail`]: e.target.value }))} placeholder="Especifique..." className="ml-6 rounded-xl" />
                          )}
                        </div>
                      )}
                      {q.type === "checkbox" && q.options && (
                        <div className="space-y-1.5">
                          {q.options.map((opt) => {
                            const currentVal = briefingAnswers[q.id] || "";
                            const selected = currentVal.split("|||").filter(Boolean);
                            const isChecked = selected.includes(opt);
                            return (
                              <label key={opt} className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-primary/5 cursor-pointer transition-colors border border-transparent hover:border-primary/20">
                                <Checkbox checked={isChecked} onCheckedChange={(checked) => {
                                  const newSelected = checked ? [...selected, opt] : selected.filter((s) => s !== opt);
                                  setBriefingAnswers((prev) => ({ ...prev, [q.id]: newSelected.join("|||") }));
                                }} />
                                <span className="text-sm text-foreground">{opt}</span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="flex justify-end gap-2 pt-4 border-t border-border">
                  <Button variant="ghost" onClick={() => setBriefingOpen(false)}>Cancelar</Button>
                  <Button onClick={submitBriefing} disabled={submittingBriefing} className="rounded-xl">{submittingBriefing ? "Enviando..." : "Enviar Briefing"}</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Tabs */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Tabs defaultValue="status" className="space-y-6">
              <TabsList className="bg-card/80 backdrop-blur-sm border border-border/50 h-12 p-1 gap-1 grid grid-cols-4 w-full rounded-2xl">
                <TabsTrigger value="status" className="gap-1.5 text-xs rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                  <CheckCircle2 className="h-3.5 w-3.5" /><span className="hidden sm:inline">Status</span>
                </TabsTrigger>
                <TabsTrigger value="files" className="gap-1.5 text-xs rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                  <FolderOpen className="h-3.5 w-3.5" /><span className="hidden sm:inline">Arquivos</span>
                </TabsTrigger>
                <TabsTrigger value="finance" className="gap-1.5 text-xs rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                  <DollarSign className="h-3.5 w-3.5" /><span className="hidden sm:inline">Financeiro</span>
                </TabsTrigger>
                <TabsTrigger value="messages" className="gap-1.5 text-xs rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                  <MessageSquare className="h-3.5 w-3.5" /><span className="hidden sm:inline">Mensagens</span>
                </TabsTrigger>
              </TabsList>

              {/* STATUS TAB */}
              <TabsContent value="status" className="space-y-6">
                <p className="text-xs text-muted-foreground">{completedStages} de {stages.length} etapas concluídas</p>
                {stages.length > 0 && (
                  <div className="space-y-2">
                    {stages.map((stage, idx) => {
                      const isCompleted = stage.status === "concluida";
                      const isCurrent = idx === currentStageIndex;
                      return (
                        <motion.div
                          key={stage.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`flex items-start gap-3 p-4 rounded-2xl border transition-all ${
                            isCurrent ? "border-primary/50 bg-primary/5 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.15)]" : isCompleted ? "border-border/50 bg-card/50" : "border-border/30 bg-card/30"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          ) : isCurrent ? (
                            <div className="h-5 w-5 rounded-full border-2 border-primary shrink-0 mt-0.5 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            </div>
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground/30 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <span className={`text-sm font-medium ${isCompleted ? "text-muted-foreground line-through" : isCurrent ? "text-foreground" : "text-muted-foreground/60"}`}>{stage.name}</span>
                            {stage.description && <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{stage.description}</p>}
                            {stage.completed_at && <p className="text-[10px] text-primary mt-1">✓ {new Date(stage.completed_at).toLocaleDateString("pt-BR")}</p>}
                            {isCurrent && <p className="text-[10px] text-primary font-semibold mt-1 flex items-center gap-1"><Sparkles className="h-3 w-3" /> Etapa atual</p>}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </TabsContent>

              {/* FILES TAB */}
              <TabsContent value="files" className="space-y-3">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Arquivos do Projeto</label>
                {isLoadingFiles ? (
                  <div className="bg-card/50 border border-border/50 rounded-2xl p-6 text-center">
                    <div className="animate-pulse text-muted-foreground text-sm">Carregando arquivos...</div>
                  </div>
                ) : files.length === 0 ? (
                  <div className="bg-card/50 border border-border/50 rounded-2xl p-8 text-center">
                    <FolderOpen className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">Nenhum arquivo disponível.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {files.map((file, idx) => (
                      <motion.div
                        key={file.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center justify-between p-4 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/20 transition-all gap-3 group"
                      >
                        <span className="text-sm text-foreground truncate flex-1">{file.name}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          {file.viewUrl && (
                            <Button asChild variant="outline" size="sm" className="gap-1.5 rounded-xl">
                              <a href={file.viewUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-3.5 w-3.5" />Abrir</a>
                            </Button>
                          )}
                          {file.downloadUrl && (
                            <Button asChild variant="ghost" size="sm" className="gap-1.5 rounded-xl">
                              <a href={file.downloadUrl} target="_blank" rel="noopener noreferrer"><FileDown className="h-3.5 w-3.5" />Baixar</a>
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* FINANCE TAB */}
              <TabsContent value="finance" className="space-y-4">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Detalhes Financeiros</label>
                {!payment ? (
                  <div className="bg-card/50 border border-border/50 rounded-2xl p-8 text-center">
                    <DollarSign className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">Nenhuma informação financeira disponível.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Orçamento Total</span>
                        <span className="text-2xl font-bold text-foreground font-display">{formatCurrency(payment.budget_total)}</span>
                      </div>
                      {payment.initial_payment != null && payment.initial_payment > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Entrada</span>
                          <div className="text-right">
                            <span className="text-foreground font-medium">{formatCurrency(payment.initial_payment)}</span>
                            {payment.initial_payment_date && (
                              <span className="text-muted-foreground text-xs ml-2">({new Date(payment.initial_payment_date + "T00:00:00").toLocaleDateString("pt-BR")})</span>
                            )}
                          </div>
                        </div>
                      )}
                      {payment.remaining_amount != null && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Saldo Restante</span>
                          <span className="text-primary font-semibold">{formatCurrency(payment.remaining_amount)}</span>
                        </div>
                      )}
                    </div>
                    {payment.installments_total != null && payment.installments_total > 0 && (
                      <div className="bg-card/50 border border-border/50 rounded-2xl p-5 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Parcelas</span>
                          <span className="text-foreground font-medium">{payment.installments_paid ?? 0} de {payment.installments_total} pagas</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((payment.installments_paid ?? 0) / payment.installments_total) * 100}%` }}
                            transition={{ duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-primary to-kiiro-glow rounded-full"
                          />
                        </div>
                        {payment.next_payment_date && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>Próximo: {new Date(payment.next_payment_date + "T00:00:00").toLocaleDateString("pt-BR")}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {payment.notes && (
                      <div className="bg-card/50 border border-border/50 rounded-2xl p-4">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Observações</label>
                        <p className="text-sm text-foreground mt-2 whitespace-pre-wrap">{payment.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>

              {/* MESSAGES TAB */}
              <TabsContent value="messages" className="space-y-4">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Mensagens e Feedbacks</label>
                <div className="bg-card/50 border border-border/50 rounded-2xl overflow-hidden flex flex-col" style={{ height: "400px" }}>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <MessageSquare className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                          <p className="text-muted-foreground text-sm">Envie a primeira mensagem!</p>
                        </div>
                      </div>
                    ) : messages.map((msg) => {
                      const isOwn = msg.sender_id === user?.id;
                      return (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`max-w-[80%] px-4 py-2.5 text-sm ${
                            isOwn ? "bg-gradient-to-br from-primary to-kiiro-dark text-primary-foreground rounded-2xl rounded-br-md" : "bg-secondary text-foreground rounded-2xl rounded-bl-md"
                          }`}>
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                            <p className={`text-[10px] mt-1 ${isOwn ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                              {new Date(msg.created_at).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="border-t border-border/50 p-3 flex gap-2 bg-card/30">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Escreva sua mensagem..."
                      className="min-h-[40px] max-h-[100px] resize-none text-sm rounded-xl"
                      onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    />
                    <Button onClick={sendMessage} disabled={!newMessage.trim() || sendingMessage} size="icon" className="shrink-0 h-10 w-10 rounded-xl">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    );
  }

  // Project list view (main dashboard)
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <header className="border-b border-black/10 bg-white/70 backdrop-blur-xl sticky top-16 md:top-20 z-30 mt-16 md:mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <h2 className="text-sm font-medium text-primary uppercase tracking-widest font-display">Área do Cliente</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut} className="text-black/50 hover:text-black">
            <LogOut className="h-4 w-4 mr-2" />Sair
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Welcome hero card with yellow background */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-2xl pointer-events-none" />
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary p-7 sm:p-9 shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.08] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/10 border border-black/10 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary-foreground font-semibold">Painel ativo</span>
              </div>
              <h1 className="text-3xl font-bold text-primary-foreground font-display">
                Olá, {profile?.full_name || "Cliente"}.
              </h1>
              <p className="text-sm text-primary-foreground/70 mt-2">Acompanhe seus projetos em tempo real.</p>
            </div>
          </div>
        </motion.div>

        {/* Pending quotes banner */}
        <AnimatePresence>
          {pendingQuotes.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Orçamentos Pendentes</h2>
              </div>
              {pendingQuotes.map((quote) => (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-primary" />
                        <span className="font-display font-bold text-primary">ORC-{String(quote.sequential_number).padStart(4, "0")}</span>
                      </div>
                      <p className="text-sm text-foreground mt-1 font-medium">{quote.project_type}</p>
                      {quote.description && <p className="text-xs text-muted-foreground mt-0.5">{quote.description}</p>}
                    </div>
                    <p className="font-display font-bold text-xl text-foreground">{formatCurrency(Number(quote.total_value))}</p>
                  </div>

                  {/* Items */}
                  {(quote.items as any[])?.length > 0 && (
                    <div className="border border-border/50 rounded-xl overflow-hidden mb-3">
                      {(quote.items as any[]).map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between px-4 py-2 text-sm border-b border-border/50 last:border-0">
                          <span className="text-foreground">{item.description}</span>
                          <span className="text-muted-foreground">{item.quantity}x {formatCurrency(item.unit_price)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {quote.payment_terms && (
                    <p className="text-xs text-muted-foreground mb-3">
                      <span className="font-medium">Condições:</span> {quote.payment_terms}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Button
                      onClick={() => respondToQuote(quote, "aprovado")}
                      className="flex-1 gap-2 rounded-xl"
                      style={{ backgroundColor: "hsl(142, 71%, 35%)", color: "white" }}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Aprovar Orçamento
                    </Button>
                    <Button
                      onClick={() => respondToQuote(quote, "recusado")}
                      variant="outline"
                      className="flex-1 gap-2 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      Recusar
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.section>
          )}
        </AnimatePresence>

        {/* Active projects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Projetos Ativos</h2>
          </div>
          {activeProjects.length === 0 ? (
            <div className="bg-card/50 border border-border/50 rounded-2xl p-8 text-center">
              <p className="text-muted-foreground text-sm">Nenhum projeto ativo no momento.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {activeProjects.map((project, idx) => (
                <motion.button
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  onClick={() => openProjectDetail(project)}
                  className={`bg-card/80 border border-border/50 rounded-2xl p-5 hover:border-primary/30 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.15)] transition-all text-left w-full group`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{project.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!projectBriefingStatus[project.id] && (
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-destructive/10 text-destructive font-medium border border-destructive/20">
                          Briefing pendente
                        </span>
                      )}
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">
                        {statusLabels[project.status] || project.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progresso</span>
                      <span className="font-semibold text-primary">{project.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-kiiro-glow rounded-full transition-all duration-500" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                  {project.deadline && (
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Previsão: {new Date(project.deadline).toLocaleDateString("pt-BR")}</span>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          )}
        </motion.section>

        {/* Completed projects */}
        {completedProjects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Projetos Finalizados</h2>
            </div>
            <div className="grid gap-3">
              {completedProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => openProjectDetail(project)}
                  className="bg-card/50 border border-border/30 rounded-2xl p-4 flex items-center justify-between hover:border-primary/20 transition-all w-full text-left"
                >
                  <div>
                    <h3 className="font-medium text-foreground text-sm">{project.name}</h3>
                    <p className="text-xs text-muted-foreground">{project.type}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Entregue ✓</span>
                </button>
              ))}
            </div>
          </motion.section>
        )}

        {/* Service Orders section */}
        {serviceOrders.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Ordens de Serviço</h2>
            </div>
            <div className="grid gap-3">
              {serviceOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card/80 border border-border/50 rounded-2xl p-5 hover:border-primary/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-primary" />
                        <span className="font-display font-bold text-primary">OS #{getOsHash(order)}</span>
                      </div>
                      <p className="text-sm text-foreground mt-1 font-medium">{order.service_type}</p>
                      {order.description && <p className="text-xs text-muted-foreground mt-0.5">{order.description}</p>}
                    </div>
                    <p className="font-display font-bold text-xl text-foreground">{formatCurrencyValue(Number(order.total_value))}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("pt-BR")}
                      {order.deadline && ` · Prazo: ${new Date(order.deadline + "T00:00:00").toLocaleDateString("pt-BR")}`}
                    </span>
                    <Button variant="outline" size="sm" className="gap-2 rounded-xl" onClick={() => setViewOrder(order)}>
                      <FileText className="h-3.5 w-3.5" />
                      Ver Documento
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* OS View/Print Modal */}
        <Dialog open={!!viewOrder} onOpenChange={(o) => !o && setViewOrder(null)}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0">
            {viewOrder && (
              <>
                <div className="flex justify-end gap-2 p-4 pb-0">
                  <Button onClick={handlePrintOS} variant="outline" className="gap-2">
                    <Printer className="h-4 w-4" /> Imprimir / PDF
                  </Button>
                </div>
                <div ref={osPrintRef}>
                  <div style={{ background: "#1a1a1a", color: "#fff", padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", textTransform: "uppercase", letterSpacing: "4px", color: "#999", marginBottom: "8px" }}>Ordem de Serviço</h2>
                      <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>{PROVIDER.name}</h1>
                      <p style={{ fontSize: "13px", color: "#aaa", lineHeight: 1.5 }}>{PROVIDER.document}<br />{PROVIDER.address}</p>
                    </div>
                    <img src={kiiroLogo} alt="Studio Kiiro" style={{ height: "48px" }} />
                  </div>
                  <div style={{ padding: "32px 40px" }}>
                    <div style={{ marginBottom: "28px" }}>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", textTransform: "uppercase", letterSpacing: "3px", color: "#666", fontWeight: 600, marginBottom: "14px" }}>Cliente</div>
                      <div style={{ border: "1px solid #e5e5e5", borderRadius: "4px", padding: "20px 24px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                          <div>
                            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", marginBottom: "4px" }}>Nome</div>
                            <div style={{ fontSize: "14px", color: "#1a1a1a" }}>{viewOrder.profiles?.full_name || profile?.full_name || "—"}</div>
                          </div>
                          <div>
                            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", marginBottom: "4px" }}>Contato</div>
                            <div style={{ fontSize: "14px", color: "#1a1a1a" }}>{viewOrder.profiles?.email || "—"}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ marginBottom: "28px" }}>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", textTransform: "uppercase", letterSpacing: "3px", color: "#666", fontWeight: 600, marginBottom: "14px" }}>Resumo</div>
                      <div style={{ border: "1px solid #e5e5e5", borderRadius: "4px", padding: "20px 24px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                          <div>
                            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", marginBottom: "4px" }}>Título</div>
                            <div style={{ fontSize: "14px", color: "#1a1a1a" }}>{viewOrder.service_type}</div>
                          </div>
                          <div>
                            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", marginBottom: "4px" }}>Vencimento</div>
                            <div style={{ fontSize: "14px", color: "#1a1a1a" }}>{viewOrder.deadline ? formatDateLong(viewOrder.deadline) : "—"}</div>
                          </div>
                          <div>
                            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", marginBottom: "4px" }}>Descrição</div>
                            <div style={{ fontSize: "14px", color: "#1a1a1a", lineHeight: 1.5 }}>{viewOrder.description || "—"}</div>
                          </div>
                          <div>
                            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", marginBottom: "4px" }}>Responsável</div>
                            <div style={{ fontSize: "14px", color: "#1a1a1a" }}>{PROVIDER.name}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {Array.isArray(viewOrder.items) && viewOrder.items.length > 0 && viewOrder.items.some((i: any) => i.description) && (
                      <div style={{ marginBottom: "28px" }}>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", textTransform: "uppercase", letterSpacing: "3px", color: "#666", fontWeight: 600, marginBottom: "14px" }}>Itens e Serviços</div>
                        <div style={{ border: "1px solid #e5e5e5", borderRadius: "4px", padding: "0" }}>
                          <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                              <tr>
                                <th style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", padding: "14px 16px", textAlign: "left", borderBottom: "1px solid #e5e5e5" }}>Descrição</th>
                                <th style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", padding: "14px 16px", textAlign: "right", borderBottom: "1px solid #e5e5e5" }}>Qtd</th>
                                <th style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", padding: "14px 16px", textAlign: "right", borderBottom: "1px solid #e5e5e5" }}>Valor Unit.</th>
                                <th style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", padding: "14px 16px", textAlign: "right", borderBottom: "1px solid #e5e5e5" }}>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(viewOrder.items as ServiceItem[]).filter((i) => i.description).map((item, idx) => (
                                <tr key={idx}>
                                  <td style={{ padding: "14px 16px", fontSize: "14px", borderBottom: "1px solid #f0f0f0" }}>{item.description}</td>
                                  <td style={{ padding: "14px 16px", fontSize: "14px", textAlign: "right", borderBottom: "1px solid #f0f0f0" }}>{item.qty}</td>
                                  <td style={{ padding: "14px 16px", fontSize: "14px", textAlign: "right", borderBottom: "1px solid #f0f0f0" }}>{formatCurrencyValue(item.unit_price)}</td>
                                  <td style={{ padding: "14px 16px", fontSize: "14px", textAlign: "right", borderBottom: "1px solid #f0f0f0" }}>{formatCurrencyValue(item.qty * item.unit_price)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "16px", padding: "16px" }}>
                            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999" }}>Total Geral</span>
                            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px", fontWeight: 700, color: "#1a1a1a" }}>{formatCurrencyValue(Number(viewOrder.total_value))}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {(!Array.isArray(viewOrder.items) || viewOrder.items.length === 0 || !viewOrder.items.some((i: any) => i.description)) && (
                      <div style={{ marginBottom: "28px" }}>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", textTransform: "uppercase", letterSpacing: "3px", color: "#666", fontWeight: 600, marginBottom: "14px" }}>Valor</div>
                        <div style={{ border: "1px solid #e5e5e5", borderRadius: "4px", padding: "20px 24px", textAlign: "right" }}>
                          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", marginRight: "16px" }}>Total Geral</span>
                          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px", fontWeight: 700, color: "#1a1a1a" }}>{formatCurrencyValue(Number(viewOrder.total_value))}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: "center", padding: "40px", color: "#999", fontSize: "12px", lineHeight: 1.8, borderTop: "1px solid #e5e5e5", marginTop: "20px" }}>
                    OS #{getOsHash(viewOrder)} gerada em {formatDateTimeLong(viewOrder.created_at)}<br />
                    Documento emitido via Studio Kiiro
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default ClientDashboard;
