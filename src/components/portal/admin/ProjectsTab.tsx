import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FolderPlus, ChevronRight, CheckCircle2, Circle, Upload, FileDown, Trash2,
  FolderOpen, DollarSign, MessageSquare, Send, Clock, Calendar, CreditCard, ClipboardList, Pencil, Check, X, Plus,
  Pause, Play, AlertTriangle, FileText, Heart, Shield, Activity, ListTodo
} from "lucide-react";
import { toast } from "sonner";
import { methodologyStages } from "@/data/methodologyStages";
import { briefingQuestions, type BriefingQuestion } from "@/data/briefingQuestions";

interface Profile { id: string; full_name: string; company: string | null; }
interface Project {
  id: string; name: string; type: string; status: string;
  progress: number; deadline: string | null; start_date: string | null;
  description: string | null; client_id: string; priority: string;
  partner_notes: string | null;
  studio_observation: string | null;
  health_status: string | null;
  partner_message: string | null;
  profiles?: Profile;
}
interface Stage {
  id: string; name: string; status: string; sort_order: number;
  description: string | null; completed_at: string | null;
  internal_tasks: { id: string; text: string; completed: boolean }[] | null;
}
interface Payment {
  id: string; budget_total: number; initial_payment: number | null;
  initial_payment_date: string | null; remaining_amount: number | null;
  installments_total: number | null; installments_paid: number | null;
  next_payment_date: string | null; notes: string | null;
}
interface Message {
  id: string; sender_id: string; content: string; created_at: string;
}

const statusColors: Record<string, string> = {
  briefing: "bg-blue-500/10 text-blue-400",
  planejamento: "bg-amber-500/10 text-amber-400",
  producao: "bg-primary/10 text-primary",
  revisao: "bg-purple-500/10 text-purple-400",
  finalizacao: "bg-emerald-500/10 text-emerald-400",
  entregue: "bg-muted text-muted-foreground",
  pausado: "bg-orange-500/10 text-orange-400",
};
const statusLabels: Record<string, string> = {
  briefing: "Briefing", planejamento: "Planejamento", producao: "Produção",
  revisao: "Revisão", finalizacao: "Finalização", entregue: "Entregue",
  pausado: "Pausado",
};

const activeStatuses = ["briefing", "planejamento", "producao", "revisao", "finalizacao"];
const deliveredStatuses = ["entregue"];
const pausedStatuses = ["pausado"];

const projectTypes = [
  "Logotipo Essencial", "Identidade Visual", "Branding Completo", "Manual de Logotipo",
  "Personal Brand Kit", "Design de Conteúdo para Redes Sociais", "Edição de Vídeo — Reels/Shorts",
  "Edição de Vídeo — Institucional", "Edição de Vídeo — Tutorial/Educativo",
  "Landing Page Simples", "Landing Page Completa", "Site Institucional", "Site Completo",
  "Apresentações Comerciais e Institucionais", "Layout de Transmissão",
];

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

