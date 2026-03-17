import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { DollarSign, Plus, Calendar, CreditCard, TrendingUp, Trash2, Pencil, Percent } from "lucide-react";
import { toast } from "sonner";

interface Project { id: string; name: string; }
interface Payment {
  id: string;
  project_id: string;
  budget_total: number;
  initial_payment: number;
  initial_payment_date: string | null;
  remaining_amount: number;
  installments_total: number;
  installments_paid: number;
  next_payment_date: string | null;
  notes: string | null;
  has_commission: boolean;
  commission_rate: number;
  commission_amount: number;
  projects?: { name: string };
}

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

const COMMISSION_RATE = 30;

const defaultForm = {
  project_id: "",
  budget_total: "",
  initial_payment: "",
  initial_payment_date: "",
  remaining_amount: "",
  installments_total: "1",
  installments_paid: "0",
  next_payment_date: "",
  notes: "",
  has_commission: false,
};

const FinanceTab = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [form, setForm] = useState({ ...defaultForm });

  const fetchPayments = async () => {
    const { data } = await supabase
      .from("payments")
      .select("*, projects(name)")
      .order("created_at", { ascending: false });
    if (data) setPayments(data as any);
  };

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("id, name");
    if (data) setProjects(data);
  };

  useEffect(() => { fetchPayments(); fetchProjects(); }, []);

  const budgetNum = parseFloat(form.budget_total) || 0;
  const initialNum = parseFloat(form.initial_payment) || 0;
  const autoRemaining = Math.max(0, budgetNum - initialNum);
  const autoCommission = form.has_commission ? budgetNum * (COMMISSION_RATE / 100) : 0;
  const netAfterCommission = Math.max(0, budgetNum - autoCommission);

  const openCreateDialog = () => {
    setEditingPayment(null);
    setForm({ ...defaultForm });
    setOpen(true);
  };

  const openEditDialog = (payment: Payment) => {
    setEditingPayment(payment);
    setForm({
      project_id: payment.project_id,
      budget_total: String(payment.budget_total),
      initial_payment: String(payment.initial_payment ?? ""),
      initial_payment_date: payment.initial_payment_date ?? "",
      remaining_amount: String(payment.remaining_amount ?? ""),
      installments_total: String(payment.installments_total ?? "1"),
      installments_paid: String(payment.installments_paid ?? "0"),
      next_payment_date: payment.next_payment_date ?? "",
      notes: payment.notes ?? "",
      has_commission: payment.has_commission ?? false,
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const commissionAmount = form.has_commission ? budgetNum * (COMMISSION_RATE / 100) : 0;
    const payload = {
      project_id: form.project_id,
      budget_total: budgetNum,
      initial_payment: initialNum,
      initial_payment_date: form.initial_payment_date || null,
      remaining_amount: autoRemaining,
      installments_total: parseInt(form.installments_total) || 1,
      installments_paid: parseInt(form.installments_paid) || 0,
      next_payment_date: form.next_payment_date || null,
      notes: form.notes || null,
      has_commission: form.has_commission,
      commission_rate: form.has_commission ? COMMISSION_RATE : 0,
      commission_amount: commissionAmount,
    };

    if (editingPayment) {
      const { error } = await supabase.from("payments").update(payload).eq("id", editingPayment.id);
      if (error) toast.error("Erro ao atualizar");
      else { toast.success("Registro atualizado!"); setOpen(false); setEditingPayment(null); fetchPayments(); }
    } else {
      const { error } = await supabase.from("payments").insert(payload);
      if (error) toast.error("Erro ao salvar dados financeiros");
      else { toast.success("Dados financeiros salvos!"); setOpen(false); fetchPayments(); }
    }
    setForm({ ...defaultForm });
    setLoading(false);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === payments.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(payments.map((p) => p.id)));
    }
  };

  const handleDeletePayments = async () => {
    const ids = Array.from(selectedIds);
    const { error } = await supabase.from("payments").delete().in("id", ids);
    if (error) {
      toast.error("Erro ao excluir registros financeiros");
    } else {
      toast.success(`${ids.length} registro(s) excluído(s)`);
      setSelectedIds(new Set());
      fetchPayments();
    }
  };

  const totalBudget = payments.reduce((acc, p) => acc + Number(p.budget_total), 0);
  const totalReceived = payments.reduce((acc, p) => acc + Number(p.initial_payment), 0);
  const totalRemaining = payments.reduce((acc, p) => acc + Number(p.remaining_amount), 0);
  const totalCommission = payments.reduce((acc, p) => acc + Number(p.commission_amount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Total Orçado</span>
          </div>
          <p className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            {formatCurrency(totalBudget)}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-emerald-400" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Recebido</span>
          </div>
          <p className="text-2xl font-semibold text-emerald-400" style={{ fontFamily: "var(--font-display)" }}>
            {formatCurrency(totalReceived)}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-amber-400" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">A Receber</span>
          </div>
          <p className="text-2xl font-semibold text-amber-400" style={{ fontFamily: "var(--font-display)" }}>
            {formatCurrency(totalRemaining)}
          </p>
        </div>
        {totalCommission > 0 && (
          <div className="bg-card border border-border rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-rose-400" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Comissões</span>
            </div>
            <p className="text-2xl font-semibold text-rose-400" style={{ fontFamily: "var(--font-display)" }}>
              {formatCurrency(totalCommission)}
            </p>
          </div>
        )}
      </div>

      {/* Add button + delete */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
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
                  <AlertDialogTitle>Excluir registros financeiros?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação não pode ser desfeita. {selectedIds.size} registro(s) financeiro(s) serão removidos.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeletePayments} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        <Dialog open={open} onOpenChange={(o) => { if (!o) setEditingPayment(null); setOpen(o); }}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={openCreateDialog}><Plus className="h-4 w-4" /> Novo Registro</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle style={{ fontFamily: "var(--font-display)" }}>{editingPayment ? "Editar Registro" : "Dados Financeiros"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Projeto *</label>
                <Select value={form.project_id} onValueChange={(v) => setForm({ ...form, project_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {projects.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Valor Total *</label>
                  <Input type="number" step="0.01" value={form.budget_total} onChange={(e) => setForm({ ...form, budget_total: e.target.value })} required placeholder="0,00" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Pagamento Inicial</label>
                  <Input type="number" step="0.01" value={form.initial_payment} onChange={(e) => setForm({ ...form, initial_payment: e.target.value })} placeholder="0,00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Data Pgto Inicial</label>
                  <Input type="date" value={form.initial_payment_date} onChange={(e) => setForm({ ...form, initial_payment_date: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Restante</label>
                  <Input type="number" value={autoRemaining.toFixed(2)} readOnly className="bg-muted" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Parcelas</label>
                  <Input type="number" min="1" value={form.installments_total} onChange={(e) => setForm({ ...form, installments_total: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Pagas</label>
                  <Input type="number" min="0" value={form.installments_paid} onChange={(e) => setForm({ ...form, installments_paid: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Próx. Pgto</label>
                  <Input type="date" value={form.next_payment_date} onChange={(e) => setForm({ ...form, next_payment_date: e.target.value })} />
                </div>
              </div>

              {/* Commission toggle */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-rose-400" />
                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Comissão Vendedor (30%)</label>
                  </div>
                  <Switch
                    checked={form.has_commission}
                    onCheckedChange={(checked) => setForm({ ...form, has_commission: checked })}
                  />
                </div>
                {form.has_commission && budgetNum > 0 && (
                  <div className="flex items-center justify-between pt-1 border-t border-border">
                    <span className="text-xs text-muted-foreground">Comissão calculada:</span>
                    <span className="text-sm font-semibold text-rose-400">{formatCurrency(autoCommission)}</span>
                  </div>
                )}
                {form.has_commission && budgetNum > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Valor líquido (após comissão):</span>
                    <span className="text-sm font-semibold text-foreground">{formatCurrency(netAfterCommission)}</span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Observações</label>
                <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button type="submit" disabled={loading || !form.project_id}>
                  {loading ? "Salvando..." : editingPayment ? "Salvar Alterações" : "Salvar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Payment list */}
      <div className="grid gap-3">
        {payments.length > 0 && (
          <div className="flex items-center gap-2 px-1">
            <Checkbox
              checked={selectedIds.size === payments.length && payments.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <span className="text-xs text-muted-foreground">Selecionar todos</span>
          </div>
        )}
        {payments.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground text-sm">Nenhum registro financeiro.</p>
          </div>
        ) : (
          payments.map((payment) => {
            const remaining = Number(payment.installments_total) - Number(payment.installments_paid);
            const hasComm = payment.has_commission && Number(payment.commission_amount) > 0;
            return (
              <div
                key={payment.id}
                className={`bg-card border rounded-xl p-5 space-y-3 ${
                  selectedIds.has(payment.id) ? "border-primary/50" : "border-border"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedIds.has(payment.id)}
                    onCheckedChange={() => toggleSelect(payment.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{(payment as any).projects?.name || "—"}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Orçamento: {formatCurrency(Number(payment.budget_total))}
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="text-right">
                          <p className="text-lg font-semibold text-primary" style={{ fontFamily: "var(--font-display)" }}>
                            {formatCurrency(Number(payment.remaining_amount))}
                          </p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">a receber</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEditDialog(payment)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Entrada</p>
                        <p className="text-sm text-foreground font-medium">{formatCurrency(Number(payment.initial_payment))}</p>
                        {payment.initial_payment_date && (
                          <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Calendar className="h-2.5 w-2.5" />
                            {new Date(payment.initial_payment_date).toLocaleDateString("pt-BR")}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Parcelas</p>
                        <p className="text-sm text-foreground font-medium">
                          {payment.installments_paid}/{payment.installments_total}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{remaining} restante(s)</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Próx. Pgto</p>
                        <p className="text-sm text-foreground font-medium">
                          {payment.next_payment_date
                            ? new Date(payment.next_payment_date).toLocaleDateString("pt-BR")
                            : "—"}
                        </p>
                      </div>
                    </div>
                    {/* Commission info */}
                    {hasComm && (
                      <div className="flex items-center gap-3 pt-2 border-t border-border">
                        <Percent className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                        <div className="flex-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Comissão ({payment.commission_rate}%)</p>
                            <p className="text-sm font-medium text-rose-400">{formatCurrency(Number(payment.commission_amount))}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Líquido</p>
                            <p className="text-sm font-medium text-foreground">{formatCurrency(Number(payment.budget_total) - Number(payment.commission_amount))}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {payment.notes && (
                      <p className="text-xs text-muted-foreground border-t border-border pt-2">{payment.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FinanceTab;
