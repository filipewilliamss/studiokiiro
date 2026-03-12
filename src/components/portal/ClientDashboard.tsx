import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { LogOut, FolderOpen, CheckCircle2, Clock, Circle, FileDown } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

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

const statusLabels: Record<string, string> = {
  briefing: "Briefing",
  planejamento: "Em planejamento",
  producao: "Em produção",
  revisao: "Em revisão",
  finalizacao: "Finalização",
  entregue: "Entregue",
};

const ClientDashboard = () => {
  const { profile, signOut } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [stages, setStages] = useState<Stage[]>([]);
  const [files, setFiles] = useState<{ name: string }[]>([]);

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

  const openProjectDetail = async (project: Project) => {
    setSelectedProject(project);
    const [stagesRes, filesRes] = await Promise.all([
      supabase.from("project_stages").select("*").eq("project_id", project.id).order("sort_order"),
      supabase.storage.from("project-files").list(project.id),
    ]);
    if (stagesRes.data) setStages(stagesRes.data);
    if (filesRes.data) setFiles(filesRes.data);
  };

  const downloadFile = async (fileName: string) => {
    if (!selectedProject) return;
    const { data } = await supabase.storage
      .from("project-files")
      .createSignedUrl(`${selectedProject.id}/${fileName}`, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  const activeProjects = projects.filter((p) => p.status !== "entregue");
  const completedProjects = projects.filter((p) => p.status === "entregue");

  const completedStages = stages.filter((s) => s.status === "concluido").length;
  const currentStageIndex = stages.findIndex((s) => s.status !== "concluido");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Sub-header */}
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
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            Olá, {profile?.full_name || "Cliente"}.
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Acompanhe seus projetos em tempo real.
          </p>
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
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
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
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Projetos Finalizados
              </h2>
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
                {/* Progress summary */}
                <div className="bg-card border border-border rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progresso geral</span>
                    <span className="font-medium text-foreground">{selectedProject.progress}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${selectedProject.progress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {completedStages} de {stages.length} etapas concluídas
                  </p>
                </div>

                {/* Methodology stages */}
                {stages.length > 0 && (
                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                      Etapas — {selectedProject.type}
                    </label>
                    <div className="space-y-2">
                      {stages.map((stage, idx) => {
                        const isCompleted = stage.status === "concluido";
                        const isCurrent = idx === currentStageIndex;
                        return (
                          <div
                            key={stage.id}
                            className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                              isCurrent
                                ? "border-primary/50 bg-primary/5"
                                : isCompleted
                                ? "border-border bg-card/50"
                                : "border-border/50 bg-card/30"
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
                              <span className={`text-sm font-medium ${
                                isCompleted ? "text-muted-foreground line-through" : isCurrent ? "text-foreground" : "text-muted-foreground"
                              }`}>
                                {stage.name}
                              </span>
                              {stage.description && (
                                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{stage.description}</p>
                              )}
                              {stage.completed_at && (
                                <p className="text-[10px] text-primary mt-1">
                                  ✓ {new Date(stage.completed_at).toLocaleDateString("pt-BR")}
                                </p>
                              )}
                              {isCurrent && (
                                <p className="text-[10px] text-primary font-medium mt-1">● Etapa atual</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Files */}
                {files.length > 0 && (
                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Arquivos do Projeto</label>
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
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ClientDashboard;
