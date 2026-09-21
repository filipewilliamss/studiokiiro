import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { projectService, type Stage, type Project } from "@/services/projectService";

interface ClientStagesTabProps {
  project: Project;
  stages: Stage[];
  userId?: string;
}

export const ClientStagesTab = ({ project, stages, userId }: ClientStagesTabProps) => {
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  const isReviewPhase = project.status === "revisao";
  const currentStage = stages.find((s) => s.status === "em_andamento");

  const handleFeedback = async () => {
    if (!userId) return;
    const feedback = prompt("Descreva detalhadamente os ajustes necessários:");
    if (!feedback || !feedback.trim()) return;

    setSubmittingFeedback(true);
    const success = await projectService.submitStageFeedback(
      project.id,
      currentStage?.id,
      userId,
      feedback.trim()
    );
    setSubmittingFeedback(false);

    if (success) {
      toast.success("Feedback enviado com sucesso! Nossa equipe fará os ajustes.");
    } else {
      toast.error("Erro ao enviar feedback. Tente novamente.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-black p-6 sm:p-8">
        <label className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold block mb-6">
          Etapas da Metodologia
        </label>

        {stages.length === 0 ? (
          <div className="py-12 text-center">
            <Clock className="h-8 w-8 text-white/15 mx-auto mb-2" />
            <p className="text-white/35 text-sm">Nenhuma etapa cadastrada ainda.</p>
          </div>
        ) : (
          <div className="relative space-y-0">
            {/* Connecting line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-white/10" />

            {stages.map((stage, idx) => {
              const isCompleted = stage.status === "concluido";
              const isCurrent = stage.status === "em_andamento";

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="relative flex items-start gap-4 py-3 group"
                >
                  <div className="relative z-10 mt-0.5">
                    {isCompleted ? (
                      <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                    ) : isCurrent ? (
                      <div className="h-10 w-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary shadow-[0_0_12px_rgba(255,202,22,0.4)]">
                        <Circle className="h-4 w-4 fill-primary" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
                        <Circle className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pt-1">
                    <span
                      className={`text-sm font-medium ${
                        isCompleted
                          ? "text-white/40 line-through"
                          : isCurrent
                          ? "text-white font-bold"
                          : "text-white/30"
                      }`}
                    >
                      {stage.name}
                    </span>
                    {stage.description && (
                      <p className="text-[11px] text-white/40 mt-0.5 line-clamp-2">
                        {stage.description}
                      </p>
                    )}
                    {stage.completed_at && (
                      <p className="text-[10px] text-primary mt-1 font-mono">
                        ✓ Concluído em {new Date(stage.completed_at).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                    {isCurrent && (
                      <p className="text-[10px] text-primary font-semibold mt-1 flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> Etapa atual em andamento
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {isReviewPhase && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
              Central de Revisão & Feedback
            </h3>
            <p className="text-xs text-white/60">
              Estamos na fase de revisão. Envie seus apontamentos detalhados para nossa equipe.
            </p>
          </div>
          <Button
            onClick={handleFeedback}
            disabled={submittingFeedback}
            className="gap-2 rounded-xl w-full sm:w-auto shrink-0"
          >
            <MessageSquare className="h-4 w-4" />
            {submittingFeedback ? "Enviando..." : "Enviar Feedback"}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ClientStagesTab;
