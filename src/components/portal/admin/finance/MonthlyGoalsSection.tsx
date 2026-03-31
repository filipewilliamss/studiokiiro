import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Target, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { MonthlyGoal, formatCurrency } from "./types";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface Props {
  month: string; // YYYY-MM
  revenueAchieved: number;
  profitAchieved: number;
  goal: MonthlyGoal | null;
  onRefresh: () => void;
}

const MonthlyGoalsSection = ({ month, revenueAchieved, profitAchieved, goal, onRefresh }: Props) => {
  const [revenueGoal, setRevenueGoal] = useState(String(goal?.revenue_goal || 8000));
  const [profitGoal, setProfitGoal] = useState(String(goal?.profit_goal || 3000));
  const [taxRate, setTaxRate] = useState(String(goal?.tax_rate || 0));
  const [serviceGoals, setServiceGoals] = useState<{ service_type: string; goal_amount: number }[]>([]);
  const [partnerGoals, setPartnerGoals] = useState<{ partner_id: string; goal_amount: number; partner_name?: string }[]>([]);
  const [partners, setPartners] = useState<{ id: string; full_name: string }[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchGoals();
    fetchPartners();
  }, [month]);

  const fetchGoals = async () => {
    const [serviceRes, partnerRes] = await Promise.all([
      supabase.from("service_goals").select("*").eq("month", month),
      supabase.from("partner_goals").select("*, profiles!partner_goals_partner_id_fkey(full_name)").eq("month", month)
    ]);
    if (serviceRes.data) setServiceGoals(serviceRes.data as any);
    if (partnerRes.data) setPartnerGoals(partnerRes.data.map((g: any) => ({ ...g, partner_name: g.profiles?.full_name })) as any);
  };

  const fetchPartners = async () => {
    const { data } = await supabase.from("profiles").select("id, full_name").eq("client_type", "parceiro");
    if (data) setPartners(data);
  };

  useEffect(() => {
    setRevenueGoal(String(goal?.revenue_goal || 8000));
    setProfitGoal(String(goal?.profit_goal || 3000));
    setTaxRate(String(goal?.tax_rate || 0));
  }, [goal]);

  const saveGoals = async () => {
    setSaving(true);
    const payload = {
      month,
      revenue_goal: parseFloat(revenueGoal) || 0,
      profit_goal: parseFloat(profitGoal) || 0,
      tax_rate: parseFloat(taxRate) || 0,
    };
    if (goal) {
      await supabase.from("monthly_goals").update(payload).eq("id", goal.id);
    } else {
      await supabase.from("monthly_goals").insert(payload);
    }
    // Save service goals
    for (const sg of serviceGoals) {
      const { data } = await supabase.from("service_goals").select("id").eq("month", month).eq("service_type", sg.service_type).maybeSingle();
      if (data) await supabase.from("service_goals").update({ goal_amount: sg.goal_amount }).eq("id", data.id);
      else await supabase.from("service_goals").insert({ month, service_type: sg.service_type, goal_amount: sg.goal_amount });
    }
    // Save partner goals
    for (const pg of partnerGoals) {
      const { data } = await supabase.from("partner_goals").select("id").eq("month", month).eq("partner_id", pg.partner_id).maybeSingle();
      if (data) await supabase.from("partner_goals").update({ goal_amount: pg.goal_amount }).eq("id", data.id);
      else await supabase.from("partner_goals").insert({ month, partner_id: pg.partner_id, goal_amount: pg.goal_amount });
    }

    toast.success("Metas salvas!");
    setSaving(false);
    onRefresh();
    fetchGoals();
  };

  const revGoalNum = parseFloat(revenueGoal) || 1;
  const profGoalNum = parseFloat(profitGoal) || 1;
  const revPct = Math.min(100, (revenueAchieved / revGoalNum) * 100);
  const profPct = Math.min(100, (profitAchieved / profGoalNum) * 100);
  const revRemaining = Math.max(0, revGoalNum - revenueAchieved);
  const profRemaining = Math.max(0, profGoalNum - profitAchieved);

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Target className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Metas do Mês</h3>
        </div>
        <Button size="sm" variant="outline" className="text-xs h-7" onClick={saveGoals} disabled={saving}>
          {saving ? "Salvando..." : "Salvar Metas"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Revenue Goal */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Meta de Faturamento</label>
            <Input
              type="number" step="100" value={revenueGoal}
              onChange={e => setRevenueGoal(e.target.value)}
              className="w-32 h-7 text-xs text-right"
            />
          </div>
          <div className="space-y-1.5">
            <div className="relative h-3 rounded-full overflow-hidden bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${revPct}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full transition-colors ${revPct >= 100 ? "bg-emerald-500" : "bg-amber-400"}`}
              />
            </div>
            <div className="flex justify-between text-xs">
              <span className={`font-semibold ${revPct >= 100 ? "text-emerald-400" : "text-amber-400"}`}>
                {revPct.toFixed(0)}% da meta
              </span>
              <span className="text-muted-foreground">
                {formatCurrency(revenueAchieved)} / {formatCurrency(revGoalNum)}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">Faltam {formatCurrency(revRemaining)}</p>
          </div>
        </div>

        {/* Profit Goal */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Meta de Lucro Líquido</label>
            <Input
              type="number" step="100" value={profitGoal}
              onChange={e => setProfitGoal(e.target.value)}
              className="w-32 h-7 text-xs text-right"
            />
          </div>
          <div className="space-y-1.5">
            <div className="relative h-3 rounded-full overflow-hidden bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${profPct}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className={`h-full rounded-full transition-colors ${profPct >= 100 ? "bg-emerald-500" : "bg-amber-400"}`}
              />
            </div>
            <div className="flex justify-between text-xs">
              <span className={`font-semibold ${profPct >= 100 ? "text-emerald-400" : "text-amber-400"}`}>
                {profPct.toFixed(0)}% da meta
              </span>
              <span className="text-muted-foreground">
                {formatCurrency(profitAchieved)} / {formatCurrency(profGoalNum)}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">Faltam {formatCurrency(profRemaining)}</p>
          </div>
        </div>
      </div>

      {/* Tax Rate */}
      <div className="flex items-center gap-3 border-t border-border pt-3">
        <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium whitespace-nowrap">% Impostos (p/ lucro líquido)</label>
        <Input type="number" step="0.5" value={taxRate} onChange={e => setTaxRate(e.target.value)} className="w-20 h-7 text-xs text-right" />
        <span className="text-xs text-muted-foreground">%</span>
      </div>

      {/* Service Goals */}
      <div className="space-y-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Metas por Serviço</label>
          <Button variant="ghost" size="sm" className="h-6 text-[10px]" onClick={() => {
            const type = prompt("Tipo de serviço:");
            if (type) setServiceGoals([...serviceGoals, { service_type: type, goal_amount: 0 }]);
          }}>+ Meta de Serviço</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {serviceGoals.map((sg, idx) => (
            <div key={sg.service_type} className="flex items-center justify-between bg-black/20 p-2 rounded-lg border border-border/50">
              <span className="text-[11px] font-medium text-foreground truncate max-w-[150px]">{sg.service_type}</span>
              <Input
                type="number"
                value={sg.goal_amount}
                onChange={e => {
                  const newGoals = [...serviceGoals];
                  newGoals[idx].goal_amount = parseFloat(e.target.value) || 0;
                  setServiceGoals(newGoals);
                }}
                className="w-24 h-7 text-xs text-right"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Partner Goals */}
      <div className="space-y-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Metas por Parceiro</label>
          <Select onValueChange={(v) => {
            const partner = partners.find(p => p.id === v);
            if (partner && !partnerGoals.find(pg => pg.partner_id === v)) {
              setPartnerGoals([...partnerGoals, { partner_id: v, goal_amount: 0, partner_name: partner.full_name }]);
            }
          }}>
            <SelectTrigger className="w-40 h-7 text-[10px]"><SelectValue placeholder="Adicionar Parceiro" /></SelectTrigger>
            <SelectContent>
              {partners.map(p => <SelectItem key={p.id} value={p.id}>{p.full_name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {partnerGoals.map((pg, idx) => (
            <div key={pg.partner_id} className="flex items-center justify-between bg-black/20 p-2 rounded-lg border border-border/50">
              <span className="text-[11px] font-medium text-foreground truncate max-w-[150px]">{pg.partner_name}</span>
              <Input
                type="number"
                value={pg.goal_amount}
                onChange={e => {
                  const newGoals = [...partnerGoals];
                  newGoals[idx].goal_amount = parseFloat(e.target.value) || 0;
                  setPartnerGoals(newGoals);
                }}
                className="w-24 h-7 text-xs text-right"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyGoalsSection;
