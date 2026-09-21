import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckCircle2, ClipboardList } from "lucide-react";
import { briefingQuestions, type BriefingQuestion } from "@/data/briefingQuestions";
import logo from "@/assets/logo.webp";

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

  const handleSubmit = async () => {
    if (!questions || !token) return;
    const missing = questions.filter((q) => q.required && !answers[q.id]?.trim());
    if (missing.length > 0) {
      toast.error(`Preencha os campos obrigatórios (${missing.length} restante(s)).`);
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
    toast.success("Briefing enviado com sucesso!");
    setDone(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        <div className="animate-pulse text-primary font-display font-bold uppercase tracking-[0.3em] text-[10px]">
          Studio Kiiro
        </div>
      </div>
    );
  }

  if (notFound || !info) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
        <ClipboardList className="h-10 w-10 text-white/20 mb-4" />
        <h1 className="font-display text-2xl font-bold text-[#F5F5F5] mb-2">Link inválido</h1>
        <p className="text-[#B3B3B3] text-sm max-w-md">
          Este link de briefing não existe mais ou foi desativado. Entre em contato com o Studio Kiiro
          para receber um novo link.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#F5F5F5]">
      <header className="border-b border-[#1A1A1A] px-6 py-5">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <img src={logo} alt="Studio Kiiro" className="h-7 w-auto" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
            Briefing
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.25em] text-primary mb-3">
            {info.project_type}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">{info.project_name}</h1>
          <p className="text-[#B3B3B3] text-sm">
            {info.company || info.client_name}
          </p>
        </div>

        {done ? (
          <div className="rounded-2xl border border-[#222] bg-[#0D0D0D] p-10 text-center">
            <CheckCircle2 className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold mb-2">Briefing recebido</h2>
            <p className="text-[#B3B3B3] text-sm">
              Obrigado! As respostas foram enviadas para o Studio Kiiro. Em breve entraremos em
              contato para dar início ao projeto.
            </p>
          </div>
        ) : !questions ? (
          <div className="rounded-2xl border border-[#222] bg-[#0D0D0D] p-10 text-center">
            <p className="text-[#B3B3B3] text-sm">
              O briefing deste projeto ainda não está disponível. Entre em contato com o Studio Kiiro.
            </p>
          </div>
        ) : (
          <div className="space-y-7">
            <p className="text-sm text-[#B3B3B3]">
              Preencha com o máximo de detalhes possível para um resultado incrível.
            </p>
            {questions.map((q) => {
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
                  <label className="text-[15px] font-medium text-[#F5F5F5] leading-snug block">
                    {q.question} {q.required && <span className="text-primary font-bold">*</span>}
                  </label>
                  {(q.type === "text" || q.type === "email" || q.type === "phone") && (
                    <Input
                      type={q.type === "email" ? "email" : q.type === "phone" ? "tel" : "text"}
                      value={answers[q.id] || ""}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      placeholder={q.placeholder || "Sua resposta..."}
                      className="rounded-xl bg-[#1A1A1A] border-[#333] text-[#F5F5F5] placeholder:text-[#666] focus-visible:ring-primary focus-visible:border-primary"
                    />
                  )}
                  {q.type === "textarea" && (
                    <Textarea
                      value={answers[q.id] || ""}
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
                          onChange={(e) =>
                            setAnswers((prev) => ({ ...prev, [`${q.id}_detail`]: e.target.value }))
                          }
                          placeholder="Especifique..."
                          className="ml-6 rounded-xl bg-[#1A1A1A] border-[#333] text-[#F5F5F5] placeholder:text-[#666] focus-visible:ring-primary focus-visible:border-primary"
                        />
                      )}
                    </div>
                  )}
                  {q.type === "checkbox" && q.options && (
                    <div className="space-y-1.5">
                      {q.options.map((opt) => {
                        const selected = (answers[q.id] || "").split("|||").filter(Boolean);
                        const isChecked = selected.includes(opt);
                        return (
                          <label
                            key={opt}
                            className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-primary/20"
                          >
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                const next = checked
                                  ? [...selected, opt]
                                  : selected.filter((s) => s !== opt);
                                setAnswers((prev) => ({ ...prev, [q.id]: next.join("|||") }));
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

            <div className="flex justify-end pt-6 border-t border-[#2A2A2A]">
              <Button onClick={handleSubmit} disabled={submitting} className="rounded-xl">
                {submitting ? "Enviando..." : "Enviar Briefing"}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BriefingPublico;
