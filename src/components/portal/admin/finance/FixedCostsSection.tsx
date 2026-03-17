import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Settings2 } from "lucide-react";
import { toast } from "sonner";
import { FixedCost, formatCurrency } from "./types";

interface Props {
  costs: FixedCost[];
  onRefresh: () => void;
}

const FixedCostsSection = ({ costs, onRefresh }: Props) => {
  const [editing, setEditing] = useState<Record<string, { name: string; value: string }>>({});
  const [newItem, setNewItem] = useState({ name: "", value: "" });
  const [showAdd, setShowAdd] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const total = costs.reduce((s, c) => s + Number(c.value), 0);

  const startEdit = (c: FixedCost) => {
    setEditing(prev => ({ ...prev, [c.id]: { name: c.name, value: String(c.value) } }));
  };

  const saveEdit = async (id: string) => {
    const e = editing[id];
    if (!e) return;
    const { error } = await supabase.from("fixed_costs").update({ name: e.name, value: parseFloat(e.value) || 0 }).eq("id", id);
    if (error) toast.error("Erro ao salvar");
    else { toast.success("Atualizado!"); setEditing(prev => { const n = { ...prev }; delete n[id]; return n; }); onRefresh(); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("fixed_costs").delete().eq("id", id);
    if (error) toast.error("Erro ao excluir");
    else { toast.success("Removido!"); onRefresh(); }
  };

  const handleAdd = async () => {
    if (!newItem.name.trim()) return;
    const maxOrder = costs.length > 0 ? Math.max(...costs.map(c => c.sort_order)) : 0;
    const { error } = await supabase.from("fixed_costs").insert({ name: newItem.name, value: parseFloat(newItem.value) || 0, sort_order: maxOrder + 1 });
    if (error) toast.error("Erro ao adicionar");
    else { toast.success("Adicionado!"); setNewItem({ name: "", value: "" }); setShowAdd(false); onRefresh(); }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Settings2 className="h-4 w-4 text-primary" />
          <div className="text-left">
            <h3 className="text-sm font-semibold text-foreground">Custos Fixos Mensais</h3>
            <p className="text-xs text-muted-foreground">{costs.length} itens</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            {formatCurrency(total)}
          </p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">/mês</p>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border px-5 pb-5 space-y-2 pt-3">
          {costs.map(c => {
            const e = editing[c.id];
            return (
              <div key={c.id} className="flex items-center gap-2 group">
                {e ? (
                  <>
                    <Input value={e.name} onChange={ev => setEditing(prev => ({ ...prev, [c.id]: { ...prev[c.id], name: ev.target.value } }))} className="flex-1 h-8 text-sm" />
                    <Input type="number" step="0.01" value={e.value} onChange={ev => setEditing(prev => ({ ...prev, [c.id]: { ...prev[c.id], value: ev.target.value } }))} className="w-28 h-8 text-sm" />
                    <Button size="sm" variant="ghost" className="h-8 text-xs" onClick={() => saveEdit(c.id)}>Salvar</Button>
                    <Button size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground" onClick={() => setEditing(prev => { const n = { ...prev }; delete n[c.id]; return n; })}>✕</Button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 text-sm text-foreground">{c.name}</span>
                    <span className="text-sm font-medium text-foreground w-28 text-right">{formatCurrency(Number(c.value))}</span>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary" onClick={() => startEdit(c)}>✎</Button>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive" onClick={() => handleDelete(c.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </>
                )}
              </div>
            );
          })}
          <div className="border-t border-border pt-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Total</span>
            <span className="text-sm font-bold text-primary">{formatCurrency(total)}</span>
          </div>
          {showAdd ? (
            <div className="flex items-center gap-2 pt-2">
              <Input placeholder="Nome do custo" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} className="flex-1 h-8 text-sm" />
              <Input type="number" step="0.01" placeholder="Valor" value={newItem.value} onChange={e => setNewItem({ ...newItem, value: e.target.value })} className="w-28 h-8 text-sm" />
              <Button size="sm" className="h-8" onClick={handleAdd}>Adicionar</Button>
              <Button size="sm" variant="ghost" className="h-8" onClick={() => setShowAdd(false)}>✕</Button>
            </div>
          ) : (
            <Button size="sm" variant="outline" className="gap-1 text-xs mt-2" onClick={() => setShowAdd(true)}>
              <Plus className="h-3 w-3" /> Novo custo fixo
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FixedCostsSection;
