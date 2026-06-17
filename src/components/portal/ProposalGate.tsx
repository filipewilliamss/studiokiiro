import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  LogOut, Hash, ThumbsUp, ThumbsDown, CheckCircle2, XCircle, Receipt,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import kiiroLogo from "@/assets/logo.webp";

interface QuoteItem { description: string; quantity: number; unit_price: number; }
interface Quote {
  id: string; sequential_number: number; project_type: string; description: string | null;
  items: QuoteItem[]; total_value: number; payment_terms: string | null;
  validity_date: string | null; status: string; created_at: string; notes: string | null;
  client_id: string; admin_confirmed: boolean;
}

interface ProposalGateProps {
  quotes: Quote[];
  profileId: string;
  onQuotesUpdated: () => void;
}

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

const DashboardPageWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen relative">
    <div className="fixed inset-0 bg-black" />
    <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 40%, hsl(0 0% 8%) 0%, transparent 100%)" }} />
    <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsl(0 0% 25%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 25%) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
    <div className="relative z-10">{children}</div>
  </div>
);

const rejectionReasons = [
  "O valor está acima do meu orçamento.",
  "Decidi mudar o tipo de serviço/projeto.",
  "Decidi contratar outro profissional/estúdio.",
  "Desisti de realizar este projeto no momento.",
  "Não entendi completamente o que está sendo proposto.",
  "Outro motivo.",
];

const decisionFactors = [
  "Prazos.",
  "Escopo do serviço (o que está incluído).",
  "Forma de pagamento.",
  "Não senti segurança suficiente para seguir agora.",
  "Outro fator.",
];

