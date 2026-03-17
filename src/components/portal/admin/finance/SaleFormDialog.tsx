import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Percent, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { Payment, ServicePrice, Profile, formatCurrency, PAYMENT_METHODS, PAYMENT_STATUSES, statusLabels } from "./types";

interface Project { id: string; name: string; client_id: string; }

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  editingPayment: Payment | null;
  servicePrices: ServicePrice[];
  onSaved: () => void;
}

const defaultForm = {
  project_id: "",
  service_price_id: "",
  budget_total: "",
  initial_payment: "",
  initial_payment_date: "",
  installments_total: "1",
  installments_paid: "0",
  next_payment_date: "",
  notes: "",
  has_commission: false,
  commission_rate: "30",
  sale_date: new Date().toISOString().split("T")[0],
  payment_method: "PIX",
  sales_rep: "",
  freelancer_cost: "",
  other_costs: "",
  payment_fees_pct: "",
  payment_status: "pendente",
  commission_paid_to_partner: false,
};

const SaleFormDialog = ({ open, onOpenChange, editingPayment, servicePrices, onSaved }: Props) => {
  const [form, setForm] = useState({ ...defaultForm });
  const [projects, setProjects] = useState<Project[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const [{ data: p }, { data: pr }] = await Promise.all([
        supabase.from("projects").select("id, name, client_id"),
        supabase.from("profiles").select("id, full_name, company"),
      ]);
      if (p) setProjects(p);
      if (pr) setProfiles(pr as Profile[]);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (editingPayment) {
      setForm({
        project_id: editingPayment.project_id,
        service_price_id: editingPayment.service_price_id || "",
        budget_total: String(editingPayment.budget_total),
        initial_payment: String(editingPayment.initial_payment ?? ""),
        initial_payment_date: editingPayment.initial_payment_date ?? "",
        installments_total: String(editingPayment.installments_total ?? "1"),
        installments_paid: String(editingPayment.installments_paid ?? "0"),
        next_payment_date: editingPayment.next_payment_date ?? "",
        notes: editingPayment.notes ?? "",
        has_commission: editingPayment.has_commission ?? false,
        commission_rate: String(editingPayment.commission_rate ?? 30),
        sale_date: editingPayment.sale_date ?? new Date().toISOString().split("T")[0],
        payment_method: editingPayment.payment_method ?? "PIX",
        sales_rep: editingPayment.sales_rep ?? "",
        freelancer_cost: String(editingPayment.freelancer_cost ?? ""),
        other_costs: String(editingPayment.other_costs ?? ""),
        payment_fees_pct: String(editingPayment.payment_fees_pct ?? ""),
        payment_status: editingPayment.payment_status ?? "pendente",
        commission_paid_to_partner: editingPayment.commission_paid_to_partner ?? false,
      });
    } else {
      setForm({ ...defaultForm, sale_date: new Date().toISOString().split("T")[0] });
    }
  }, [editingPayment, open]);

  const budgetNum = parseFloat(form.budget_total) || 0;
  const initialNum = parseFloat(form.initial_payment) || 0;
  const commRate = parseFloat(form.commission_rate) || 30;
  const autoRemaining = Math.max(0, budgetNum - initialNum);
  const autoCommission = form.has_commission ? budgetNum * (commRate / 100) : 0;
  const feesPct = parseFloat(form.payment_fees_pct) || 0;
  const feesAmount = budgetNum * (feesPct / 100);
  const freelancerCost = parseFloat(form.freelancer_cost) || 0;
  const otherCosts = parseFloat(form.other_costs) || 0;
  const totalVariableCosts = autoCommission + feesAmount + freelancerCost + otherCosts;
  const contributionMargin = budgetNum - totalVariableCosts;

  const handleServiceChange = (serviceId: string) => {
    setForm(prev => ({ ...prev, service_price_id: serviceId }));
    const sp = servicePrices.find(s => s.id === serviceId);
    if (sp) {
      setForm(prev => ({ ...prev, budget_total: String(sp.current_price) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      project_id: form.project_id,
      service_price_id: form.service_price_id || null,
      budget_total: budgetNum,
      initial_payment: initialNum,
      initial_payment_date: form.initial_payment_date || null,
      remaining_amount: autoRemaining,
      installments_total: parseInt(form.installments_total) || 1,
      installments_paid: parseInt(form.installments_paid) || 0,
      next_payment_date: form.next_payment_date || null,
      notes: form.notes || null,
      has_commission: form.has_commission,
      commission_rate: form.has_commission ? commRate : 0,
      commission_amount: autoCommission,
      sale_date: form.sale_date || null,
      payment_method: form.payment_method,
      sales_rep: form.sales_rep,
      freelancer_cost: freelancerCost,
      other_costs: otherCosts,
      payment_fees_pct: feesPct,
      payment_fees_amount: feesAmount,
      payment_status: form.payment_status,
      commission_paid_to_partner: form.commission_paid_to_partner,
      commission_paid_date: form.commission_paid_to_partner ? new Date().toISOString().split("T")[0] : null,
    };

    if (editingPayment) {
      const { error } = await supabase.from("payments").update(payload).eq("id", editingPayment.id);
      if (error) toast.error("Erro ao atualizar");
      else { toast.success("Registro atualizado!"); onOpenChange(false); onSaved(); }
    } else {
      const { error } = await supabase.from("payments").insert(payload);
      if (error) toast.error("Erro ao salvar");
      else { toast.success("Venda registrada!"); onOpenChange(false); onSaved(); }
    }
    setLoading(false);
  };

  const groupedPrices = servicePrices.reduce<Record<string, ServicePrice[]>>((acc, sp) => {
    if (!acc[sp.category]) acc[sp.category] = [];
    acc[sp.category].push(sp);
    return acc;
  }, {});

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-display)" }}>
            {editingPayment ? "Editar Registro" : "Novo Registro de Venda"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Date & Project */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Data da Venda</label>
              <Input type="date" value={form.sale_date} onChange={e => setForm({ ...form, sale_date: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Projeto *</label>
              <Select value={form.project_id} onValueChange={v => setForm({ ...form, project_id: v })}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {projects.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Serviço (preenche valor automaticamente)</label>
            <Select value={form.service_price_id} onValueChange={handleServiceChange}>
              <SelectTrigger><SelectValue placeholder="Selecione um serviço" /></SelectTrigger>
              <SelectContent>
                {Object.entries(groupedPrices).map(([cat, items]) => (
                  <div key={cat}>
                    <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{cat}</div>
                    {items.map(sp => (
                      <SelectItem key={sp.id} value={sp.id}>
                        {sp.name} — {formatCurrency(Number(sp.current_price))}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Value & Payment */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Valor Fechado *</label>
              <Input type="number" step="0.01" value={form.budget_total} onChange={e => setForm({ ...form, budget_total: e.target.value })} required placeholder="0,00" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Forma de Pgto</label>
              <Select value={form.payment_method} onValueChange={v => setForm({ ...form, payment_method: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Entry & Remaining */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Pagamento Inicial</label>
              <Input type="number" step="0.01" value={form.initial_payment} onChange={e => setForm({ ...form, initial_payment: e.target.value })} placeholder="0,00" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Restante</label>
              <Input type="number" value={autoRemaining.toFixed(2)} readOnly className="bg-muted" />
            </div>
          </div>

          {/* Installments */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Parcelas</label>
              <Input type="number" min="1" value={form.installments_total} onChange={e => setForm({ ...form, installments_total: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Pagas</label>
              <Input type="number" min="0" value={form.installments_paid} onChange={e => setForm({ ...form, installments_paid: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Próx. Pgto</label>
              <Input type="date" value={form.next_payment_date} onChange={e => setForm({ ...form, next_payment_date: e.target.value })} />
            </div>
          </div>

          {/* Sales Rep & Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Responsável Comercial</label>
              <Input value={form.sales_rep} onChange={e => setForm({ ...form, sales_rep: e.target.value })} placeholder="Nome do vendedor" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Status Pagamento</label>
              <Select value={form.payment_status} onValueChange={v => setForm({ ...form, payment_status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PAYMENT_STATUSES.map(s => <SelectItem key={s} value={s}>{statusLabels[s]}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Commission toggle */}
          <div className="border border-border rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-rose-400" />
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Comissão Vendedor</label>
              </div>
              <Switch checked={form.has_commission} onCheckedChange={c => setForm({ ...form, has_commission: c })} />
            </div>
            {form.has_commission && (
              <div className="space-y-2 pt-1 border-t border-border">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-muted-foreground">Taxa:</label>
                  <Input type="number" step="0.5" value={form.commission_rate} onChange={e => setForm({ ...form, commission_rate: e.target.value })} className="w-20 h-7 text-xs text-right" />
                  <span className="text-xs text-muted-foreground">%</span>
                  {budgetNum > 0 && <span className="text-sm font-semibold text-rose-400 ml-auto">{formatCurrency(autoCommission)}</span>}
                </div>
              </div>
            )}
          </div>

          {/* Commission paid to partner toggle */}
          {form.has_commission && (
            <div className="flex items-center justify-between border border-border rounded-lg p-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-400" />
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Comissão paga ao parceiro</label>
              </div>
              <Switch checked={form.commission_paid_to_partner} onCheckedChange={c => setForm({ ...form, commission_paid_to_partner: c })} />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Taxas Pgto (%)</label>
              <Input type="number" step="0.1" value={form.payment_fees_pct} onChange={e => setForm({ ...form, payment_fees_pct: e.target.value })} placeholder="0" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Freelancer (R$)</label>
              <Input type="number" step="0.01" value={form.freelancer_cost} onChange={e => setForm({ ...form, freelancer_cost: e.target.value })} placeholder="0,00" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Outros Custos (R$)</label>
            <Input type="number" step="0.01" value={form.other_costs} onChange={e => setForm({ ...form, other_costs: e.target.value })} placeholder="0,00" />
          </div>

          {/* Summary */}
          {budgetNum > 0 && (
            <div className="border border-border rounded-lg p-3 space-y-1.5 bg-muted/30">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Custo de venda total</span>
                <span className="font-semibold text-rose-400">{formatCurrency(totalVariableCosts)}</span>
              </div>
              <div className="flex justify-between text-xs border-t border-border pt-1.5">
                <span className="text-muted-foreground">Margem de contribuição</span>
                <span className={`font-semibold ${contributionMargin >= 0 ? "text-emerald-400" : "text-destructive"}`}>
                  {formatCurrency(contributionMargin)}
                </span>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Observações</label>
            <Textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2} />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={loading || !form.project_id}>
              {loading ? "Salvando..." : editingPayment ? "Salvar Alterações" : "Registrar Venda"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SaleFormDialog;