const ProjectsTab = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Profile[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [stages, setStages] = useState<Stage[]>([]);
  const [files, setFiles] = useState<{ name: string }[]>([]);
  const [selectedFileNames, setSelectedFileNames] = useState<Set<string>>(new Set());
  const [payment, setPayment] = useState<Payment | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [briefingResponse, setBriefingResponse] = useState<Record<string, string> | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [editName, setEditName] = useState("");

  const [form, setForm] = useState({
    name: "", type: "Logotipo Essencial", client_id: "", description: "",
    deadline: "", start_date: "", priority: "normal",
  });

  // Finance form for inline creation
  const [financeForm, setFinanceForm] = useState({
    budget_total: "", initial_payment: "", initial_payment_date: "",
    installments_total: "1", installments_paid: "0", next_payment_date: "", notes: "",
  });
  const [savingFinance, setSavingFinance] = useState(false);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*, profiles!projects_client_id_fkey(id, full_name, company)")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Erro ao buscar projetos:", error);
      toast.error("Não foi possível carregar os projetos");
      return;
    }
    if (data) setProjects(data as any);
  };

  const fetchClients = async () => {
    const { data } = await supabase.from("profiles").select("id, full_name, company");
    if (data) setClients(data);
  };

  useEffect(() => {
    if (!user) return;
    fetchProjects();
    fetchClients();
  }, [user?.id]);

  // Realtime messages
  useEffect(() => {
    if (!selectedProject) return;
    const channel = supabase
      .channel(`admin-messages-${selectedProject.id}`)
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "messages",
        filter: `project_id=eq.${selectedProject.id}`,
      }, (payload) => {
        setMessages((prev) => [...prev, payload.new as Message]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [selectedProject]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: projectData, error } = await supabase.from("projects").insert({
      name: form.name, type: form.type, client_id: form.client_id,
      description: form.description || null, deadline: form.deadline || null,
      start_date: form.start_date || null, priority: form.priority,
    }).select("id").single();

    if (error || !projectData) {
      toast.error(error?.message || "Erro ao criar projeto");
      setLoading(false);
      return;
    }

    const stagesData = methodologyStages[form.type];
    if (stagesData?.length) {
      await supabase.from("project_stages").insert(
        stagesData.map((s) => ({ project_id: projectData.id, name: s.name, description: s.description, sort_order: s.sort_order }))
      );
    }

    toast.success("Projeto criado com etapas da metodologia!");
    setOpenCreate(false);
    setForm({ name: "", type: "Logotipo Essencial", client_id: "", description: "", deadline: "", start_date: "", priority: "normal" });
    fetchProjects();
    setLoading(false);
  };

  const openProjectDetail = async (project: Project) => {
    setSelectedProject(project);
    setSelectedFileNames(new Set());
    setPayment(null);
    setMessages([]);
    setNewMessage("");

    setBriefingResponse(null);
    const [stagesRes, filesRes, paymentRes, messagesRes, briefingRes] = await Promise.all([
      supabase.from("project_stages").select("*").eq("project_id", project.id).order("sort_order"),
      supabase.storage.from("project-files").list(project.id),
      supabase.from("payments").select("*").eq("project_id", project.id).maybeSingle(),
      supabase.from("messages").select("*").eq("project_id", project.id).order("created_at", { ascending: true }),
      supabase.from("briefing_responses").select("responses").eq("project_id", project.id).maybeSingle(),
    ]);

    if (stagesRes.data) setStages(stagesRes.data as any);
    if (filesRes.data) setFiles(filesRes.data);
    if (paymentRes.data) {
      setPayment(paymentRes.data);
      setFinanceForm({
        budget_total: String(paymentRes.data.budget_total),
        initial_payment: String(paymentRes.data.initial_payment ?? ""),
        initial_payment_date: paymentRes.data.initial_payment_date ?? "",
        installments_total: String(paymentRes.data.installments_total ?? "1"),
        installments_paid: String(paymentRes.data.installments_paid ?? "0"),
        next_payment_date: paymentRes.data.next_payment_date ?? "",
        notes: paymentRes.data.notes ?? "",
      });
    } else {
      setFinanceForm({ budget_total: "", initial_payment: "", initial_payment_date: "", installments_total: "1", installments_paid: "0", next_payment_date: "", notes: "" });
    }
    if (messagesRes.data) setMessages(messagesRes.data);
    if (briefingRes.data) setBriefingResponse(briefingRes.data.responses as Record<string, string>);
  };

  const toggleStage = async (stage: Stage) => {
    const newStatus = stage.status === "concluida" ? "pendente" : "concluida";
    const completedAt = newStatus === "concluida" ? new Date().toISOString() : null;
    const { error } = await supabase.from("project_stages").update({ status: newStatus, completed_at: completedAt }).eq("id", stage.id);
    if (error) { toast.error("Erro ao atualizar etapa"); return; }

    const updated = stages.map((s) => s.id === stage.id ? { ...s, status: newStatus, completed_at: completedAt } : s);
    setStages(updated);
    const done = updated.filter((s) => s.status === "concluida").length;
    const progress = updated.length > 0 ? Math.round((done / updated.length) * 100) : 0;
    await supabase.from("projects").update({ progress }).eq("id", selectedProject!.id);
  };

  const addStage = async () => {
    if (!selectedProject) return;
    const name = prompt("Nome da etapa:");
    if (!name) return;
    await supabase.from("project_stages").insert({ project_id: selectedProject.id, name, sort_order: stages.length });
    openProjectDetail(selectedProject);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = e.target.files;
    if (!uploadFiles || !selectedProject) return;
    for (let i = 0; i < uploadFiles.length; i++) {
      const file = uploadFiles[i];
      const path = `${selectedProject.id}/${file.name}`;
      await supabase.storage.from("project-files").upload(path, file, { upsert: true });
    }
    toast.success(`${uploadFiles.length} arquivo(s) enviado(s)!`);
    const { data } = await supabase.storage.from("project-files").list(selectedProject.id);
    if (data) setFiles(data);
    e.target.value = "";
  };

  const downloadFile = async (fileName: string) => {
    if (!selectedProject) return;
    const { data } = await supabase.storage.from("project-files").createSignedUrl(`${selectedProject.id}/${fileName}`, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  const deleteSelectedFiles = async () => {
    if (!selectedProject) return;
    const paths = Array.from(selectedFileNames).map((name) => `${selectedProject.id}/${name}`);
    const { error } = await supabase.storage.from("project-files").remove(paths);
    if (error) { toast.error("Erro ao excluir arquivos"); return; }
    toast.success(`${selectedFileNames.size} arquivo(s) excluído(s)`);
    setSelectedFileNames(new Set());
    const { data } = await supabase.storage.from("project-files").list(selectedProject.id);
    if (data) setFiles(data);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedProject || !user) return;
    setSendingMessage(true);
    
    // Add phase prefix if there's a current stage
    const currentStage = stages.find(s => s.status !== "concluida");
    const phasePrefix = currentStage ? `[${currentStage.name}] ` : "";
    
    await supabase.from("messages").insert({
      project_id: selectedProject.id, sender_id: user.id, content: phasePrefix + newMessage.trim(),
    });
    setNewMessage("");
    setSendingMessage(false);
  };

  const saveFinance = async () => {
    if (!selectedProject) return;
    setSavingFinance(true);
    const budgetNum = parseFloat(financeForm.budget_total) || 0;
    const initialNum = parseFloat(financeForm.initial_payment) || 0;
    const payload = {
      project_id: selectedProject.id,
      budget_total: budgetNum,
      initial_payment: initialNum,
      initial_payment_date: financeForm.initial_payment_date || null,
      remaining_amount: Math.max(0, budgetNum - initialNum),
      installments_total: parseInt(financeForm.installments_total) || 1,
      installments_paid: parseInt(financeForm.installments_paid) || 0,
      next_payment_date: financeForm.next_payment_date || null,
      notes: financeForm.notes || null,
    };

    if (payment) {
      const { error } = await supabase.from("payments").update(payload).eq("id", payment.id);
      if (error) toast.error("Erro ao atualizar"); else toast.success("Financeiro atualizado!");
    } else {
      const { error, data } = await supabase.from("payments").insert(payload).select().single();
      if (error) toast.error("Erro ao salvar"); else { toast.success("Financeiro salvo!"); if (data) setPayment(data); }
    }
    setSavingFinance(false);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };
  const toggleSelectAll = () => {
    setSelectedIds(selectedIds.size === projects.length ? new Set() : new Set(projects.map((p) => p.id)));
  };
  const handleDeleteProjects = async () => {
    const ids = Array.from(selectedIds);
    await supabase.from("project_stages").delete().in("project_id", ids);
    await supabase.from("payments").delete().in("project_id", ids);
    await supabase.from("messages").delete().in("project_id", ids);
    const { error } = await supabase.from("projects").delete().in("id", ids);
    if (error) toast.error("Erro ao excluir projetos");
    else { toast.success(`${ids.length} projeto(s) excluído(s)`); setSelectedIds(new Set()); fetchProjects(); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">{projects.length} projeto(s)</p>
          {selectedIds.size > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="gap-2"><Trash2 className="h-4 w-4" />Excluir ({selectedIds.size})</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir projetos?</AlertDialogTitle>
                  <AlertDialogDescription>{selectedIds.size} projeto(s), etapas, financeiro e mensagens serão removidos.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteProjects} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button className="gap-2"><FolderPlus className="h-4 w-4" /> Novo Projeto</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle style={{ fontFamily: "var(--font-display)" }}>Criar Projeto</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Nome do projeto *</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Tipo</label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{projectTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                  {methodologyStages[form.type] && (
                    <p className="text-[10px] text-primary">✓ {methodologyStages[form.type].length} etapas criadas automaticamente</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Prioridade</label>
                  <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Cliente *</label>
                <Select value={form.client_id} onValueChange={(v) => setForm({ ...form, client_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione um cliente" /></SelectTrigger>
                  <SelectContent>{clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.full_name} {c.company ? `(${c.company})` : ""}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Início</label>
                  <Input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Prazo</label>
                  <Input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Descrição</label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setOpenCreate(false)}>Cancelar</Button>
                <Button type="submit" disabled={loading || !form.client_id}>{loading ? "Criando..." : "Criar Projeto"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Project list grouped by status */}
      {(() => {
        const activeProjects = projects.filter((p) => activeStatuses.includes(p.status));
        const pausedProjects = projects.filter((p) => pausedStatuses.includes(p.status));
        const deliveredProjects = projects.filter((p) => deliveredStatuses.includes(p.status));

        const togglePause = async (project: Project, e: React.MouseEvent) => {
          e.stopPropagation();
          const newStatus = project.status === "pausado" ? "producao" : "pausado";
          await supabase.from("projects").update({ status: newStatus }).eq("id", project.id);
          toast.success(newStatus === "pausado" ? "Projeto pausado" : "Projeto retomado");
          fetchProjects();
        };

        const renderProjectCard = (project: Project, isDelivered = false) => (
          <div key={project.id} className={`bg-card border rounded-xl p-5 hover:border-primary/30 transition-all group ${selectedIds.has(project.id) ? "border-primary/50" : "border-border"} ${isDelivered ? "opacity-60" : ""}`}>
            <div className="flex items-start gap-3">
              <Checkbox checked={selectedIds.has(project.id)} onCheckedChange={() => toggleSelect(project.id)} className="mt-1" />
              <button onClick={() => openProjectDetail(project)} className="flex-1 text-left">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className={`font-medium transition-colors ${isDelivered ? "text-muted-foreground" : "text-foreground group-hover:text-primary"}`}>{project.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{project.type} • {(project as any).profiles?.full_name || "—"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isDelivered && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-primary"
                        onClick={(e) => togglePause(project, e)}
                        title={project.status === "pausado" ? "Retomar projeto" : "Pausar projeto"}
                      >
                        {project.status === "pausado" ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                      </Button>
                    )}
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[project.status] || "bg-muted text-muted-foreground"}`}>{statusLabels[project.status] || project.status}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {/* Health indicator */}
                  {!isDelivered && (() => {
                    const health = project.health_status || "No Prazo";
                    const colors: Record<string, string> = { "No Prazo": "text-emerald-400", "Atenção": "text-amber-400", "Atrasado": "text-red-400" };
                    const bgColors: Record<string, string> = { "No Prazo": "bg-emerald-400/10", "Atenção": "bg-amber-400/10", "Atrasado": "bg-red-400/10" };
                    const icons: Record<string, React.ReactNode> = { "No Prazo": <CheckCircle2 className="h-3 w-3" />, "Atenção": <Clock className="h-3 w-3" />, "Atrasado": <AlertTriangle className="h-3 w-3" /> };
                    return (
                      <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${colors[health] || colors["No Prazo"]} ${bgColors[health] || bgColors["No Prazo"]}`}>
                        {icons[health] || icons["No Prazo"]}
                        {health}
                      </span>
                    );
                  })()}
                  <div className="flex-1">
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{project.progress}%</span>
                </div>
              </button>
            </div>
          </div>
        );

        return (
          <div className="space-y-8">
            {projects.length > 0 && (
              <div className="flex items-center gap-2 px-1">
                <Checkbox checked={selectedIds.size === projects.length && projects.length > 0} onCheckedChange={toggleSelectAll} />
                <span className="text-xs text-muted-foreground">Selecionar todos</span>
              </div>
            )}

            {/* Em andamento */}
            {activeProjects.length > 0 && (
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold ml-1">Em andamento ({activeProjects.length})</p>
                <div className="grid gap-3">
                  {activeProjects.map((p) => renderProjectCard(p))}
                </div>
              </div>
            )}

            {/* Pausados */}
            {pausedProjects.length > 0 && (
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.3em] text-orange-400 font-semibold ml-1">Pausados ({pausedProjects.length})</p>
                <div className="grid gap-3">
                  {pausedProjects.map((p) => renderProjectCard(p))}
                </div>
              </div>
            )}

            {/* Entregues */}
            {deliveredProjects.length > 0 && (
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-semibold ml-1">Entregues ({deliveredProjects.length})</p>
                <div className="grid gap-3">
                  {deliveredProjects.map((p) => renderProjectCard(p, true))}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Project detail sheet with tabs */}
      <Sheet open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          {selectedProject && (
            <>
              <SheetHeader className="flex flex-row items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {editingName ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="font-display font-bold text-lg h-9"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (editName.trim()) {
                                supabase.from("projects").update({ name: editName.trim() }).eq("id", selectedProject.id).then(({ error }) => {
                                  if (error) { toast.error("Erro ao renomear"); return; }
                                  setSelectedProject({ ...selectedProject, name: editName.trim() });
                                  fetchProjects();
                                  toast.success("Nome atualizado!");
                                });
                              }
                              setEditingName(false);
                            } else if (e.key === "Escape") {
                              setEditingName(false);
                            }
                          }}
                        />
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-primary" onClick={() => {
                          if (editName.trim()) {
                            supabase.from("projects").update({ name: editName.trim() }).eq("id", selectedProject.id).then(({ error }) => {
                              if (error) { toast.error("Erro ao renomear"); return; }
                              setSelectedProject({ ...selectedProject, name: editName.trim() });
                              fetchProjects();
                              toast.success("Nome atualizado!");
                            });
                          }
                          setEditingName(false);
                        }}><Check className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground" onClick={() => setEditingName(false)}><X className="h-4 w-4" /></Button>
                      </div>
                    ) : (
                      <>
                        <SheetTitle style={{ fontFamily: "var(--font-display)" }}>{selectedProject.name}</SheetTitle>
                        <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => { setEditName(selectedProject.name); setEditingName(true); }}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">{selectedProject.type}</p>
                    <span className="text-xs text-muted-foreground">•</span>
                    <p className="text-sm text-muted-foreground">{(selectedProject as any).profiles?.full_name || "—"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="outline" size="sm" className="gap-2 text-xs" onClick={() => {
                    const content = `CONTRATO DE PRESTAÇÃO DE SERVIÇOS DESIGN\n\nCONTRATANTE: ${selectedProject.profiles?.full_name}\nCONTRATADO: Studio Kiiro\n\nSERVIÇO: ${selectedProject.type}\nVALOR: ${payment ? formatCurrency(payment.budget_total) : "—"}\n\nESTE É UM MODELO DE CONTRATO AUTOMATIZADO...`;
                    const blob = new Blob([content], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `Contrato_${selectedProject.name.replace(/ /g, "_")}.txt`;
                    a.click();
                    toast.success("Contrato (rascunho) gerado com sucesso!");
                  }}>
                    <FileText className="h-3.5 w-3.5" /> Gerar Contrato
                  </Button>
                </div>
              </SheetHeader>

              <div className="mt-6">
                <Tabs defaultValue="status" className="space-y-6">
                  <TabsList className="bg-card border border-border h-11 p-1 gap-1 grid grid-cols-5 w-full">
                    <TabsTrigger value="status" className="gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Status</span>
                    </TabsTrigger>
                    <TabsTrigger value="briefing" className="gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <ClipboardList className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Briefing</span>
                    </TabsTrigger>
                    <TabsTrigger value="files" className="gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <FolderOpen className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Arquivos</span>
                    </TabsTrigger>
                    <TabsTrigger value="finance" className="gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <DollarSign className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Financeiro</span>
                    </TabsTrigger>
                    <TabsTrigger value="messages" className="gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Mensagens</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* STATUS TAB */}
                  <TabsContent value="status" className="space-y-6">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Saúde do Projeto</label>
                        <Select
                          value={selectedProject.health_status || "No Prazo"}
                          onValueChange={async (v) => {
                            await supabase.from("projects").update({ health_status: v }).eq("id", selectedProject.id);
                            setSelectedProject({ ...selectedProject, health_status: v });
                            fetchProjects();
                            toast.success("Saúde atualizada");
                          }}
                        >
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="No Prazo">No Prazo</SelectItem>
                            <SelectItem value="Atenção">Atenção</SelectItem>
                            <SelectItem value="Atrasado">Atrasado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Status do Projeto</label>
                        <Select
                          value={selectedProject.status}
                          onValueChange={async (v) => {
                            await supabase.from("projects").update({ status: v }).eq("id", selectedProject.id);
                            setSelectedProject({ ...selectedProject, status: v });
                            fetchProjects();
                            toast.success("Status atualizado");
                          }}
                        >
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>{Object.entries(statusLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Studio Observation */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Observação do Studio (Somente Admin)</label>
                      <Textarea
                        defaultValue={selectedProject.studio_observation || ""}
                        rows={3}
                        placeholder="Anotações estratégicas..."
                        onBlur={async (e) => {
                          const val = e.target.value.trim() || null;
                          if (val !== selectedProject.studio_observation) {
                            await supabase.from("projects").update({ studio_observation: val }).eq("id", selectedProject.id);
                            setSelectedProject({ ...selectedProject, studio_observation: val });
                            toast.success("Observação salva");
                          }
                        }}
                      />
                    </div>

                    {/* Partner notes */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Observação para o Parceiro (Leitura Parceiro)</label>
                      <Textarea
                        defaultValue={selectedProject.partner_notes || ""}
                        rows={3}
                        placeholder="Ex.: Aguardar resposta do cliente até sexta..."
                        onBlur={async (e) => {
                          const val = e.target.value.trim() || null;
                          if (val !== selectedProject.partner_notes) {
                            await supabase.from("projects").update({ partner_notes: val }).eq("id", selectedProject.id);
                            setSelectedProject({ ...selectedProject, partner_notes: val });
                            toast.success("Observação salva");
                          }
                        }}
                      />
                    </div>

                    {/* Stages */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Etapas da Metodologia</label>
                        <Button variant="ghost" size="sm" onClick={addStage} className="text-xs h-7">+ Etapa</Button>
                      </div>
                      {stages.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Nenhuma etapa criada.</p>
                      ) : (
                        <div className="space-y-4">
                          {stages.map((stage) => (
                            <div key={stage.id} className="space-y-2">
                              <button onClick={() => toggleStage(stage)} className="flex items-start gap-3 w-full p-3 rounded-lg border border-border hover:border-primary/30 transition-colors text-left">
                                {stage.status === "concluida" ? <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" /> : <Circle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />}
                                <div className="flex-1 min-w-0">
                                  <span className={`text-sm font-medium ${stage.status === "concluida" ? "text-muted-foreground line-through" : "text-foreground"}`}>{stage.name}</span>
                                  {stage.description && <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{stage.description}</p>}
                                  {stage.completed_at && <p className="text-[10px] text-primary mt-1">✓ Concluído em {new Date(stage.completed_at).toLocaleDateString("pt-BR")}</p>}
                                </div>
                              </button>
                              
                              {/* Internal Tasks */}
                              <div className="ml-8 space-y-2">
                                {(stage.internal_tasks || []).map((task, idx) => (
                                  <div key={task.id} className="flex items-center gap-2">
                                    <Checkbox
                                      checked={task.completed}
                                      onCheckedChange={async (checked) => {
                                        const newTasks = [...(stage.internal_tasks || [])];
                                        newTasks[idx] = { ...task, completed: !!checked };
                                        await supabase.from("project_stages").update({ internal_tasks: newTasks as any }).eq("id", stage.id);
                                        setStages(stages.map(s => s.id === stage.id ? { ...s, internal_tasks: newTasks } : s));
                                      }}
                                    />
                                    <span className={`text-xs ${task.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>{task.text}</span>
                                  </div>
                                ))}
                                <Button variant="ghost" size="sm" className="h-6 text-[10px] text-muted-foreground gap-1" onClick={async () => {
                                  const text = prompt("Nova sub-etapa:");
                                  if (!text) return;
                                  const newTasks = [...(stage.internal_tasks || []), { id: crypto.randomUUID(), text, completed: false }];
                                  await supabase.from("project_stages").update({ internal_tasks: newTasks as any }).eq("id", stage.id);
                                  setStages(stages.map(s => s.id === stage.id ? { ...s, internal_tasks: newTasks } : s));
                                }}>
                                  <Plus className="h-3 w-3" /> Adicionar sub-etapa
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* BRIEFING TAB */}
                  <TabsContent value="briefing" className="space-y-4">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Respostas do Briefing</label>
                    {!briefingResponse ? (
                      <div className="bg-card border border-border rounded-xl p-6 text-center">
                        <ClipboardList className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                        <p className="text-muted-foreground text-sm">O cliente ainda não respondeu o briefing.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {(briefingQuestions[selectedProject.type] || []).map((q: BriefingQuestion) => {
                          if (q.type === "section") {
                            return (
                              <div key={q.id} className="pt-3 pb-1 border-b border-border">
                                <h4 className="text-xs font-semibold text-primary uppercase tracking-wide">{q.question}</h4>
                              </div>
                            );
                          }
                          const answer = briefingResponse[q.id];
                          const detailAnswer = briefingResponse[`${q.id}_detail`];
                          if (!answer && !detailAnswer) return null;
                          
                          const displayAnswer = q.type === "checkbox" && answer
                            ? answer.split("|||").filter(Boolean).join(", ")
                            : answer;

                          return (
                            <div key={q.id} className="bg-card border border-border rounded-lg p-4 space-y-1">
                              <label className="text-xs font-medium text-muted-foreground">{q.question}</label>
                              <p className="text-sm text-foreground whitespace-pre-wrap">{displayAnswer}</p>
                              {detailAnswer && (
                                <p className="text-sm text-foreground/80 italic ml-2">↳ {detailAnswer}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </TabsContent>

                  {/* FILES TAB */}
                  <TabsContent value="files" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Arquivos do Projeto</label>
                      {selectedFileNames.size > 0 && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="gap-1.5 h-7 text-xs"><Trash2 className="h-3.5 w-3.5" />Excluir ({selectedFileNames.size})</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir arquivos?</AlertDialogTitle>
                              <AlertDialogDescription>{selectedFileNames.size} arquivo(s) serão removidos permanentemente.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={deleteSelectedFiles} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} multiple />
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2 w-full">
                      <Upload className="h-4 w-4" /> Enviar arquivo(s)
                    </Button>
                    {files.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 px-1">
                          <Checkbox
                            checked={selectedFileNames.size === files.length && files.length > 0}
                            onCheckedChange={() => setSelectedFileNames(selectedFileNames.size === files.length ? new Set() : new Set(files.map((f) => f.name)))}
                          />
                          <span className="text-xs text-muted-foreground">Selecionar todos</span>
                        </div>
                        {files.map((f) => (
                          <div key={f.name} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${selectedFileNames.has(f.name) ? "border-primary/50" : "border-border"}`}>
                            <Checkbox checked={selectedFileNames.has(f.name)} onCheckedChange={() => setSelectedFileNames((prev) => { const next = new Set(prev); next.has(f.name) ? next.delete(f.name) : next.add(f.name); return next; })} />
                            <span className="text-sm text-foreground truncate flex-1">{f.name}</span>
                            <Button variant="ghost" size="sm" onClick={() => downloadFile(f.name)}><FileDown className="h-4 w-4" /></Button>
                          </div>
                        ))}
                      </div>
                    )}
                    {files.length === 0 && (
                      <div className="bg-card border border-border rounded-xl p-6 text-center">
                        <p className="text-muted-foreground text-sm">Nenhum arquivo enviado.</p>
                      </div>
                    )}
                  </TabsContent>

                  {/* FINANCE TAB */}
                  <TabsContent value="finance" className="space-y-4">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Detalhes Financeiros</label>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Valor Total *</label>
                          <Input type="number" step="0.01" value={financeForm.budget_total} onChange={(e) => setFinanceForm({ ...financeForm, budget_total: e.target.value })} placeholder="0,00" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Pgto Inicial</label>
                          <Input type="number" step="0.01" value={financeForm.initial_payment} onChange={(e) => setFinanceForm({ ...financeForm, initial_payment: e.target.value })} placeholder="0,00" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Data Pgto Inicial</label>
                          <Input type="date" value={financeForm.initial_payment_date} onChange={(e) => setFinanceForm({ ...financeForm, initial_payment_date: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Restante</label>
                          <Input type="number" value={Math.max(0, (parseFloat(financeForm.budget_total) || 0) - (parseFloat(financeForm.initial_payment) || 0)).toFixed(2)} readOnly className="bg-muted" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Parcelas</label>
                          <Input type="number" min="1" value={financeForm.installments_total} onChange={(e) => setFinanceForm({ ...financeForm, installments_total: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Pagas</label>
                          <Input type="number" min="0" value={financeForm.installments_paid} onChange={(e) => setFinanceForm({ ...financeForm, installments_paid: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Próx. Pgto</label>
                          <Input type="date" value={financeForm.next_payment_date} onChange={(e) => setFinanceForm({ ...financeForm, next_payment_date: e.target.value })} />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Observações</label>
                        <Textarea value={financeForm.notes} onChange={(e) => setFinanceForm({ ...financeForm, notes: e.target.value })} rows={2} />
                      </div>
                      <Button onClick={saveFinance} disabled={savingFinance} className="w-full">
                        {savingFinance ? "Salvando..." : payment ? "Atualizar Financeiro" : "Salvar Financeiro"}
                      </Button>
                    </div>
                  </TabsContent>

                  {/* MESSAGES TAB */}
                  <TabsContent value="messages" className="space-y-4">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Mensagens do Projeto</label>
                    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col" style={{ height: "350px" }}>
                      <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.length === 0 ? (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-muted-foreground text-sm">Nenhuma mensagem ainda.</p>
                          </div>
                        ) : (
                          messages.map((msg) => {
                            const isOwn = msg.sender_id === user?.id;
                            return (
                              <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${isOwn ? "bg-primary text-primary-foreground rounded-br-md" : "bg-secondary text-foreground rounded-bl-md"}`}>
                                  <p className="whitespace-pre-wrap">{msg.content}</p>
                                  <p className={`text-[10px] mt-1 ${isOwn ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                                    {new Date(msg.created_at).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                                  </p>
                                </div>
                              </div>
                            );
                          })
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                      <div className="border-t border-border p-3 flex gap-2">
                        <Textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Responder ao cliente..."
                          className="min-h-[40px] max-h-[100px] resize-none text-sm"
                          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                        />
                        <Button onClick={sendMessage} disabled={!newMessage.trim() || sendingMessage} size="icon" className="shrink-0 h-10 w-10">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProjectsTab;
