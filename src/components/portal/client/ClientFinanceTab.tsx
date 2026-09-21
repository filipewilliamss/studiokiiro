import { motion } from "framer-motion";
import { DollarSign, CheckCircle2, Clock, AlertCircle, CreditCard } from "lucide-react";
import type { Payment } from "@/services/projectService";

interface ClientFinanceTabProps {
  payment: Payment | null;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export const ClientFinanceTab = ({ payment }: ClientFinanceTabProps) => {
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

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-black p-6 sm:p-8 space-y-6">
        <label className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold block">
          Resumo Financeiro
        </label>

        {/* Main Budget Card */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/70">Valor Total do Projeto</span>
            <span className="text-2xl sm:text-3xl font-bold text-primary font-display">
              {formatCurrency(payment.budget_total)}
            </span>
          </div>

          <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-semibold ${cfg.bgColor} ${cfg.color}`}>
            <StatusIcon className="h-4 w-4" />
            {cfg.label}
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
    </div>
  );
};

export default ClientFinanceTab;
