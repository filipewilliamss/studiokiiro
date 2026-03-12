import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  LogOut, FolderOpen, CheckCircle2, Clock, Circle, FileDown,
  ExternalLink, DollarSign, MessageSquare, Send, ArrowLeft,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface Project {
  id: string;
  name: string;
  type: string;
  status: string;
  progress: number;
  deadline: string | null;
}

interface Stage {
  id: string;
  name: string;
  status: string;
  sort_order: number;
  description: string | null;
  completed_at: string | null;
}

interface ProjectFile {
  name: string;
  viewUrl: string | null;
  downloadUrl: string | null;
}

interface Payment {
  id: string;
  budget_total: number;
  initial_payment: number | null;
  initial_payment_date: string | null;
  remaining_amount: number | null;
  installments_total: number | null;
  installments_paid: number | null;
  next_payment_date: string | null;
  notes: string | null;
}

interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

const statusLabels: Record<string, string> = {
  briefing: "Briefing",
  planejamento: "Em planejamento",
  producao: "Em produção",
  revisao: "Em revisão",
  finalizacao: "Finalização",
  entregue: "Entregue",
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

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("id, name, type, status, progress, deadline")
        .order("created_at", { ascending: false });
      if (data) setProjects(data);
    };
    fetchProjects();
  }, []);

  // Realtime messages
  useEffect(() => {
    if (!selectedProject) return;
    const channel = supabase
      .channel(`messages-${selectedProject.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `project_id=eq.${selectedProject.id}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [selectedProject]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openProjectDetail = async (project: Project) => {
    setSelectedProject(project);
    setIsLoadingFiles(true);
    setFiles([]);
    setPayment(null);
    setMessages([]);

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
          return {
            name: file.name,
            viewUrl: viewRes.data?.signedUrl ?? null,
            downloadUrl: downloadRes.data?.signedUrl ?? null,
          };
        })
      );
      setFiles(filesWithLinks);
    }
    setIsLoadingFiles(false);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedProject || !user) return;
    setSendingMessage(true);
    await supabase.from("messages").insert({
      project_id: selectedProject.id,
      sender_id: user.id,
      content: newMessage.trim(),
    });
    setNewMessage("");
    setSendingMessage(false);
  };

  const activeProjects = projects.filter((p) => p.status !== "entregue");
  const completedProjects = projects.filter((p) => p.status === "entregue");

  const completedStages = stages.filter((s) => s.status === "concluida").length;
  const currentStageIndex = stages.findIndex((s) => s.status !== "concluida");

  // If a project is selected, show detail view
  if (selectedProject) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-16 md:top-20 z-30 mt-16 md:mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <button onClick={() => setSelectedProject(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          {/* Project header */}
          <div>
            <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              {selectedProject.name}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-sm text-muted-foreground">{selectedProject.type}</p>
              <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {statusLabels[selectedProject.status] || selectedProject.status}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="status" className="space-y-6">
            <TabsList className="bg-card border border-border h-12 p-1 gap-1 grid grid-cols-4 w-full">
              <TabsTrigger value="status" className="gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Status</span>
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
              <div className="bg-card border border-border rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progresso geral</span>
                  <span className="font-medium text-foreground">{selectedProject.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${selectedProject.progress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground">{completedStages} de {stages.length} etapas concluídas</p>
              </div>

              {stages.length > 0 && (
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Etapas — {selectedProject.type}
                  </label>
                  <div className="space-y-2">
                    {stages.map((stage, idx) => {
                      const isCompleted = stage.status === "concluida";
                      const isCurrent = idx === currentStageIndex;
                      return (
                        <div
                          key={stage.id}
                          className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                            isCurrent ? "border-primary/50 bg-primary/5" : isCompleted ? "border-border bg-card/50" : "border-border/50 bg-card/30"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          ) : isCurrent ? (
                            <div className="h-5 w-5 rounded-full border-2 border-primary shrink-0 mt-0.5 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            </div>
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <span className={`text-sm font-medium ${isCompleted ? "text-muted-foreground line-through" : isCurrent ? "text-foreground" : "text-muted-foreground"}`}>
                              {stage.name}
                            </span>
                            {stage.description && <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{stage.description}</p>}
                            {stage.completed_at && <p className="text-[10px] text-primary mt-1">✓ {new Date(stage.completed_at).toLocaleDateString("pt-BR")}</p>}
                            {isCurrent && <p className="text-[10px] text-primary font-medium mt-1">● Etapa atual</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* FILES TAB */}
            <TabsContent value="files" className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Arquivos do Projeto</label>
              {isLoadingFiles ? (
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <p className="text-muted-foreground text-sm">Carregando arquivos...</p>
                </div>
              ) : files.length === 0 ? (
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <p className="text-muted-foreground text-sm">Nenhum arquivo disponível neste projeto.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {files.map((file) => (
                    <div key={file.name} className="flex items-center justify-between p-3 rounded-lg border border-border gap-3">
                      <span className="text-sm text-foreground truncate flex-1">{file.name}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        {file.viewUrl ? (
                          <Button asChild variant="outline" size="sm" className="gap-1.5">
                            <a href={file.viewUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3.5 w-3.5" />
                              Abrir
                            </a>
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled>Abrir</Button>
                        )}
                        {file.downloadUrl ? (
                          <Button asChild variant="ghost" size="sm" className="gap-1.5">
                            <a href={file.downloadUrl} target="_blank" rel="noopener noreferrer">
                              <FileDown className="h-3.5 w-3.5" />
                              Baixar
                            </a>
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" disabled>Baixar</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* FINANCE TAB */}
            <TabsContent value="finance" className="space-y-4">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Detalhes Financeiros</label>
              {!payment ? (
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <p className="text-muted-foreground text-sm">Nenhuma informação financeira disponível.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Budget card */}
                  <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Orçamento Total</span>
                      <span className="text-lg font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                        {formatCurrency(payment.budget_total)}
                      </span>
                    </div>

                    {payment.initial_payment != null && payment.initial_payment > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Entrada</span>
                        <div className="text-right">
                          <span className="text-foreground font-medium">{formatCurrency(payment.initial_payment)}</span>
                          {payment.initial_payment_date && (
                            <span className="text-muted-foreground text-xs ml-2">
                              ({new Date(payment.initial_payment_date + "T00:00:00").toLocaleDateString("pt-BR")})
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {payment.remaining_amount != null && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Saldo Restante</span>
                        <span className="text-foreground font-medium">{formatCurrency(payment.remaining_amount)}</span>
                      </div>
                    )}
                  </div>

                  {/* Installments */}
                  {payment.installments_total != null && payment.installments_total > 0 && (
                    <div className="bg-card border border-border rounded-xl p-5 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Parcelas</span>
                        <span className="text-foreground font-medium">
                          {payment.installments_paid ?? 0} de {payment.installments_total} pagas
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{
                            width: `${((payment.installments_paid ?? 0) / payment.installments_total) * 100}%`,
                          }}
                        />
                      </div>
                      {payment.next_payment_date && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Próximo pagamento: {new Date(payment.next_payment_date + "T00:00:00").toLocaleDateString("pt-BR")}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {payment.notes && (
                    <div className="bg-card border border-border rounded-xl p-4">
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

              <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col" style={{ height: "400px" }}>
                {/* Messages list */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground text-sm">Nenhuma mensagem ainda. Envie a primeira!</p>
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isOwn = msg.sender_id === user?.id;
                      return (
                        <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                              isOwn
                                ? "bg-primary text-primary-foreground rounded-br-md"
                                : "bg-secondary text-foreground rounded-bl-md"
                            }`}
                          >
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

                {/* Input */}
                <div className="border-t border-border p-3 flex gap-2">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escreva sua mensagem ou feedback..."
                    className="min-h-[40px] max-h-[100px] resize-none text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || sendingMessage}
                    size="icon"
                    className="shrink-0 h-10 w-10"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    );
  }

  // Project list view
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-16 md:top-20 z-30 mt-16 md:mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">Área do Cliente</h2>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            Olá, {profile?.full_name || "Cliente"}.
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Acompanhe seus projetos em tempo real.</p>
        </div>

        {/* Active projects */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Projetos Ativos</h2>
          </div>
          {activeProjects.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <p className="text-muted-foreground text-sm">Nenhum projeto ativo no momento.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {activeProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => openProjectDetail(project)}
                  className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors text-left w-full"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-foreground">{project.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{project.type}</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {statusLabels[project.status] || project.status}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progresso</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                  {project.deadline && (
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Previsão: {new Date(project.deadline).toLocaleDateString("pt-BR")}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Completed projects */}
        {completedProjects.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Projetos Finalizados</h2>
            </div>
            <div className="grid gap-3">
              {completedProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => openProjectDetail(project)}
                  className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-primary/30 transition-colors w-full text-left"
                >
                  <div>
                    <h3 className="font-medium text-foreground text-sm">{project.name}</h3>
                    <p className="text-xs text-muted-foreground">{project.type}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Entregue</span>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ClientDashboard;
