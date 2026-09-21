import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import kiiroLogo from "@/assets/logo.webp";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckCircle2, ClipboardList, ShieldCheck, Sparkles, Send, Check } from "lucide-react";
import { briefingQuestions, type BriefingQuestion } from "@/data/briefingQuestions";

interface BriefingInfo {
  project_name: string;
  project_type: string;
  client_name: string;
  company: string | null;
  submitted: boolean;
}

const BriefingPublico = () => {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<BriefingInfo | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // Restore draft from localStorage
  useEffect(() => {
    if (!token) return;
    try {
      const savedDraft = localStorage.getItem(`kiiro_briefing_${token}`);
      if (savedDraft) {
        setAnswers(JSON.parse(savedDraft));
      }
    } catch (e) {
      console.error("Erro ao carregar rascunho:", e);
    }
  }, [token]);

  // Auto-save draft to localStorage
  useEffect(() => {
    if (!token || done) return;
    if (Object.keys(answers).length > 0) {
      try {
        localStorage.setItem(`kiiro_briefing_${token}`, JSON.stringify(answers));
      } catch (e) {
        console.error("Erro ao salvar rascunho:", e);
      }
    }
  }, [answers, token, done]);

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      const { data, error } = await supabase.rpc("get_briefing_by_token", { p_token: token });
      const result = data as any;
      if (error || !result || result.error) {
        setNotFound(true);
      } else {
        setInfo(result as BriefingInfo);
        if (result.submitted) setDone(true);
      }
      setLoading(false);
    };
    load();
  }, [token]);

  const questions: BriefingQuestion[] | undefined = info
    ? briefingQuestions[info.project_type]
    : undefined;

  // Calculate answering progress
  const progressStats = useMemo(() => {
    if (!questions) return { total: 0, answered: 0, percentage: 0 };
    const fillable = questions.filter((q) => q.type !== "section");
    const total = fillable.length;
    const answered = fillable.filter((q) => Boolean(answers[q.id]?.trim())).length;
    const percentage = total > 0 ? Math.round((answered / total) * 100) : 0;
    return { total, answered, percentage };
  }, [questions, answers]);

  const handleSubmit = async () => {
    if (!questions || !token) return;
    const missing = questions.filter((q) => q.required && !answers[q.id]?.trim());
    if (missing.length > 0) {
      toast.error(`Preencha todos os campos obrigatórios (${missing.length} pendente(s)).`);
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase.rpc("submit_briefing_by_token", {
      p_token: token,
      p_responses: answers as any,
    });
    setSubmitting(false);
    const result = data as any;
    if (error || !result || result.error) {
      if (result?.error === "already_submitted") {
        toast.error("Este briefing já foi respondido.");
        setDone(true);
        return;
      }
      toast.error("Erro ao enviar o briefing. Tente novamente.");
      return;
    }

    try {
      localStorage.removeItem(`kiiro_briefing_${token}`);
    } catch {
      // ignore
    }

    toast.success("Briefing enviado com sucesso!");
    setDone(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070807] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-2 border-[#FFCA16]/20 border-t-[#FFCA16] rounded-full animate-spin" />
        <div className="animate-pulse text-[#FFCA16] font-display font-bold uppercase tracking-[0.3em] text-[10px]">
          Studio Kiiro
        </div>
      </div>
    );
  }

  if (notFound || !info) {
    return (
      <div className="min-h-screen bg-[#070807] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6">
          <ClipboardList className="h-7 w-7 text-[#FFCA16]" />
        </div>
        <h1 className="font-display text-3xl font-bold text-white mb-3">Link inválido ou expirado</h1>
        <p className="text-white/60 text-sm max-w-md mb-8 leading-relaxed">
          Este link de briefing não existe ou já foi desativado. Entre em contato com a equipe do Studio Kiiro para receber um link atualizado.
        </p>
        <a
          href="https://wa.me/5511991076096"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFCA16] text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-[#FFCA16]/90 transition-all"
        >
          Falar com o Studio Kiiro
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070807] text-white selection:bg-[#FFCA16] selection:text-black">
      {/* Sticky Top Header with Progress Bar */}
      <header className="sticky top-0 z-40 bg-[#070807]/90 backdrop-blur-xl border-b border-white/[0.08] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <Link to="/" className="flex items-center group" title="Studio Kiiro">
              <img
                src={kiiroLogo}
                alt="Studio Kiiro"
                className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="w-[1px] h-4 bg-white/15 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFCA16] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#FFCA16] font-display font-bold">
                Briefing Estratégico
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-white/50 font-mono">
              {progressStats.answered} de {progressStats.total} respondidas
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-[#FFCA16] bg-[#FFCA16]/10 border border-[#FFCA16]/30 px-3 py-1 rounded-full font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{progressStats.percentage}%</span>
            </div>
          </div>
        </div>

        {/* Thin animated progress indicator */}
        <div className="w-full bg-white/[0.06] h-[2px] mt-3 rounded-full overflow-hidden">
          <div
            className="bg-[#FFCA16] h-full transition-all duration-500 ease-out"
            style={{ width: `${progressStats.percentage}%` }}
          />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Project Intro Header */}
        <div className="mb-10 pb-8 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#FFCA16] text-[10px] font-mono uppercase tracking-widest mb-3">
            {info.project_type}
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-[800] text-white tracking-tight leading-[1.05] mb-3">
            {info.project_name}
          </h1>
          <p className="text-white/60 text-base font-light">
            Cliente: <span className="text-white font-medium">{info.company || info.client_name}</span>
          </p>
        </div>

        {done ? (
          <div className="rounded-3xl border border-white/10 bg-[#0d0f0d] p-10 sm:p-14 text-center relative overflow-hidden shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#FFCA16]/15 border border-[#FFCA16]/40 flex items-center justify-center text-[#FFCA16] mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-[800] text-white mb-3">
              Briefing recebido com sucesso!
            </h2>
            <p className="text-white/60 text-base max-w-lg mx-auto leading-relaxed font-light mb-8">
              Suas respostas foram salvas com segurança no painel do Studio Kiiro. Filipe Williams e a equipe já iniciaram a análise técnica para dar início à produção.
            </p>

            {/* Next steps guide */}
            <div className="grid sm:grid-cols-3 gap-4 text-left max-w-xl mx-auto mb-10">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-[#FFCA16] font-mono text-xs font-bold block mb-1">Passo 01</span>
                <span className="text-white text-sm font-semibold block">Imersão</span>
                <span className="text-white/50 text-xs mt-1 block">Análise profunda dos dados fornecidos.</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-[#FFCA16] font-mono text-xs font-bold block mb-1">Passo 02</span>
                <span className="text-white text-sm font-semibold block">Criação</span>
                <span className="text-white/50 text-xs mt-1 block">Desenvolvimento visual da metodologia.</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-[#FFCA16] font-mono text-xs font-bold block mb-1">Passo 03</span>
                <span className="text-white text-sm font-semibold block">Apresentação</span>
                <span className="text-white/50 text-xs mt-1 block">Validação de conceitos e ajustes.</span>
              </div>
            </div>

            <a
              href="https://wa.me/5511991076096"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#FFCA16] text-black font-display font-bold text-xs uppercase tracking-widest hover:bg-[#FFCA16]/90 transition-all shadow-lg"
            >
              Falar no WhatsApp do Studio
            </a>
          </div>
        ) : !questions ? (
          <div className="rounded-2xl border border-white/10 bg-[#0d0f0d] p-10 text-center">
            <p className="text-white/60 text-base">
              O formulário deste projeto ainda está sendo configurado. Entre em contato com o Studio Kiiro.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/50 font-light">
                Responda com o máximo de detalhes. Seu rascunho é salvo automaticamente neste navegador.
              </p>
            </div>

            {questions.map((q) => {
              if (q.type === "section") {
                return (
                  <div key={q.id} className="pt-8 pb-3 border-b border-[#FFCA16]/30 mt-6">
                    <span className="text-[#FFCA16] text-[11px] font-mono uppercase tracking-widest block mb-1">
                      Seção Temática
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {q.question}
                    </h3>
                  </div>
                );
              }

              const hasAnswer = Boolean(answers[q.id]?.trim());

              return (
                <div
                  key={q.id}
                  className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
                    hasAnswer
                      ? "bg-[#0d0f0d] border-white/15"
                      : "bg-[#0b0c0b] border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <label className="text-base font-semibold text-white leading-snug block mb-3">
                    {q.question}{" "}
                    {q.required && <span className="text-[#FFCA16] font-bold ml-1">*</span>}
                  </label>

                  {(q.type === "text" || q.type === "email" || q.type === "phone") && (
                    <Input
                      type={q.type === "email" ? "email" : q.type === "phone" ? "tel" : "text"}
                      value={answers[q.id] || ""}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      placeholder={q.placeholder || "Sua resposta..."}
                      className="rounded-xl bg-black/60 border-white/15 text-white placeholder:text-white/30 focus-visible:ring-[#FFCA16] focus-visible:border-[#FFCA16] py-5"
                    />
                  )}

                  {q.type === "textarea" && (
                    <Textarea
                      value={answers[q.id] || ""}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      placeholder={q.placeholder || "Escreva detalhadamente..."}
                      rows={4}
                      className="rounded-xl bg-black/60 border-white/15 text-white placeholder:text-white/30 focus-visible:ring-[#FFCA16] focus-visible:border-[#FFCA16] resize-y"
                    />
                  )}

                  {q.type === "select" && q.options && (
                    <div className="space-y-2">
                      <div className="grid sm:grid-cols-2 gap-2">
                        {q.options.map((opt) => {
                          const isSelected = (answers[q.id] || "").startsWith(opt);
                          return (
                            <label
                              key={opt}
                              className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all border ${
                                isSelected
                                  ? "bg-[#FFCA16]/10 border-[#FFCA16] text-[#FFCA16]"
                                  : "bg-white/[0.02] border-white/10 text-white/80 hover:bg-white/[0.05]"
                              }`}
                            >
                              <input
                                type="radio"
                                name={q.id}
                                checked={isSelected}
                                onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                                className="h-4 w-4 text-[#FFCA16] accent-[#FFCA16]"
                              />
                              <span className="text-sm font-medium">{opt}</span>
                            </label>
                          );
                        })}
                      </div>

                      {q.hasConditionalText && answers[q.id] && (
                        <div className="mt-3">
                          <Input
                            value={answers[`${q.id}_detail`] || ""}
                            onChange={(e) =>
                              setAnswers((prev) => ({ ...prev, [`${q.id}_detail`]: e.target.value }))
                            }
                            placeholder="Por favor, detalhe ou especifique aqui..."
                            className="rounded-xl bg-black/60 border-white/15 text-white placeholder:text-white/30 focus-visible:ring-[#FFCA16] focus-visible:border-[#FFCA16]"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {q.type === "checkbox" && q.options && (
                    <div className="grid sm:grid-cols-2 gap-2">
                      {q.options.map((opt) => {
                        const selected = (answers[q.id] || "").split("|||").filter(Boolean);
                        const isChecked = selected.includes(opt);
                        return (
                          <label
                            key={opt}
                            className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all border ${
                              isChecked
                                ? "bg-[#FFCA16]/10 border-[#FFCA16] text-[#FFCA16]"
                                : "bg-white/[0.02] border-white/10 text-white/80 hover:bg-white/[0.05]"
                            }`}
                          >
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                const next = checked
                                  ? [...selected, opt]
                                  : selected.filter((s) => s !== opt);
                                setAnswers((prev) => ({ ...prev, [q.id]: next.join("|||") }));
                              }}
                              className="border-white/30 data-[state=checked]:bg-[#FFCA16] data-[state=checked]:border-[#FFCA16] data-[state=checked]:text-black"
                            />
                            <span className="text-sm font-medium">{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Submission Action Box */}
            <div className="rounded-2xl border border-white/15 bg-[#0d0f0d] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-white font-semibold text-base">Pronto para finalizar?</p>
                <p className="text-white/50 text-xs mt-0.5">
                  Revise suas respostas. Após o envio, nossa equipe iniciará a produção.
                </p>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-6 rounded-full bg-[#FFCA16] hover:bg-[#FFCA16]/90 text-black font-display font-bold text-xs uppercase tracking-widest shadow-xl transition-all duration-300 gap-2 shrink-0"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Briefing Completo</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BriefingPublico;
