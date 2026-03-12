import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FolderPlus, ChevronRight, CheckCircle2, Circle, Clock, Upload, FileDown, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { methodologyStages } from "@/data/methodologyStages";

interface Profile { id: string; full_name: string; company: string | null; }
interface Project {
  id: string; name: string; type: string; status: string;
  progress: number; deadline: string | null; start_date: string | null;
  description: string | null; client_id: string; priority: string;
  profiles?: Profile;
}
interface Stage {
  id: string; name: string; status: string; sort_order: number;
  description: string | null; completed_at: string | null;
}

const statusColors: Record<string, string> = {
  briefing: "bg-blue-500/10 text-blue-400",
  planejamento: "bg-amber-500/10 text-amber-400",
  producao: "bg-primary/10 text-primary",
  revisao: "bg-purple-500/10 text-purple-400",
  finalizacao: "bg-emerald-500/10 text-emerald-400",
  entregue: "bg-muted text-muted-foreground",
};
const statusLabels: Record<string, string> = {
  briefing: "Briefing", planejamento: "Planejamento", producao: "Produção",
  revisao: "Revisão", finalizacao: "Finalização", entregue: "Entregue",
};

const projectTypes = [
  "Identidade Visual",
  "Manual de Logotipo",
  "Branding",
  "Social Media",
  "Website",
  "Papelaria",
  "Apresentação",
];

