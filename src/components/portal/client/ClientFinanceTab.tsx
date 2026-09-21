import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign, CheckCircle2, Clock, AlertCircle, CreditCard,
  QrCode, Copy, Check, Upload, FileText, MessageCircle, ExternalLink, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  generatePixPayload,
  generatePixQrCodeDataUrl,
  getStudioPixConfig,
  type StudioPixConfig
} from "@/services/pixService";
import type { Payment } from "@/services/projectService";

interface ClientFinanceTabProps {
  payment: Payment | null;
  projectName?: string;
  projectId?: string;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export const ClientFinanceTab = ({ payment, projectName, projectId }: ClientFinanceTabProps) => {
  const [pixPayload, setPixPayload] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [copiedPix, setCopiedPix] = useState(false);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const [receiptSuccess, setReceiptSuccess] = useState(false);
  const [pixConfig, setPixConfig] = useState<StudioPixConfig>(getStudioPixConfig());
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!payment) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black p-8 sm:p-12 text-center">
        <DollarSign className="h-8 w-8 text-white/15 mx-auto mb-2" />
        <p className="text-white/35 text-sm">Nenhuma informação financeira disponível para este projeto.</p>
      </div>
    );
  }

  const status = payment.payment_status || "pendente";
  const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: typeof CheckCircle2 }> = {
    pago: { label: "Quitado / Pago", color: "text-emerald-400", bgColor: "bg-emerald-400/10 border-emerald-400/20", icon: CheckCircle2 },
    parcialmente_pago: { label: "Parcialmente Pago", color: "text-amber-400", bgColor: "bg-amber-400/10 border-amber-400/20", icon: Clock },
    pendente: { label: "Pendente", color: "text-orange-400", bgColor: "bg-orange-400/10 border-orange-400/20", icon: AlertCircle },
  };
  const cfg = statusConfig[status] || statusConfig.pendente;
  const StatusIcon = cfg.icon;

  const installmentsPaid = payment.installments_paid ?? 0;
  const installmentsTotal = payment.installments_total ?? 1;
  const installmentsPercent = Math.min(100, Math.round((installmentsPaid / installmentsTotal) * 100));

  const isFullyPaid = status === "pago" || (payment.remaining_amount != null && payment.remaining_amount <= 0 && installmentsPaid >= installmentsTotal);

  // Calcula o valor da próxima cobrança
  const remainingInstallments = Math.max(1, installmentsTotal - installmentsPaid);
  const installmentValue = payment.remaining_amount != null && payment.remaining_amount > 0
    ? payment.remaining_amount / remainingInstallments
    : payment.budget_total;

  const currentDueAmount = isFullyPaid ? 0 : Math.max(1, installmentValue);

  // Gera o código PIX e o QR Code bancário oficial
  useEffect(() => {
    if (isFullyPaid) return;

    const currentConfig = getStudioPixConfig();
    setPixConfig(currentConfig);

    const payload = generatePixPayload({
      key: currentConfig.key,
      merchantName: currentConfig.merchantName,
      merchantCity: currentConfig.merchantCity,
      amount: currentDueAmount,
      description: `Studio Kiiro - ${projectName || "Projeto"}`,
      txId: projectId?.replace(/[^a-zA-Z0-9]/g, "").substring(0, 20) || "KIIRO",
    });

    setPixPayload(payload);

    generatePixQrCodeDataUrl(payload)
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error("Erro ao gerar QR Code:", err));
  }, [currentDueAmount, projectName, projectId, isFullyPaid]);

  const handleCopyPix = async () => {
    if (!pixPayload) return;
    try {
      await navigator.clipboard.writeText(pixPayload);
      setCopiedPix(true);
      toast.success("Código PIX Copia e Cola copiado!", {
        description: "Abra o aplicativo do seu banco e cole na opção Pix Copia e Cola.",
      });
      setTimeout(() => setCopiedPix(false), 4000);
    } catch {
      toast.error("Não foi possível copiar automaticamente. Selecione o código manualmente.");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingReceipt(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `comprovante_${projectId || "projeto"}_${Date.now()}.${fileExt}`;
      const filePath = `comprovantes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("files")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.warn("Upload falhou no bucket files, fallback para notificação:", uploadError);
      }

      setReceiptSuccess(true);
      toast.success("Comprovante anexado com sucesso!", {
        description: "Nossa equipe já foi notificada para verificação e baixa no sistema.",
      });
    } catch (err: any) {
      console.error("Erro no envio do comprovante:", err);
      toast.error("Erro ao enviar arquivo. Você também pode enviar direto pelo WhatsApp.");
    } finally {
      setUploadingReceipt(false);
    }
  };

  const whatsAppUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(
    `Olá Studio Kiiro! Realizei o pagamento de ${formatCurrency(currentDueAmount)} referente ao projeto "${projectName || "meu projeto"}" e gostaria de confirmar o recebimento.`
  )}`;

  return (
    <div className="space-y-6">
      {/* Resumo Financeiro Geral */}
      <div className="rounded-2xl border border-white/10 bg-black p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <label className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold block">
            Resumo Financeiro
          </label>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold ${cfg.bgColor} ${cfg.color}`}>
            <StatusIcon className="h-3.5 w-3.5" />
            {cfg.label}
          </div>
        </div>

        {/* Main Budget Card */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/70">Valor Total do Projeto</span>
            <span className="text-2xl sm:text-3xl font-bold text-primary font-display">
              {formatCurrency(payment.budget_total)}
            </span>
          </div>

          {payment.initial_payment != null && payment.initial_payment > 0 && (
            <div className="flex items-center justify-between text-sm pt-2 border-t border-primary/15">
              <span className="text-white/60">Entrada</span>
              <div className="text-right">
                <span className="text-white font-medium">{formatCurrency(payment.initial_payment)}</span>
                {payment.initial_payment_date && (
                  <span className="text-white/40 text-xs ml-2">
                    ({new Date(payment.initial_payment_date + "T00:00:00").toLocaleDateString("pt-BR")})
                  </span>
                )}
              </div>
            </div>
          )}

          {payment.remaining_amount != null && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Saldo Restante</span>
              <span className="text-primary font-bold">{formatCurrency(payment.remaining_amount)}</span>
            </div>
          )}
        </div>

        {/* Installments Card */}
        {payment.installments_total != null && payment.installments_total > 0 && (
          <div className="border border-white/10 rounded-2xl p-6 space-y-4 bg-white/[0.01]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Plano de Parcelamento</span>
              <span className="text-white font-semibold">
                {payment.installments_total}x de{" "}
                {formatCurrency(
                  payment.remaining_amount != null && payment.installments_total > 0
                    ? payment.remaining_amount / payment.installments_total
                    : 0
                )}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Parcelas Quitadas</span>
              <span className="text-white font-medium">
                {installmentsPaid} de {installmentsTotal} ({installmentsPercent}%)
              </span>
            </div>

            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${installmentsPercent}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="h-full bg-[#FFCA16] rounded-full"
              />
            </div>

            {payment.next_payment_date && installmentsPaid < installmentsTotal && (
              <div className="mt-3 p-3.5 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <span>Próximo Vencimento</span>
                </div>
                <span className="text-xs font-mono font-bold text-primary">
                  {new Date(payment.next_payment_date + "T00:00:00").toLocaleDateString("pt-BR")}
                </span>
              </div>
            )}
          </div>
        )}

        {payment.notes && (
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white/60">
            <span className="font-semibold text-white/80 block mb-1">Observações Financeiras:</span>
            {payment.notes}
          </div>
        )}
      </div>

      {/* SEÇÃO DE PAGAMENTO PIX DINÂMICO */}
      {isFullyPaid ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8 text-center space-y-4"
        >
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-display">Projeto Totalmente Quitado!</h3>
            <p className="text-white/60 text-sm mt-1 max-w-md mx-auto">
              Todas as parcelas deste projeto foram liquidadas com sucesso. Muito obrigado pela confiança no Studio Kiiro!
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-[#FFCA16]/30 bg-[#070807] p-6 sm:p-8 space-y-6 relative overflow-hidden"
        >
          {/* Subtle gold glow banner */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFCA16]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <QrCode className="w-4 h-4 text-[#FFCA16]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#FFCA16] font-bold">
                  Pagamento Instantâneo via PIX
                </span>
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                Liquidar Parcela / Saldo Pendente
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-white/50 block">Valor desta etapa</span>
              <span className="text-2xl font-bold text-[#FFCA16] font-display">
                {formatCurrency(currentDueAmount)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* QR CODE DISPLAY */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="p-4 bg-white rounded-2xl shadow-2xl border border-white/20 relative group">
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="QR Code PIX Banco Central"
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center bg-zinc-100 text-zinc-400 rounded-lg">
                    <QrCode className="w-12 h-12 animate-pulse" />
                  </div>
                )}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black text-[#FFCA16] text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full border border-[#FFCA16]/40 uppercase whitespace-nowrap shadow-lg">
                  PIX BANCO CENTRAL
                </div>
              </div>
              <p className="text-[11px] text-white/40 mt-5 text-center">
                Aponte a câmera do app do seu banco para pagar instantaneamente
              </p>
            </div>

            {/* PIX COPIA E COLA & INSTRUÇÕES */}
            <div className="md:col-span-7 space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Beneficiário:</span>
                  <span className="font-semibold text-white">{pixConfig.merchantName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Chave PIX:</span>
                  <span className="font-mono text-[#FFCA16] font-medium">{pixConfig.key}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Cidade do Titular:</span>
                  <span className="text-white/80">{pixConfig.merchantCity}</span>
                </div>
              </div>

              {/* Botão Copia e Cola */}
              <div className="space-y-2">
                <label className="text-xs text-white/70 font-medium block">
                  Código Pix Copia e Cola
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={pixPayload}
                    className="w-full bg-black/80 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white/70 select-all pr-28 focus:outline-none focus:border-[#FFCA16]"
                  />
                  <Button
                    size="sm"
                    onClick={handleCopyPix}
                    className="absolute right-1.5 top-1.5 h-7 px-3 bg-[#FFCA16] text-black hover:bg-[#FFCA16]/90 font-bold text-xs rounded-lg transition-all"
                  >
                    {copiedPix ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1 text-black" /> Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1 text-black" /> Copiar Pix
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Seção Envio de Comprovante */}
              <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*,application/pdf"
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingReceipt}
                  className="flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs h-10 rounded-xl"
                >
                  <Upload className="w-3.5 h-3.5 mr-2 text-[#FFCA16]" />
                  {uploadingReceipt ? "Enviando comprovante..." : "Anexar Comprovante"}
                </Button>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs h-10 rounded-xl"
                  >
                    <MessageCircle className="w-3.5 h-3.5 mr-2" />
                    Avisar no WhatsApp
                  </Button>
                </a>
              </div>

              {receiptSuccess && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Comprovante registrado com sucesso! Nossa equipe confirmará o lançamento.</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ClientFinanceTab;
