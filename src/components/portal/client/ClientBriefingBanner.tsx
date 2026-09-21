import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, Sparkles, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { briefingQuestions, type BriefingQuestion } from "@/data/briefingQuestions";
import { projectService } from "@/services/projectService";

interface ClientBriefingBannerProps {
  projectId: string;
  projectType: string;
  briefingSubmitted: boolean;
  briefingToken: string | null;
  initialAnswers: Record<string, string>;
  onBriefingSuccess: (answers: Record<string, string>) => void;
}

export const ClientBriefingBanner = ({
  projectId,
  projectType,
  briefingSubmitted,
  briefingToken,
  initialAnswers,
  onBriefingSuccess,
}: ClientBriefingBannerProps) => {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);
  const [submitting, setSubmitting] = useState(false);

  const questions: BriefingQuestion[] | undefined = briefingQuestions[projectType];

  const handleSubmit = async () => {
    if (!questions) return;
    const missing = questions.filter((q) => q.required && !answers[q.id]?.trim());
    if (missing.length > 0) {
      toast.error(`Preencha os campos obrigatórios pendentes (${missing.length}).`);
      return;
    }

    setSubmitting(true);
    const success = await projectService.submitBriefing(projectId, answers);
    setSubmitting(false);

    if (success) {
      toast.success("Briefing enviado com sucesso! 🎉");
      onBriefingSuccess(answers);
      setOpen(false);
    } else {
      toast.error("Erro ao enviar o briefing. Tente novamente.");
    }
  };

  return (
    <>
      <AnimatePresence>
        {!briefingSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Briefing Pendente</h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Responda o briefing para iniciarmos a produção do seu projeto.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {briefingToken && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`/b/${briefingToken}`, "_blank")}
                  className="rounded-xl border-white/10 text-xs text-white/70 hover:text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  Tela Cheia
                </Button>
              )}
              <Button onClick={() => setOpen(true)} className="gap-2 rounded-xl text-xs w-full sm:w-auto">
                <Sparkles className="h-4 w-4" />
                Responder Briefing
              </Button>
            </div>
          </motion.div>
        )}

        {briefingSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Briefing Entregue & Em Produção</h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Suas respostas estão salvas e guiando o desenvolvimento do projeto.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(true)}
              className="rounded-xl border-white/10 text-xs text-white gap-2 shrink-0 hover:bg-white/5"
            >
              <ClipboardList className="h-3.5 w-3.5 text-primary" />
              Ver Respostas
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Briefing Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-[#0D0D0D] border-[#222] text-[#F5F5F5]">
          <DialogHeader>
            <DialogTitle className="text-[#F5F5F5] text-xl font-display">
              Briefing, {projectType} {briefingSubmitted && "— Respostas Salvas"}
            </DialogTitle>
            <p className="text-sm text-[#B3B3B3] mt-1">
              {briefingSubmitted
                ? "Suas respostas estão registradas no sistema do Studio Kiiro (modo somente leitura)."
                : "Preencha com o máximo de detalhes possível para um resultado incrível."}
            </p>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {questions?.map((q) => {
              if (q.type === "section") {
                return (
                  <div key={q.id} className="pt-6 pb-2 border-b border-[#2A2A2A] mt-4">
                    <h3 className="text-base font-bold text-primary uppercase tracking-widest">
                      {q.question}
                    </h3>
                  </div>
                );
              }
              return (
                <div key={q.id} className="space-y-2.5">
                  <label className="text-[15px] font-medium text-[#F5F5F5] leading-snug">
                    {q.question} {q.required && !briefingSubmitted && <span className="text-primary font-bold">*</span>}
                  </label>
                  {(q.type === "text" || q.type === "email" || q.type === "phone") && (
                    <Input
                      type={q.type === "email" ? "email" : q.type === "phone" ? "tel" : "text"}
                      value={answers[q.id] || ""}
                      disabled={briefingSubmitted}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      placeholder={q.placeholder || "Sua resposta..."}
                      className="rounded-xl bg-[#1A1A1A] border-[#333] text-[#F5F5F5] placeholder:text-[#666] focus-visible:ring-primary focus-visible:border-primary"
                    />
                  )}
                  {q.type === "textarea" && (
                    <Textarea
                      value={answers[q.id] || ""}
                      disabled={briefingSubmitted}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      placeholder={q.placeholder || "Sua resposta..."}
                      rows={3}
                      className="rounded-xl bg-[#1A1A1A] border-[#333] text-[#F5F5F5] placeholder:text-[#666] focus-visible:ring-primary focus-visible:border-primary"
                    />
                  )}
                  {q.type === "select" && q.options && (
                    <div className="space-y-2">
                      <div className="space-y-1.5">
                        {q.options.map((opt) => (
                          <label
                            key={opt}
                            className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-primary/20"
                          >
                            <input
                              type="radio"
                              name={q.id}
                              disabled={briefingSubmitted}
                              checked={(answers[q.id] || "").startsWith(opt)}
                              onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                              className="h-4 w-4 text-primary accent-primary"
                            />
                            <span className="text-sm text-[#F5F5F5]">{opt}</span>
                          </label>
                        ))}
                      </div>
                      {q.hasConditionalText && answers[q.id] && (
                        <Input
                          value={answers[`${q.id}_detail`] || ""}
                          disabled={briefingSubmitted}
                          onChange={(e) => setAnswers((prev) => ({ ...prev, [`${q.id}_detail`]: e.target.value }))}
                          placeholder="Especifique..."
                          className="ml-6 rounded-xl bg-[#1A1A1A] border-[#333] text-[#F5F5F5] placeholder:text-[#666] focus-visible:ring-primary focus-visible:border-primary"
                        />
                      )}
                    </div>
                  )}
                  {q.type === "checkbox" && q.options && (
                    <div className="space-y-1.5">
                      {q.options.map((opt) => {
                        const currentVal = answers[q.id] || "";
                        const selected = currentVal.split("|||").filter(Boolean);
                        const isChecked = selected.includes(opt);
                        return (
                          <label
                            key={opt}
                            className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-primary/20"
                          >
                            <Checkbox
                              checked={isChecked}
                              disabled={briefingSubmitted}
                              onCheckedChange={(checked) => {
                                const newSelected = checked
                                  ? [...selected, opt]
                                  : selected.filter((s) => s !== opt);
                                setAnswers((prev) => ({ ...prev, [q.id]: newSelected.join("|||") }));
                              }}
                              className="border-[#555] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
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
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
                className="text-[#B3B3B3] hover:text-[#F5F5F5] hover:bg-white/5"
              >
                {briefingSubmitted ? "Fechar" : "Cancelar"}
              </Button>
              {!briefingSubmitted && (
                <Button onClick={handleSubmit} disabled={submitting} className="rounded-xl">
                  {submitting ? "Enviando..." : "Enviar Briefing"}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClientBriefingBanner;