const ProjectsTab = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Profile[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [stages, setStages] = useState<Stage[]>([]);
  const [files, setFiles] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [form, setForm] = useState({
    name: "", type: "Identidade Visual", client_id: "", description: "",
    deadline: "", start_date: "", priority: "normal",
  });

  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*, profiles!projects_client_id_fkey(id, full_name, company)")
      .order("created_at", { ascending: false });
    if (data) setProjects(data as any);
  };

  const fetchClients = async () => {
    const { data } = await supabase.from("profiles").select("id, full_name, company");
    if (data) setClients(data);
  };

  useEffect(() => { fetchProjects(); fetchClients(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: projectData, error } = await supabase.from("projects").insert({
      name: form.name,
      type: form.type,
      client_id: form.client_id,
      description: form.description || null,
      deadline: form.deadline || null,
      start_date: form.start_date || null,
      priority: form.priority,
    }).select("id").single();

    if (error || !projectData) {
      console.error("Erro ao criar projeto:", error);
      toast.error(error?.message || "Erro ao criar projeto");
      setLoading(false);
      return;
    }

    const stages = methodologyStages[form.type];
    if (stages && stages.length > 0) {
      const stageInserts = stages.map((s) => ({
        project_id: projectData.id,
        name: s.name,
        description: s.description,
        sort_order: s.sort_order,
      }));
      await supabase.from("project_stages").insert(stageInserts);
    }

    toast.success("Projeto criado com etapas da metodologia!");
    setOpenCreate(false);
    setForm({ name: "", type: "Identidade Visual", client_id: "", description: "", deadline: "", start_date: "", priority: "normal" });
    fetchProjects();
    setLoading(false);
  };

  const openProjectDetail = async (project: Project) => {
    setSelectedProject(project);
    const { data } = await supabase
      .from("project_stages")
      .select("*")
      .eq("project_id", project.id)
      .order("sort_order");
    if (data) setStages(data);

    const { data: fileData } = await supabase.storage
      .from("project-files")
      .list(project.id);
    if (fileData) setFiles(fileData);
  };

  const toggleStage = async (stage: Stage) => {
    const newStatus = stage.status === "concluida" ? "pendente" : "concluida";
    const completedAt = newStatus === "concluida" ? new Date().toISOString() : null;

    const { error } = await supabase
      .from("project_stages")
      .update({ status: newStatus, completed_at: completedAt })
      .eq("id", stage.id);

    if (error) {
      toast.error("Erro ao atualizar etapa");
      return;
    }

    const updated = stages.map((s) =>
      s.id === stage.id ? { ...s, status: newStatus, completed_at: completedAt } : s
    );
    setStages(updated);

    const done = updated.filter((s) => s.status === "concluida").length;
    const progress = updated.length > 0 ? Math.round((done / updated.length) * 100) : 0;

    const { error: projectError } = await supabase
      .from("projects")
      .update({ progress })
      .eq("id", selectedProject!.id);

    if (projectError) {
      toast.error("Erro ao atualizar progresso do projeto");
    }
  };

  const addStage = async () => {
    if (!selectedProject) return;
    const name = prompt("Nome da etapa:");
    if (!name) return;
    await supabase.from("project_stages").insert({
      project_id: selectedProject.id,
      name,
      sort_order: stages.length,
    });
    openProjectDetail(selectedProject);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedProject) return;
    const path = `${selectedProject.id}/${file.name}`;
    const { error } = await supabase.storage.from("project-files").upload(path, file, { upsert: true });
    if (error) {
      toast.error("Erro ao enviar arquivo");
    } else {
      toast.success("Arquivo enviado!");
      const { data } = await supabase.storage.from("project-files").list(selectedProject.id);
      if (data) setFiles(data);
    }
    e.target.value = "";
  };

  const downloadFile = async (fileName: string) => {
    if (!selectedProject) return;
    const { data } = await supabase.storage
      .from("project-files")
      .createSignedUrl(`${selectedProject.id}/${fileName}`, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === projects.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(projects.map((p) => p.id)));
    }
  };

  const handleDeleteProjects = async () => {
    const ids = Array.from(selectedIds);
    await supabase.from("project_stages").delete().in("project_id", ids);
    await supabase.from("payments").delete().in("project_id", ids);
    const { error } = await supabase.from("projects").delete().in("id", ids);
    if (error) {
      toast.error("Erro ao excluir projetos");
    } else {
      toast.success(`${ids.length} projeto(s) excluído(s)`);
      setSelectedIds(new Set());
      fetchProjects();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">{projects.length} projeto(s)</p>
          {selectedIds.size > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Excluir ({selectedIds.size})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir projetos?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação não pode ser desfeita. {selectedIds.size} projeto(s), suas etapas e dados financeiros associados serão removidos.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteProjects} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Excluir
                  </AlertDialogAction>
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
                    <SelectContent>
                      {projectTypes.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {methodologyStages[form.type] && (
                    <p className="text-[10px] text-primary">
                      ✓ {methodologyStages[form.type].length} etapas da metodologia serão criadas automaticamente
                    </p>
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
                  <SelectContent>
                    {clients.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.full_name} {c.company ? `(${c.company})` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
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
                <Button type="submit" disabled={loading || !form.client_id}>
                  {loading ? "Criando..." : "Criar Projeto"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Project list */}
      <div className="grid gap-3">
        {projects.length > 0 && (
          <div className="flex items-center gap-2 px-1">
            <Checkbox
              checked={selectedIds.size === projects.length && projects.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <span className="text-xs text-muted-foreground">Selecionar todos</span>
          </div>
        )}
        {projects.map((project) => (
          <div
            key={project.id}
            className={`bg-card border rounded-xl p-5 hover:border-primary/30 transition-all group ${
              selectedIds.has(project.id) ? "border-primary/50" : "border-border"
            }`}
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={selectedIds.has(project.id)}
                onCheckedChange={() => toggleSelect(project.id)}
                className="mt-1"
              />
              <button
                onClick={() => openProjectDetail(project)}
                className="flex-1 text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {project.type} • {(project as any).profiles?.full_name || "—"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[project.status] || "bg-muted text-muted-foreground"}`}>
                      {statusLabels[project.status] || project.status}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
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
        ))}
      </div>

      {/* Project detail sheet */}
      <Sheet open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          {selectedProject && (
            <>
              <SheetHeader>
                <SheetTitle style={{ fontFamily: "var(--font-display)" }}>{selectedProject.name}</SheetTitle>
                <p className="text-sm text-muted-foreground">{selectedProject.type}</p>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Status update */}
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
                    <SelectContent>
                      {Object.entries(statusLabels).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <div className="space-y-2">
                      {stages.map((stage) => (
                        <button
                          key={stage.id}
                          onClick={() => toggleStage(stage)}
                          className="flex items-start gap-3 w-full p-3 rounded-lg border border-border hover:border-primary/30 transition-colors text-left"
                        >
                          {stage.status === "concluida" ? (
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <span className={`text-sm font-medium ${stage.status === "concluida" ? "text-muted-foreground line-through" : "text-foreground"}`}>
                              {stage.name}
                            </span>
                            {stage.description && (
                              <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{stage.description}</p>
                            )}
                            {stage.completed_at && (
                              <p className="text-[10px] text-primary mt-1">
                                ✓ Concluído em {new Date(stage.completed_at).toLocaleDateString("pt-BR")}
                              </p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Files */}
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Arquivos</label>
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2 w-full">
                    <Upload className="h-4 w-4" /> Enviar arquivo
                  </Button>
                  {files.length > 0 && (
                    <div className="space-y-2">
                      {files.map((f) => (
                        <div key={f.name} className="flex items-center justify-between p-3 rounded-lg border border-border">
                          <span className="text-sm text-foreground truncate flex-1">{f.name}</span>
                          <Button variant="ghost" size="sm" onClick={() => downloadFile(f.name)}>
                            <FileDown className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProjectsTab;
