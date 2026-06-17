import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  LogOut, FolderOpen, CheckCircle2, Clock, Circle, FileDown,
  ExternalLink, DollarSign, MessageSquare, Send, ArrowLeft, ClipboardList,
  Receipt, ThumbsUp, ThumbsDown, Hash, Sparkles, FileText, Printer,
  ArrowRight, CreditCard, AlertCircle, Folder, LayoutGrid, List,
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
import kiiroLogo from "@/assets/logo.webp";
import ProposalGate from "./ProposalGate";

interface Project {
  id: string; name: string; type: string; status: string; progress: number; deadline: string | null;
}
interface Stage {
  id: string; name: string; status: string; sort_order: number; description: string | null; completed_at: string | null;
}
interface ProjectFile { name: string; viewUrl: string | null; downloadUrl: string | null; }
interface Payment {
  id: string; project_id: string; budget_total: number; initial_payment: number | null; initial_payment_date: string | null;
  remaining_amount: number | null; installments_total: number | null; installments_paid: number | null;
  next_payment_date: string | null; notes: string | null; payment_status: string | null;
}
interface Message { id: string; sender_id: string; content: string; created_at: string; }
interface QuoteItem { description: string; quantity: number; unit_price: number; }
interface Quote {
  id: string; sequential_number: number; project_type: string; description: string | null;
  items: QuoteItem[]; total_value: number; payment_terms: string | null;
  validity_date: string | null; status: string; created_at: string; notes: string | null;
  client_id: string; admin_confirmed: boolean;
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

// All project headers now use yellow (primary) background
const statusGradients: Record<string, string> = {
  briefing: "",
  planejamento: "",
  producao: "",
  revisao: "",
  finalizacao: "",
  entregue: "",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const DashboardPageWrapper = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen relative">
    {/* Layered background */}
    <div className="fixed inset-0 bg-black" />
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 40%, hsl(0 0% 8%) 0%, transparent 100%)",
      }}
    />
    <div
      className="fixed inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: "linear-gradient(hsl(0 0% 25%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 25%) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
    <div className="relative z-10">{children}</div>
  </div>
);

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
  const [clientProfileId, setClientProfileId] = useState<string | null>(null);

  // All payments for "next step" card
  const [allPayments, setAllPayments] = useState<Payment[]>([]);
  const [activeTab, setActiveTab] = useState<"status" | "briefing" | "files" | "finance" | "messages">("status");
  const fetchQuotes = async () => {
    const { data } = await supabase
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setQuotes(data as any);
  };

  useEffect(() => {
    const fetchProfileId = async () => {
      if (!user) return;
      const { data } = await supabase.from("profiles").select("id").eq("user_id", user.id).single();
      if (data) setClientProfileId(data.id);
    };
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
    const fetchServiceOrders = async () => {
      const { data } = await supabase
        .from("service_orders")
        .select("*, profiles(full_name, email)")
        .order("created_at", { ascending: false });
      if (data) setServiceOrders(data as any);
    };
    const fetchAllPayments = async () => {
      const { data: projectsData } = await supabase.from("projects").select("id").neq("status", "entregue");
      if (projectsData?.length) {
        const { data: paymentsData } = await supabase
          .from("client_payments_view" as any)
          .select("*")
          .in("project_id", projectsData.map((p) => p.id));
        if (paymentsData) setAllPayments(paymentsData as any);
      }
    };
    fetchProfileId();
    fetchProjects();
    fetchQuotes();
    fetchServiceOrders();
    fetchAllPayments();
  }, [user]);

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
      supabase.from("client_payments_view" as any).select("*").eq("project_id", project.id).maybeSingle(),
      supabase.from("messages").select("*").eq("project_id", project.id).order("created_at", { ascending: true }),
    ]);

    if (stagesRes.data) setStages(stagesRes.data);
    if (paymentRes.data) setPayment(paymentRes.data as any);
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

  const currentStage = stages.find(s => s.status !== "concluida");
  const isReviewPhase = currentStage?.name.toLowerCase().includes("revisão") || currentStage?.name.toLowerCase().includes("entrega");

  // Gate: check if client has any confirmed quote (approved + admin_confirmed)
  const hasConfirmedAccess = quotes.some((q) => q.status === "aprovado" && q.admin_confirmed);

  // If no confirmed access yet and there are quotes, show the ProposalGate
  if (!hasConfirmedAccess && quotes.length > 0 && clientProfileId && !selectedProject) {
    return (
      <ProposalGate
        quotes={quotes}
        profileId={clientProfileId}
        onQuotesUpdated={fetchQuotes}
      />
    );
  }

  // Project detail view
  if (selectedProject) {
    return (
      <DashboardPageWrapper>
        <Navbar forceBlack />
        <header className="border-b border-white/10 bg-black sticky top-[calc(7rem-55px)] md:top-[calc(9rem-55px)] z-[60] mt-[calc(8rem-55px)] md:mt-[calc(10rem-55px)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <button onClick={() => setSelectedProject(null)} className="flex items-center gap-2 text-sm text-white/40 hover:text-primary transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Voltar
            </button>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-white/40 hover:text-white">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
          {/* Project header, yellow bg with immersive animation */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-primary/15 blur-2xl pointer-events-none" />
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary p-6 sm:p-8 shadow-2xl shadow-primary/20 hover:-translate-y-[1px] hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.35)] transition-all duration-500">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.06] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/[0.04] rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
              <div className="relative">
                <h1 className="text-2xl sm:text-3xl font-bold text-black font-display">{selectedProject.name}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-sm text-black/70">{selectedProject.type}</p>
                  <span className="text-[10px] px-2.5 py-1 rounded-lg bg-black/10 text-black font-semibold border border-black/10">
                    {statusLabels[selectedProject.status] || selectedProject.status}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="mt-5 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-black/70">Progresso geral</span>
                    <span className="font-bold text-black">{selectedProject.progress}%</span>
                  </div>
                  <div className="h-2.5 bg-black/15 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedProject.progress}%` }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                      className="h-full bg-black rounded-full"
                    />
                  </div>
                </div>
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
                className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <ClipboardList className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Briefing Pendente</h3>
                    <p className="text-xs text-white/50 mt-0.5">
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
            <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-[#0D0D0D] border-[#222] text-[#F5F5F5]">
              <DialogHeader>
                <DialogTitle style={{ fontFamily: "var(--font-display)" }} className="text-[#F5F5F5] text-xl">
                  Briefing, {selectedProject.type}
                </DialogTitle>
                <p className="text-sm text-[#B3B3B3] mt-1">
                  Preencha com o máximo de detalhes possível para um resultado incrível.
                </p>
              </DialogHeader>
              <div className="space-y-7 mt-4">
                {currentBriefingQuestions?.map((q) => {
                  if (q.type === "section") {
                    return (
                      <div key={q.id} className="pt-6 pb-2 border-b border-[#2A2A2A] mt-4">
                        <h3 className="text-base font-bold text-primary uppercase tracking-widest">{q.question}</h3>
                      </div>
                    );
                  }
                  return (
                    <div key={q.id} className="space-y-2.5">
                      <label className="text-[15px] font-medium text-[#F5F5F5] leading-snug">
                        {q.question} {q.required && <span className="text-primary font-bold">*</span>}
                      </label>
                      {(q.type === "text" || q.type === "email" || q.type === "phone") && (
                        <Input
                          type={q.type === "email" ? "email" : q.type === "phone" ? "tel" : "text"}
                          value={briefingAnswers[q.id] || ""}
                          onChange={(e) => setBriefingAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                          placeholder={q.placeholder || "Sua resposta..."}
                          className="rounded-xl bg-[#1A1A1A] border-[#333] text-[#F5F5F5] placeholder:text-[#666] focus-visible:ring-primary focus-visible:border-primary focus-visible:shadow-[0_0_8px_hsl(46_95%_54%/0.15)]"
                        />
                      )}
                      {q.type === "textarea" && (
                        <Textarea
                          value={briefingAnswers[q.id] || ""}
                          onChange={(e) => setBriefingAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                          placeholder={q.placeholder || "Sua resposta..."}
                          rows={3}
                          className="rounded-xl bg-[#1A1A1A] border-[#333] text-[#F5F5F5] placeholder:text-[#666] focus-visible:ring-primary focus-visible:border-primary focus-visible:shadow-[0_0_8px_hsl(46_95%_54%/0.15)]"
                        />
                      )}
                      {q.type === "select" && q.options && (
                        <div className="space-y-2">
                          <div className="space-y-1.5">
                            {q.options.map((opt) => (
                              <label key={opt} className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-primary/20">
                                <input type="radio" name={q.id} checked={(briefingAnswers[q.id] || "").startsWith(opt)} onChange={() => setBriefingAnswers((prev) => ({ ...prev, [q.id]: opt }))} className="h-4 w-4 text-primary accent-primary" />
                                <span className="text-sm text-[#F5F5F5]">{opt}</span>
                              </label>
                            ))}
                          </div>
                          {q.hasConditionalText && briefingAnswers[q.id] && (
                            <Input value={briefingAnswers[`${q.id}_detail`] || ""} onChange={(e) => setBriefingAnswers((prev) => ({ ...prev, [`${q.id}_detail`]: e.target.value }))} placeholder="Especifique..." className="ml-6 rounded-xl bg-[#1A1A1A] border-[#333] text-[#F5F5F5] placeholder:text-[#666] focus-visible:ring-primary focus-visible:border-primary" />
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
                              <label key={opt} className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-primary/20">
                                <Checkbox checked={isChecked} onCheckedChange={(checked) => {
                                  const newSelected = checked ? [...selected, opt] : selected.filter((s) => s !== opt);
                                  setBriefingAnswers((prev) => ({ ...prev, [q.id]: newSelected.join("|||") }));
                                }} className="border-[#555] data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                <span className="text-sm text-[#F5F5F5]">{opt}</span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="flex justify-end gap-2 pt-5 border-t border-[#2A2A2A]">
                  <Button variant="ghost" onClick={() => setBriefingOpen(false)} className="text-[#B3B3B3] hover:text-[#F5F5F5] hover:bg-white/5">Cancelar</Button>
                  <Button onClick={submitBriefing} disabled={submittingBriefing} className="rounded-xl">{submittingBriefing ? "Enviando..." : "Enviar Briefing"}</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Tabs */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Tabs defaultValue="status" className="space-y-8">
              <TabsList className="bg-black border border-white/10 h-12 p-1.5 gap-1 grid grid-cols-4 w-full rounded-xl">
                <TabsTrigger value="status" className="gap-1.5 text-xs rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-200 text-white/40 hover:text-white/60 hover:bg-white/[0.03]">
                  <CheckCircle2 className="h-3.5 w-3.5" /><span className="hidden sm:inline">Status</span>
                </TabsTrigger>
                <TabsTrigger value="files" className="gap-1.5 text-xs rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-200 text-white/40 hover:text-white/60 hover:bg-white/[0.03]">
                  <FolderOpen className="h-3.5 w-3.5" /><span className="hidden sm:inline">Arquivos</span>
                </TabsTrigger>
                <TabsTrigger value="finance" className="gap-1.5 text-xs rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-200 text-white/40 hover:text-white/60 hover:bg-white/[0.03]">
                  <DollarSign className="h-3.5 w-3.5" /><span className="hidden sm:inline">Financeiro</span>
                </TabsTrigger>
                <TabsTrigger value="messages" className="gap-1.5 text-xs rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-200 text-white/40 hover:text-white/60 hover:bg-white/[0.03]">
                  <MessageSquare className="h-3.5 w-3.5" /><span className="hidden sm:inline">Mensagens</span>
                </TabsTrigger>
              </TabsList>

              {/* STATUS TAB */}
              <TabsContent value="status" className="space-y-6">
                <div className="rounded-xl border border-white/10 bg-black p-6 sm:p-8 space-y-4">
                  <p className="text-xs text-white/50 font-medium">{completedStages} de {stages.length} etapas concluídas</p>
                  {stages.length > 0 && (
                    <div className="space-y-2.5">
                      {stages.map((stage, idx) => {
                        const isCompleted = stage.status === "concluida";
                        const isCurrent = idx === currentStageIndex;
                        return (
                          <motion.div
                            key={stage.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`relative flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 group hover:-translate-y-0.5 hover:shadow-md ${
                              isCurrent ? "border-primary/30 bg-primary/10 shadow-md shadow-primary/10" : isCompleted ? "border-white/10 bg-white/5" : "border-white/5 bg-transparent"
                            }`}
                          >
                            {/* Yellow accent on hover */}
                            <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-primary rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center" />
                            {isCompleted ? (
                              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            ) : isCurrent ? (
                              <div className="h-5 w-5 rounded-full border-2 border-primary shrink-0 mt-0.5 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                              </div>
                            ) : (
                              <Circle className="h-5 w-5 text-white/20 shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 min-w-0">
                              <span className={`text-sm font-medium ${isCompleted ? "text-white/40 line-through" : isCurrent ? "text-white" : "text-white/30"}`}>{stage.name}</span>
                              {stage.description && <p className="text-[11px] text-white/35 mt-0.5 line-clamp-2">{stage.description}</p>}
                              {stage.completed_at && <p className="text-[10px] text-primary mt-1">✓ {new Date(stage.completed_at).toLocaleDateString("pt-BR")}</p>}
                              {isCurrent && <p className="text-[10px] text-primary font-semibold mt-1 flex items-center gap-1"><Sparkles className="h-3 w-3" /> Etapa atual</p>}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {isReviewPhase && (
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Central de Feedback</h3>
                      <p className="text-xs text-white/60">Estamos na fase de revisão. Envie seus ajustes detalhados para nossa equipe.</p>
                    </div>
                    <Button
                      onClick={() => {
                        const feedback = prompt("Descreva detalhadamente os ajustes necessários:");
                        if (feedback) {
                          supabase.from("project_feedbacks").insert({
                            project_id: selectedProject.id,
                            stage_id: currentStage?.id,
                            client_id: user?.id,
                            content: feedback
                          }).then(({ error }) => {
                            if (error) toast.error("Erro ao enviar feedback");
                            else toast.success("Feedback enviado com sucesso!");
                          });
                        }
                      }}
                      className="gap-2 rounded-xl w-full sm:w-auto"
                    >
                      <MessageSquare className="h-4 w-4" /> Enviar Feedback
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* FILES TAB */}
              <TabsContent value="files" className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-black p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold">Arquivos do Projeto</label>
                    {files.length > 0 && (
                      <Button variant="outline" size="sm" className="gap-2 text-xs rounded-xl" onClick={() => {
                        files.forEach(f => {
                          if (f.downloadUrl) window.open(f.downloadUrl, '_blank');
                        });
                        toast.success("Iniciando downloads...");
                      }}>
                        <FileDown className="h-3.5 w-3.5" /> Baixar Todos
                      </Button>
                    )}
                  </div>
                  {isLoadingFiles ? (
                    <div className="py-12 text-center">
                      <div className="animate-pulse text-white/30 text-sm">Carregando arquivos...</div>
                    </div>
                  ) : files.length === 0 ? (
                    <div className="py-12 text-center">
                      <FolderOpen className="h-8 w-8 text-white/15 mx-auto mb-2" />
                      <p className="text-white/35 text-sm">Nenhum arquivo disponível.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Group files by prefix (e.g., 01_, 02_) */}
                      {(() => {
                        const groups: Record<string, typeof files> = {};
                        files.forEach(f => {
                          const parts = f.name.split('_');
                          const group = parts.length > 1 && parts[0].length <= 3 ? parts[0] + "_" + parts[1] : "Geral";
                          if (!groups[group]) groups[group] = [];
                          groups[group].push(f);
                        });

                        return Object.entries(groups).sort().map(([groupName, groupFiles]) => (
                          <div key={groupName} className="space-y-3">
                            <div className="flex items-center gap-2 px-1">
                              <Folder className="h-4 w-4 text-primary/60" />
                              <span className="text-xs font-bold text-white/70 uppercase tracking-wider">{groupName.replace(/_/g, ' ')}</span>
                            </div>
                            <div className="grid gap-2">
                              {groupFiles.map((file, idx) => (
                                <motion.div
                                  key={file.name}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="relative flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:border-primary/20 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 gap-3 group"
                                >
                                  <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-primary rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center" />
                                  <span className="text-sm text-white truncate flex-1 pl-2">{file.name}</span>
                                  <div className="flex items-center gap-2 shrink-0">
                                    {file.viewUrl && (
                                      <Button asChild variant="outline" size="sm" className="gap-1.5 rounded-xl text-white border-white/20 hover:bg-white/10">
                                        <a href={file.viewUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-3.5 w-3.5" />Abrir</a>
                                      </Button>
                                    )}
                                    {file.downloadUrl && (
                                      <Button asChild variant="ghost" size="sm" className="gap-1.5 rounded-xl text-white/50 hover:text-white">
                                        <a href={file.downloadUrl} target="_blank" rel="noopener noreferrer"><FileDown className="h-3.5 w-3.5" />Baixar</a>
                                      </Button>
                                    )}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* FINANCE TAB */}
              <TabsContent value="finance" className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-black p-6 sm:p-8 space-y-5">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold">Resumo Financeiro</label>
                  {!payment ? (
                    <div className="py-12 text-center">
                      <DollarSign className="h-8 w-8 text-white/15 mx-auto mb-2" />
                      <p className="text-white/35 text-sm">Nenhuma informação financeira disponível.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Main value card */}
                      <div className="bg-primary/10 border border-primary/20 rounded-xl p-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/60">Valor Total do Projeto</span>
                          <span className="text-2xl font-bold text-primary font-display">{formatCurrency(payment.budget_total)}</span>
                        </div>

                        {/* Payment status badge */}
                        {(() => {
                          const status = payment.payment_status || "pendente";
                          const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: typeof CheckCircle2 }> = {
                            pago: { label: "Pago", color: "text-emerald-400", bgColor: "bg-emerald-400/10 border-emerald-400/20", icon: CheckCircle2 },
                            parcialmente_pago: { label: "Parcialmente Pago", color: "text-amber-400", bgColor: "bg-amber-400/10 border-amber-400/20", icon: Clock },
                            pendente: { label: "Pendente", color: "text-orange-400", bgColor: "bg-orange-400/10 border-orange-400/20", icon: AlertCircle },
                          };
                          const cfg = statusConfig[status] || statusConfig.pendente;
                          const StatusIcon = cfg.icon;
                          return (
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${cfg.bgColor} ${cfg.color}`}>
                              <StatusIcon className="h-3.5 w-3.5" />
                              {cfg.label}
                            </div>
                          );
                        })()}

                        {payment.initial_payment != null && payment.initial_payment > 0 && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/60">Entrada</span>
                            <div className="text-right">
                              <span className="text-white font-medium">{formatCurrency(payment.initial_payment)}</span>
                              {payment.initial_payment_date && (
                                <span className="text-white/35 text-xs ml-2">({new Date(payment.initial_payment_date + "T00:00:00").toLocaleDateString("pt-BR")})</span>
                              )}
                            </div>
                          </div>
                        )}
                        {payment.remaining_amount != null && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/60">Saldo Restante</span>
                            <span className="text-primary font-semibold">{formatCurrency(payment.remaining_amount)}</span>
                          </div>
                        )}
                      </div>

                      {/* Installments card */}
                      {payment.installments_total != null && payment.installments_total > 0 && (
                        <div className="border border-white/10 rounded-xl p-5 space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/60">Parcelamento</span>
                            <span className="text-white font-medium">
                              {payment.installments_total}x de {formatCurrency(payment.remaining_amount != null && payment.installments_total > 0 ? payment.remaining_amount / payment.installments_total : 0)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/60">Parcelas Pagas</span>
                            <span className="text-white font-medium">{payment.installments_paid ?? 0} de {payment.installments_total}</span>
                          </div>
                          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${((payment.installments_paid ?? 0) / payment.installments_total) * 100}%` }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-primary to-kiiro-glow rounded-full"
                            />
                          </div>

                          {/* Next payment highlight */}
                          {payment.next_payment_date && (payment.installments_paid ?? 0) < payment.installments_total && (
                            <div className="mt-2 p-3 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-primary" />
                                <div>
                                  <p className="text-xs text-white/60">Próxima Parcela</p>
                                  <p className="text-sm font-semibold text-white">
                                    {formatCurrency(payment.remaining_amount != null && payment.installments_total > 0 ? payment.remaining_amount / payment.installments_total : 0)}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] text-white/40 uppercase tracking-wider">Vencimento</p>
                                <p className="text-sm text-primary font-medium">{new Date(payment.next_payment_date + "T00:00:00").toLocaleDateString("pt-BR")}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      {payment.notes && (
                        <div className="border border-white/10 rounded-xl p-4">
                          <label className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold">Observações</label>
                          <p className="text-sm text-white/80 mt-2 whitespace-pre-wrap">{payment.notes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* MESSAGES TAB */}
              <TabsContent value="messages" className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-black overflow-hidden">
                  <div className="px-6 pt-5 pb-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold">Mensagens e Feedbacks</label>
                  </div>
                  <div className="flex flex-col" style={{ height: "400px" }}>
                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                      {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <MessageSquare className="h-8 w-8 text-white/15 mx-auto mb-2" />
                            <p className="text-white/35 text-sm">Envie a primeira mensagem!</p>
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
                              isOwn ? "bg-gradient-to-br from-primary to-kiiro-dark text-black rounded-2xl rounded-br-md" : "bg-white/10 text-white rounded-2xl rounded-bl-md"
                            }`}>
                              <p className="whitespace-pre-wrap">{msg.content}</p>
                              <p className={`text-[10px] mt-1 ${isOwn ? "text-black/50" : "text-white/35"}`}>
                                {new Date(msg.created_at).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                    <div className="border-t border-white/10 p-3 flex gap-2 bg-white/5">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escreva sua mensagem..."
                        className="min-h-[40px] max-h-[100px] resize-none text-sm rounded-xl bg-white/10 border-white/10 text-white placeholder:text-white/30"
                        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                      />
                      <Button onClick={sendMessage} disabled={!newMessage.trim() || sendingMessage} size="icon" className="shrink-0 h-10 w-10 rounded-xl">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </DashboardPageWrapper>
    );
  }

  // Project list view (main dashboard)
  return (
    <DashboardPageWrapper>
      <Navbar forceBlack />
      <header className="border-b border-white/10 bg-black sticky top-[calc(7rem-55px)] md:top-[calc(9rem-55px)] z-[60] mt-[calc(8rem-55px)] md:mt-[calc(10rem-55px)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-[11px] font-semibold text-primary uppercase tracking-[0.3em] font-display">Studio Kiiro Workspace</h2>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] text-white/40 ml-2 border-l border-white/10 pl-3">
              Seu projeto em tempo real
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut} className="text-white/40 hover:text-white">
            <LogOut className="h-4 w-4 mr-2" />Sair
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Welcome hero card with yellow background */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-primary/15 blur-3xl pointer-events-none" />
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary p-7 sm:p-9 shadow-2xl shadow-primary/20 hover:-translate-y-[1px] hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.35)] transition-all duration-500">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.06] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/10 border border-black/10 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-black font-bold">Painel do Cliente</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-black font-display">
                Olá, {profile?.full_name || "Cliente"}.
              </h1>
              <p className="text-sm text-black/70 mt-2 max-w-lg">
                Seu projeto em tempo real. Atualizado por nós, visível por você. <span className="hidden sm:inline italic opacity-60">— Transformando ideias em impacto visual.</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* "Seu Próximo Passo" card */}
        {(() => {
          // Compute next step
          const nextStep = (() => {
            // 1. Pending quote?
            if (pendingQuotes.length > 0) {
              return { text: `Aprovar ou recusar o orçamento ORC-${String(pendingQuotes[0].sequential_number).padStart(4, "0")}`, icon: Receipt, action: "quote" };
            }
            // 2. Briefing pending?
            const projectNeedingBriefing = activeProjects.find((p) => !projectBriefingStatus[p.id]);
            if (projectNeedingBriefing) {
              return { text: `Responder o briefing do projeto "${projectNeedingBriefing.name}"`, icon: ClipboardList, action: "briefing", projectId: projectNeedingBriefing.id };
            }
            // 3. Project in revision phase?
            const projectInRevision = activeProjects.find((p) => p.status === "revisao");
            if (projectInRevision) {
              return { text: `Enviar feedback para "${projectInRevision.name}"`, icon: MessageSquare, action: "feedback", projectId: projectInRevision.id };
            }
            // 4. Payment pending?
            const pendingPayment = allPayments.find((p) => (p.installments_paid ?? 0) < (p.installments_total ?? 1));
            if (pendingPayment) {
              const project = activeProjects.find((pr) => pr.id === pendingPayment.project_id);
              const nextDate = pendingPayment.next_payment_date ? new Date(pendingPayment.next_payment_date + "T00:00:00").toLocaleDateString("pt-BR") : null;
              return {
                text: `Parcela pendente${project ? ` em "${project.name}"` : ""}${nextDate ? `, Vencimento: ${nextDate}` : ""}`,
                icon: CreditCard, action: "payment", projectId: pendingPayment.project_id,
              };
            }
            return null;
          })();

          if (!nextStep) return null;
          const StepIcon = nextStep.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="relative rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 p-5 sm:p-6 overflow-hidden group hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 cursor-pointer"
              onClick={() => {
                if (nextStep.action === "briefing" || nextStep.action === "feedback" || nextStep.action === "payment") {
                  const project = activeProjects.find((p) => p.id === nextStep.projectId);
                  if (project) openProjectDetail(project);
                }
              }}
            >
              <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-primary rounded-full" />
              <div className="flex items-center gap-4 pl-2">
                <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <StepIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-1">Seu Próximo Passo</p>
                  <p className="text-sm text-white font-medium">{nextStep.text}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary/50 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 shrink-0" />
              </div>
            </motion.div>
          );
        })()}

        {/* Pending quotes banner */}
        <AnimatePresence>
          {pendingQuotes.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 bg-black rounded-xl px-4 py-2.5">
                <Receipt className="h-4 w-4 text-primary" />
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">Orçamentos Pendentes</h2>
              </div>
              {pendingQuotes.map((quote) => (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 transition-all duration-200 group overflow-hidden relative"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-primary" />
                        <span className="font-display font-bold text-primary">ORC-{String(quote.sequential_number).padStart(4, "0")}</span>
                      </div>
                      <p className="text-sm text-white mt-1 font-medium">{quote.project_type}</p>
                      {quote.description && <p className="text-xs text-white/55 mt-0.5">{quote.description}</p>}
                    </div>
                    <p className="font-display font-bold text-xl text-white">{formatCurrency(Number(quote.total_value))}</p>
                  </div>

                  {/* Items */}
                  {(quote.items as any[])?.length > 0 && (
                    <div className="border border-white/10 rounded-xl overflow-hidden mb-3">
                      {(quote.items as any[]).map((item: any, idx: number) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-2.5 text-sm border-b border-white/5 last:border-0 gap-0.5 sm:gap-2">
                          <span className="text-white truncate">{item.description}</span>
                          <span className="text-white/55 text-xs sm:text-sm shrink-0">{item.quantity}x {formatCurrency(item.unit_price)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {quote.payment_terms && (
                    <p className="text-xs text-white/40 mb-3">
                      <span className="font-medium text-white/60">Condições:</span> {quote.payment_terms}
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
          <div className="flex items-center gap-2 bg-black rounded-xl px-4 py-2.5">
            <FolderOpen className="h-4 w-4 text-primary" />
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">Projetos Ativos</h2>
          </div>
          {activeProjects.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-10 text-center">
              <FolderOpen className="h-8 w-8 text-white/15 mx-auto mb-2" />
              <p className="text-white/35 text-sm">Nenhum projeto ativo no momento.</p>
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
                  className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 hover:border-primary/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 transition-all duration-200 text-left w-full group overflow-hidden"
                >
                  {/* Yellow accent line */}
                  <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-primary rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center" />
                   <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-primary transition-colors">{project.name}</h3>
                      <p className="text-xs text-white/55 mt-0.5">{project.type}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap shrink-0">
                      {!projectBriefingStatus[project.id] && (
                        <span className="text-[10px] px-2.5 py-1 rounded-lg bg-destructive/10 text-destructive font-medium border border-destructive/20">
                          Briefing pendente
                        </span>
                      )}
                      <span className="text-[10px] px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-semibold border border-primary/20">
                        {statusLabels[project.status] || project.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-white/55">
                      <span>Progresso</span>
                      <span className="font-bold text-white">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 + idx * 0.05 }}
                        className="h-full bg-gradient-to-r from-primary to-kiiro-glow rounded-full"
                      />
                    </div>
                  </div>
                  {project.deadline && (
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-white/50">
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
            <div className="flex items-center gap-2 bg-black rounded-xl px-4 py-2.5">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">Projetos Finalizados</h2>
            </div>
            <div className="grid gap-3">
              {completedProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => openProjectDetail(project)}
                  className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] p-5 flex items-center justify-between hover:border-primary/15 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/20 transition-all duration-200 w-full text-left group overflow-hidden"
                >
                  <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-primary rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center" />
                  <div>
                    <h3 className="font-medium text-white text-sm">{project.name}</h3>
                    <p className="text-xs text-white/50">{project.type}</p>
                  </div>
                  <span className="text-xs text-white/30">Entregue ✓</span>
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
            className="space-y-4"
          >
            <div className="flex items-center gap-2 bg-black rounded-xl px-4 py-2.5">
              <FileText className="h-4 w-4 text-primary" />
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">Ordens de Serviço</h2>
            </div>
            <div className="grid gap-4">
              {serviceOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 hover:border-primary/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 transition-all duration-200 group overflow-hidden"
                >
                  <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-primary rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center" />
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-primary" />
                        <span className="font-display font-bold text-primary">OS #{getOsHash(order)}</span>
                      </div>
                      <p className="text-sm text-white mt-1 font-medium">{order.service_type}</p>
                      {order.description && <p className="text-xs text-white/55 mt-0.5">{order.description}</p>}
                    </div>
                    <p className="font-display font-bold text-xl text-white">{formatCurrencyValue(Number(order.total_value))}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-white/50">
                      {new Date(order.created_at).toLocaleDateString("pt-BR")}
                      {order.deadline && ` · Prazo: ${new Date(order.deadline + "T00:00:00").toLocaleDateString("pt-BR")}`}
                    </span>
                    <Button variant="outline" size="sm" className="gap-2 rounded-xl border-white/10 text-white hover:bg-white/10" onClick={() => setViewOrder(order)}>
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
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0 bg-[#0a0a0a] border-white/10">
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
    </DashboardPageWrapper>
  );
};

export default ClientDashboard;