const ProposalGate = ({ quotes, profileId, onQuotesUpdated }: ProposalGateProps) => {
  const { profile, signOut } = useAuth();
  const [rejectingQuote, setRejectingQuote] = useState<Quote | null>(null);
  const [reason, setReason] = useState("");
  const [decisionFactor, setDecisionFactor] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Determine what to show
  const pendingQuotes = quotes.filter((q) => q.status === "pendente");
  const acceptedNotConfirmed = quotes.filter((q) => q.status === "aprovado" && !q.admin_confirmed);
  const allRejected = quotes.length > 0 && quotes.every((q) => q.status === "recusado");

  const handleAccept = async (quote: Quote) => {
    const { error } = await supabase.from("quotes").update({
      status: "aprovado",
      client_response_at: new Date().toISOString(),
    }).eq("id", quote.id);
    if (error) toast.error("Erro ao aceitar proposta.");
    else {
      toast.success("Proposta aceita! ✅");
      onQuotesUpdated();
    }
  };

  const handleRejectSubmit = async () => {
    if (!rejectingQuote || !reason) {
      toast.error("Selecione o motivo da recusa.");
      return;
    }
    setSubmitting(true);

    // Update quote status
    const { error: quoteErr } = await supabase.from("quotes").update({
      status: "recusado",
      client_response_at: new Date().toISOString(),
    }).eq("id", rejectingQuote.id);

    // Insert rejection feedback
    const { error: feedbackErr } = await supabase.from("quote_rejections").insert({
      quote_id: rejectingQuote.id,
      client_id: profileId,
      reason,
      decision_factor: decisionFactor || null,
      comment: comment.trim() || null,
    });

    if (quoteErr || feedbackErr) toast.error("Erro ao enviar resposta.");
    else {
      toast.success("Obrigado pelo retorno!");
      setRejectingQuote(null);
      setReason("");
      setDecisionFactor("");
      setComment("");
      onQuotesUpdated();
    }
    setSubmitting(false);
  };

  // Waiting for admin confirmation screen
  if (acceptedNotConfirmed.length > 0 && pendingQuotes.length === 0) {
    return (
      <DashboardPageWrapper>
        <Navbar forceBlack />
        <header className="border-b border-white/10 bg-black sticky top-[calc(7rem-55px)] md:top-[calc(9rem-55px)] z-[60] mt-[calc(8rem-55px)] md:mt-[calc(10rem-55px)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-end">
            <Button variant="ghost" size="sm" onClick={signOut} className="text-white/40 hover:text-white">
              <LogOut className="h-4 w-4 mr-2" />Sair
            </Button>
          </div>
        </header>
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Obrigado por aceitar a proposta!
            </h1>
            <p className="text-white/60 max-w-md mx-auto leading-relaxed">
              Em breve daremos início ao seu projeto. Aguarde a confirmação do Studio Kiiro para acessar seu painel completo.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/40">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Aguardando confirmação do estúdio
            </div>
          </motion.div>
        </main>
      </DashboardPageWrapper>
    );
  }

  // All rejected screen
  if (allRejected) {
    return (
      <DashboardPageWrapper>
        <Navbar forceBlack />
        <header className="border-b border-white/10 bg-black sticky top-[calc(7rem-55px)] md:top-[calc(9rem-55px)] z-[60] mt-[calc(8rem-55px)] md:mt-[calc(10rem-55px)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-end">
            <Button variant="ghost" size="sm" onClick={signOut} className="text-white/40 hover:text-white">
              <LogOut className="h-4 w-4 mr-2" />Sair
            </Button>
          </div>
        </header>
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <XCircle className="h-8 w-8 text-white/30" />
            </div>
            <h1 className="text-2xl font-bold text-white font-display">
              Proposta recusada
            </h1>
            <p className="text-white/60 max-w-md mx-auto leading-relaxed">
              Obrigado pelo retorno! Recebemos sua resposta e, se fizer sentido, podemos ajustar a proposta ou encerrar por aqui de forma organizada.
            </p>
          </motion.div>
        </main>
      </DashboardPageWrapper>
    );
  }

  // Pending quotes — proposal view
  return (
    <DashboardPageWrapper>
      <Navbar forceBlack />
      <header className="border-b border-white/10 bg-black sticky top-[calc(7rem-55px)] md:top-[calc(9rem-55px)] z-[60] mt-[calc(8rem-55px)] md:mt-[calc(10rem-55px)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold">Proposta de Projeto</span>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut} className="text-white/40 hover:text-white">
            <LogOut className="h-4 w-4 mr-2" />Sair
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3 mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Seu orçamento para este projeto
          </h1>
          <p className="text-white/50 text-sm max-w-lg mx-auto">
            Revise a proposta abaixo e escolha se deseja seguir com o projeto.
          </p>
        </motion.div>

        {pendingQuotes.map((quote) => (
          <motion.div
            key={quote.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden"
          >
            {/* Quote header */}
            <div className="bg-primary p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="h-4 w-4 text-black/60" />
                    <span className="font-display font-bold text-black">ORC-{String(quote.sequential_number).padStart(4, "0")}</span>
                  </div>
                  <h2 className="text-xl font-bold text-black font-display">{quote.project_type}</h2>
                  {quote.description && <p className="text-sm text-black/70 mt-1">{quote.description}</p>}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-black font-display">{formatCurrency(Number(quote.total_value))}</p>
                </div>
              </div>
            </div>

            {/* Quote body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Items table */}
              {(quote.items as any[])?.length > 0 && (
                <div className="border border-white/10 rounded-xl overflow-hidden">
                  <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-2.5 bg-white/5 text-[10px] uppercase tracking-wider text-white/40 font-medium">
                    <span className="col-span-6">Descrição</span>
                    <span className="col-span-2 text-center">Qtd</span>
                    <span className="col-span-2 text-right">Valor unit.</span>
                    <span className="col-span-2 text-right">Total</span>
                  </div>
                  {(quote.items as any[]).map((item: any, idx: number) => (
                    <div key={idx} className="border-t border-white/5">
                      {/* Desktop row */}
                      <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-3 text-sm">
                        <span className="col-span-6 text-white">{item.description}</span>
                        <span className="col-span-2 text-center text-white/55">{item.quantity}</span>
                        <span className="col-span-2 text-right text-white/55">{formatCurrency(item.unit_price)}</span>
                        <span className="col-span-2 text-right font-medium text-white">{formatCurrency(item.quantity * item.unit_price)}</span>
                      </div>
                      {/* Mobile stacked */}
                      <div className="sm:hidden px-4 py-3 space-y-1">
                        <p className="text-sm text-white font-medium">{item.description}</p>
                        <div className="flex justify-between text-xs text-white/55">
                          <span>{item.quantity}x {formatCurrency(item.unit_price)}</span>
                          <span className="font-medium text-white">{formatCurrency(item.quantity * item.unit_price)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {quote.payment_terms && (
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">Condições de pagamento</p>
                  <p className="text-sm text-white/70">{quote.payment_terms}</p>
                </div>
              )}

              {quote.validity_date && (
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">Validade</p>
                  <p className="text-sm text-white/70">{new Date(quote.validity_date).toLocaleDateString("pt-BR")}</p>
                </div>
              )}

              {quote.notes && (
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">Observações</p>
                  <p className="text-sm text-white/70 whitespace-pre-wrap">{quote.notes}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <Button
                  onClick={() => handleAccept(quote)}
                  className="flex-1 gap-2 rounded-xl h-12 text-base"
                  style={{ backgroundColor: "hsl(142, 71%, 35%)", color: "white" }}
                >
                  <ThumbsUp className="h-5 w-5" />
                  Aceitar proposta
                </Button>
                <Button
                  onClick={() => setRejectingQuote(quote)}
                  variant="outline"
                  className="flex-1 gap-2 rounded-xl h-12 text-base border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  <ThumbsDown className="h-5 w-5" />
                  Recusar proposta
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </main>

      {/* Rejection feedback modal */}
      <Dialog open={!!rejectingQuote} onOpenChange={(o) => { if (!o) setRejectingQuote(null); }}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto bg-[#0D0D0D] border-[#222] text-white">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-display">Feedback sobre a proposta</DialogTitle>
            <p className="text-sm text-white/50 mt-1">Nos ajude a entender sua decisão para que possamos melhorar.</p>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Question 1 */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white">Por que você decidiu recusar esta proposta?</label>
              <RadioGroup value={reason} onValueChange={setReason}>
                {rejectionReasons.map((r) => (
                  <div key={r} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                    <RadioGroupItem value={r} id={`reason-${r}`} className="border-white/30 text-primary" />
                    <Label htmlFor={`reason-${r}`} className="text-sm text-white/80 cursor-pointer flex-1">{r}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Question 2 */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white">O que mais pesou na sua decisão?</label>
              <RadioGroup value={decisionFactor} onValueChange={setDecisionFactor}>
                {decisionFactors.map((f) => (
                  <div key={f} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                    <RadioGroupItem value={f} id={`factor-${f}`} className="border-white/30 text-primary" />
                    <Label htmlFor={`factor-${f}`} className="text-sm text-white/80 cursor-pointer flex-1">{f}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Question 3 — optional */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Quer deixar algum comentário ou sugestão? <span className="text-white/30 font-normal">(opcional)</span>
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escreva aqui..."
                rows={3}
                className="rounded-xl bg-[#1A1A1A] border-[#333] text-white placeholder:text-[#666]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
              <Button variant="ghost" onClick={() => setRejectingQuote(null)} className="text-white/50 hover:text-white hover:bg-white/5">
                Cancelar
              </Button>
              <Button onClick={handleRejectSubmit} disabled={submitting || !reason} className="rounded-xl">
                {submitting ? "Enviando..." : "Enviar feedback e recusar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardPageWrapper>
  );
};

export default ProposalGate;
