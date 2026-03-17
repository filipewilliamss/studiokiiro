import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tag, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ServicePrice, formatCurrency } from "./types";

interface Props {
  prices: ServicePrice[];
  onRefresh: () => void;
}

const ServicePricesSection = ({ prices, onRefresh }: Props) => {
  const [editing, setEditing] = useState<Record<string, { current_price: string; target_price: string }>>({});
  const [expanded, setExpanded] = useState(false);
  const [newItem, setNewItem] = useState({ category: "", name: "", current_price: "", target_price: "" });
  const [showAdd, setShowAdd] = useState(false);

  const categories = [...new Set(prices.map(p => p.category))];

  const startEdit = (p: ServicePrice) => {
    setEditing(prev => ({ ...prev, [p.id]: { current_price: String(p.current_price), target_price: String(p.target_price) } }));
  };

  const saveEdit = async (id: string) => {
    const e = editing[id];
    if (!e) return;
    const { error } = await supabase.from("service_prices").update({
      current_price: parseFloat(e.current_price) || 0,
      target_price: parseFloat(e.target_price) || 0,
    }).eq("id", id);
    if (error) toast.error("Erro ao salvar");
    else { toast.success("Atualizado!"); setEditing(prev => { const n = { ...prev }; delete n[id]; return n; }); onRefresh(); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("service_prices").delete().eq("id", id);
    if (error) toast.error("Erro");
    else { toast.success("Removido!"); onRefresh(); }
  };

  const handleAdd = async () => {
    if (!newItem.name.trim() || !newItem.category.trim()) return;
    const maxOrder = prices.length > 0 ? Math.max(...prices.map(p => p.sort_order)) : 0;
    const { error } = await supabase.from("service_prices").insert({
      category: newItem.category, name: newItem.name,
      current_price: parseFloat(newItem.current_price) || 0,
      target_price: parseFloat(newItem.target_price) || 0,
      sort_order: maxOrder + 1,
    });
    if (error) toast.error("Erro");
    else { toast.success("Adicionado!"); setNewItem({ category: "", name: "", current_price: "", target_price: "" }); setShowAdd(false); onRefresh(); }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Tag className="h-4 w-4 text-primary" />
          <div className="text-left">
            <h3 className="text-sm font-semibold text-foreground">Tabela de Serviços e Preços</h3>
            <p className="text-xs text-muted-foreground">{prices.length} serviços em {categories.length} categorias</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">{expanded ? "Recolher" : "Expandir"}</span>
      </button>

      {expanded && (
        <div className="border-t border-border px-5 pb-5 pt-3 space-y-5">
          {categories.map(cat => (
            <div key={cat} className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">{cat}</h4>
              <div className="space-y-1">
                <div className="grid grid-cols-[1fr_100px_100px_60px] gap-2 text-[10px] uppercase tracking-wider text-muted-foreground px-1">
                  <span>Serviço</span><span className="text-right">Atual</span><span className="text-right">Alvo</span><span />
                </div>
                {prices.filter(p => p.category === cat).map(p => {
                  const e = editing[p.id];
                  return (
                    <div key={p.id} className="grid grid-cols-[1fr_100px_100px_60px] gap-2 items-center group">
                      <span className="text-sm text-foreground truncate">{p.name}</span>
                      {e ? (
                        <>
                          <Input type="number" step="0.01" value={e.current_price} onChange={ev => setEditing(prev => ({ ...prev, [p.id]: { ...prev[p.id], current_price: ev.target.value } }))} className="h-7 text-xs text-right" />
                          <Input type="number" step="0.01" value={e.target_price} onChange={ev => setEditing(prev => ({ ...prev, [p.id]: { ...prev[p.id], target_price: ev.target.value } }))} className="h-7 text-xs text-right" />
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-6 text-[10px] px-1.5" onClick={() => saveEdit(p.id)}>✓</Button>
                            <Button size="sm" variant="ghost" className="h-6 text-[10px] px-1.5" onClick={() => setEditing(prev => { const n = { ...prev }; delete n[p.id]; return n; })}>✕</Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="text-sm text-right font-medium text-foreground">{formatCurrency(Number(p.current_price))}</span>
                          <span className="text-sm text-right text-muted-foreground">{formatCurrency(Number(p.target_price))}</span>
                          <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-muted-foreground hover:text-primary" onClick={() => startEdit(p)}>✎</Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(p.id)}>
                              <Trash2 className="h-2.5 w-2.5" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {showAdd ? (
            <div className="border-t border-border pt-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Categoria" value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} className="h-8 text-sm" list="cat-list" />
                <datalist id="cat-list">{categories.map(c => <option key={c} value={c} />)}</datalist>
                <Input placeholder="Nome do serviço" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} className="h-8 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input type="number" step="0.01" placeholder="Preço Atual" value={newItem.current_price} onChange={e => setNewItem({ ...newItem, current_price: e.target.value })} className="h-8 text-sm" />
                <Input type="number" step="0.01" placeholder="Preço Alvo" value={newItem.target_price} onChange={e => setNewItem({ ...newItem, target_price: e.target.value })} className="h-8 text-sm" />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAdd}>Adicionar</Button>
                <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}>Cancelar</Button>
              </div>
            </div>
          ) : (
            <Button size="sm" variant="outline" className="gap-1 text-xs" onClick={() => setShowAdd(true)}>
              <Plus className="h-3 w-3" /> Novo serviço
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ServicePricesSection;
