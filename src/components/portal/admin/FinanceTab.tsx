import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DollarSign, Plus, Calendar, CreditCard, TrendingUp, Trash2, Pencil, Percent, BarChart3, Filter, Info } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import FixedCostsSection from "./finance/FixedCostsSection";
import ServicePricesSection from "./finance/ServicePricesSection";
import MonthlyGoalsSection from "./finance/MonthlyGoalsSection";
import SaleFormDialog from "./finance/SaleFormDialog";
import { Payment, FixedCost, ServicePrice, MonthlyGoal, formatCurrency, statusLabels } from "./finance/types";

const FinanceTab = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [fixedCosts, setFixedCosts] = useState<FixedCost[]>([]);
  const [servicePrices, setServicePrices] = useState<ServicePrice[]>([]);
  const [monthlyGoals, setMonthlyGoals] = useState<MonthlyGoal[]>([]);
  const [open, setOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Filters
  const now = new Date();
  const [filterMonth, setFilterMonth] = useState(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`);
  const [filterService, setFilterService] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchAll = () => {
    fetchPayments(); fetchFixedCosts(); fetchServicePrices(); fetchMonthlyGoals();
  };

  const fetchPayments = async () => {
    const { data } = await supabase.from("payments").select("*, projects(name, type)").order("sale_date", { ascending: false });
    if (data) setPayments(data as any);
  };
  const fetchFixedCosts = async () => {
    const { data } = await supabase.from("fixed_costs").select("*").order("sort_order");
    if (data) setFixedCosts(data as any);
  };
  const fetchServicePrices = async () => {
    const { data } = await supabase.from("service_prices").select("*").order("sort_order");
    if (data) setServicePrices(data as any);
  };
  const fetchMonthlyGoals = async () => {
    const { data } = await supabase.from("monthly_goals").select("*");
    if (data) setMonthlyGoals(data as any);
  };

  useEffect(() => { fetchAll(); }, []);

  // Filtered payments for the selected month
  const filteredPayments = useMemo(() => {
    return payments.filter(p => {
      const saleDate = p.sale_date || p.created_at;
      const monthMatch = filterMonth === "all" || saleDate?.startsWith(filterMonth);
      const serviceMatch = filterService === "all" || (p.projects?.type === filterService);
      const statusMatch = filterStatus === "all" || p.payment_status === filterStatus;
      return monthMatch && serviceMatch && statusMatch;
    });
  }, [payments, filterMonth, filterService, filterStatus]);

  // Monthly KPIs
  const monthPayments = useMemo(() => {
    return payments.filter(p => {
      const saleDate = p.sale_date || p.created_at;
      return saleDate?.startsWith(filterMonth);
    });
  }, [payments, filterMonth]);

  const currentGoal = monthlyGoals.find(g => g.month === filterMonth) || null;
  const totalFixedCosts = fixedCosts.reduce((s, c) => s + Number(c.value), 0);
  const taxRate = currentGoal ? Number(currentGoal.tax_rate) : 0;

  const kpi = useMemo(() => {
    const revenue = monthPayments.reduce((s, p) => s + Number(p.budget_total), 0);
    const salesCosts = monthPayments.reduce((s, p) => s + Number(p.commission_amount || 0) + Number(p.payment_fees_amount || 0) + Number(p.freelancer_cost || 0) + Number(p.other_costs || 0), 0);
    const contributionMargin = revenue - salesCosts;
    const operatingProfit = contributionMargin - totalFixedCosts;
    const taxAmount = operatingProfit > 0 ? operatingProfit * (taxRate / 100) : 0;
    const netProfit = operatingProfit - taxAmount;
    const commissionPct = revenue > 0 ? (salesCosts / revenue) * 100 : 0;

    // Ticket médio por tipo
    const byType: Record<string, { revenue: number; count: number }> = {};
    monthPayments.forEach(p => {
      const type = p.projects?.type || "Outro";
      if (!byType[type]) byType[type] = { revenue: 0, count: 0 };
      byType[type].revenue += Number(p.budget_total);
      byType[type].count += 1;
    });
    const avgTicket = Object.entries(byType).map(([type, d]) => ({ type, avg: d.revenue / d.count }));

    return { revenue, salesCosts, contributionMargin, operatingProfit, netProfit, commissionPct, avgTicket };
  }, [monthPayments, totalFixedCosts, taxRate]);

  // Filtered totals
  const filteredTotals = useMemo(() => {
    const rev = filteredPayments.reduce((s, p) => s + Number(p.budget_total), 0);
    const costs = filteredPayments.reduce((s, p) => s + Number(p.commission_amount || 0) + Number(p.payment_fees_amount || 0) + Number(p.freelancer_cost || 0) + Number(p.other_costs || 0), 0);
    return { revenue: rev, costs, profit: rev - costs - totalFixedCosts };
  }, [filteredPayments, totalFixedCosts]);

  // Available months
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    payments.forEach(p => {
      const d = p.sale_date || p.created_at;
      if (d) months.add(d.substring(0, 7));
    });
    // Always include current month
    const cur = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    months.add(cur);
    return [...months].sort().reverse();
  }, [payments]);

  const serviceTypes = useMemo(() => {
    const types = new Set<string>();
    payments.forEach(p => { if (p.projects?.type) types.add(p.projects.type); });
    return [...types].sort();
  }, [payments]);

  const toggleSelect = (id: string) => setSelectedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleSelectAll = () => { if (selectedIds.size === filteredPayments.length) setSelectedIds(new Set()); else setSelectedIds(new Set(filteredPayments.map(p => p.id))); };

  const handleDelete = async () => {
    const ids = Array.from(selectedIds);
    const { error } = await supabase.from("payments").delete().in("id", ids);
    if (error) toast.error("Erro ao excluir");
    else { toast.success(`${ids.length} excluído(s)`); setSelectedIds(new Set()); fetchPayments(); }
  };

  const openEdit = (p: Payment) => { setEditingPayment(p); setOpen(true); };
  const openCreate = () => { setEditingPayment(null); setOpen(true); };

  const monthLabel = (m: string) => {
    const [y, mo] = m.split("-");
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    return `${months[parseInt(mo) - 1]} ${y}`;
  };

  return (
    <div className="space-y-6">
      {/* BLOCO 5 — Monthly Indicators */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Indicadores — {monthLabel(filterMonth)}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { label: "Faturamento Bruto", value: kpi.revenue, color: "text-primary" },
            { label: "Custos de Venda", value: kpi.salesCosts, color: "text-rose-400" },
            { label: "Margem Contribuição", value: kpi.contributionMargin, color: kpi.contributionMargin >= 0 ? "text-emerald-400" : "text-destructive" },
            { label: "Custos Fixos", value: totalFixedCosts, color: "text-amber-400" },
            { label: "Lucro Operacional", value: kpi.operatingProfit, color: kpi.operatingProfit >= 0 ? "text-emerald-400" : "text-destructive" },
            { label: `Lucro Líquido (${taxRate}% imp.)`, value: kpi.netProfit, color: kpi.netProfit >= 0 ? "text-emerald-400" : "text-destructive" },
            { label: "% Custos s/ Fat.", value: null, color: "text-muted-foreground", pct: kpi.commissionPct },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-4 space-y-1"
            >
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{card.label}</span>
              <p className={`text-lg font-bold ${card.color}`} style={{ fontFamily: "var(--font-display)" }}>
                {card.pct !== undefined ? `${card.pct.toFixed(1)}%` : formatCurrency(card.value!)}
              </p>
            </motion.div>
          ))}
        </div>
        {/* Ticket médio */}
        {kpi.avgTicket.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {kpi.avgTicket.map(t => (
              <div key={t.type} className="bg-card border border-border rounded-lg px-3 py-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">Ticket Médio — {t.type}</span>
                <span className="text-sm font-semibold text-foreground">{formatCurrency(t.avg)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BLOCO 6 — Goals */}
      <MonthlyGoalsSection
        month={filterMonth}
        revenueAchieved={kpi.revenue}
        profitAchieved={kpi.netProfit}
        goal={currentGoal}
        onRefresh={fetchMonthlyGoals}
      />

      {/* BLOCO 1 — Fixed Costs */}
      <FixedCostsSection costs={fixedCosts} onRefresh={fetchFixedCosts} />

      {/* BLOCO 3 — Service Prices */}
      <ServicePricesSection prices={servicePrices} onRefresh={fetchServicePrices} />

      {/* BLOCO 7 — Filters */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Filtros e Histórico</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          <Select value={filterMonth} onValueChange={setFilterMonth}>
            <SelectTrigger className="w-36 h-8 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os meses</SelectItem>
              {availableMonths.map(m => <SelectItem key={m} value={m}>{monthLabel(m)}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterService} onValueChange={setFilterService}>
            <SelectTrigger className="w-44 h-8 text-xs"><SelectValue placeholder="Tipo de serviço" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os serviços</SelectItem>
              {serviceTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 h-8 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="parcialmente_pago">Parcialmente pago</SelectItem>
              <SelectItem value="pago">Pago</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Filtered totals */}
        <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-border text-xs">
          <span className="text-muted-foreground">Faturamento: <strong className="text-foreground">{formatCurrency(filteredTotals.revenue)}</strong></span>
          <span className="text-muted-foreground">Custos: <strong className="text-rose-400">{formatCurrency(filteredTotals.costs)}</strong></span>
          <span className="text-muted-foreground">Lucro: <strong className={filteredTotals.profit >= 0 ? "text-emerald-400" : "text-destructive"}>{formatCurrency(filteredTotals.profit)}</strong></span>
        </div>
      </div>

      {/* Add + Delete buttons */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="gap-2">
                  <Trash2 className="h-4 w-4" /> Excluir ({selectedIds.size})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir registros?</AlertDialogTitle>
                  <AlertDialogDescription>{selectedIds.size} registro(s) serão removidos permanentemente.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        <Button className="gap-2" onClick={openCreate}><Plus className="h-4 w-4" /> Nova Venda</Button>
      </div>

      {/* BLOCO 4 + 7 — Payment list */}
      <div className="grid gap-3">
        {filteredPayments.length > 0 && (
          <div className="flex items-center gap-2 px-1">
            <Checkbox checked={selectedIds.size === filteredPayments.length && filteredPayments.length > 0} onCheckedChange={toggleSelectAll} />
            <span className="text-xs text-muted-foreground">Selecionar todos ({filteredPayments.length})</span>
          </div>
        )}
        {filteredPayments.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground text-sm">Nenhum registro encontrado.</p>
          </div>
        ) : (
          filteredPayments.map(payment => {
            const remaining = Number(payment.installments_total) - Number(payment.installments_paid);
            const hasComm = payment.has_commission && Number(payment.commission_amount) > 0;
            const totalVarCosts = Number(payment.commission_amount || 0) + Number(payment.payment_fees_amount || 0) + Number(payment.freelancer_cost || 0) + Number(payment.other_costs || 0);
            const margin = Number(payment.budget_total) - totalVarCosts;
            const statusColor = payment.payment_status === "pago" ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" : payment.payment_status === "parcialmente_pago" ? "text-amber-400 bg-amber-400/10 border-amber-400/20" : "text-muted-foreground bg-muted/30 border-border";

            return (
              <div key={payment.id} className={`bg-card border rounded-xl p-5 space-y-3 ${selectedIds.has(payment.id) ? "border-primary/50" : "border-border"}`}>
                <div className="flex items-start gap-3">
                  <Checkbox checked={selectedIds.has(payment.id)} onCheckedChange={() => toggleSelect(payment.id)} className="mt-1" />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{payment.projects?.name || "—"}</h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${statusColor}`}>
                            {statusLabels[payment.payment_status] || payment.payment_status}
                          </span>
                          {payment.payment_method && <span className="text-[10px] text-muted-foreground">{payment.payment_method}</span>}
                          {payment.sale_date && (
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-2.5 w-2.5" />
                              {new Date(payment.sale_date).toLocaleDateString("pt-BR")}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="text-right">
                          <p className="text-lg font-semibold text-primary" style={{ fontFamily: "var(--font-display)" }}>{formatCurrency(Number(payment.budget_total))}</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">valor fechado</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEdit(payment)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Entrada</p>
                        <p className="text-sm text-foreground font-medium">{formatCurrency(Number(payment.initial_payment))}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Parcelas</p>
                        <p className="text-sm text-foreground font-medium">{payment.installments_paid}/{payment.installments_total}</p>
                        <p className="text-[10px] text-muted-foreground">{remaining} restante(s)</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">A Receber</p>
                        <p className="text-sm font-medium text-amber-400">{formatCurrency(Number(payment.remaining_amount))}</p>
                      </div>
                    </div>

                    {/* Variable costs breakdown */}
                    {totalVarCosts > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border">
                        {hasComm && (
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Comissão ({payment.commission_rate}%)</p>
                            <p className="text-sm font-medium text-rose-400">{formatCurrency(Number(payment.commission_amount))}</p>
                          </div>
                        )}
                        {Number(payment.payment_fees_amount) > 0 && (
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Taxas ({payment.payment_fees_pct}%)</p>
                            <p className="text-sm font-medium text-rose-400">{formatCurrency(Number(payment.payment_fees_amount))}</p>
                          </div>
                        )}
                        {Number(payment.freelancer_cost) > 0 && (
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Freelancer</p>
                            <p className="text-sm font-medium text-rose-400">{formatCurrency(Number(payment.freelancer_cost))}</p>
                          </div>
                        )}
                        {Number(payment.other_costs) > 0 && (
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Outros</p>
                            <p className="text-sm font-medium text-rose-400">{formatCurrency(Number(payment.other_costs))}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Margin */}
                    {totalVarCosts > 0 && (
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Margem de Contribuição</span>
                        <span className={`text-sm font-bold ${margin >= 0 ? "text-emerald-400" : "text-destructive"}`}>{formatCurrency(margin)}</span>
                      </div>
                    )}

                    {payment.sales_rep && (
                      <p className="text-[10px] text-muted-foreground pt-1">Vendedor: {payment.sales_rep}</p>
                    )}
                    {payment.notes && <p className="text-xs text-muted-foreground border-t border-border pt-2">{payment.notes}</p>}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Sale form dialog */}
      <SaleFormDialog
        open={open}
        onOpenChange={(o) => { if (!o) setEditingPayment(null); setOpen(o); }}
        editingPayment={editingPayment}
        servicePrices={servicePrices}
        onSaved={fetchPayments}
      />
    </div>
  );
};

export default FinanceTab;
