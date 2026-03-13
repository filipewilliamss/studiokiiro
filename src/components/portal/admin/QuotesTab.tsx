import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FilePlus, Hash, Calendar, CheckCircle2, XCircle, Clock, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface Profile { id: string; full_name: string; company: string | null; }
interface QuoteItem { description: string; quantity: number; unit_price: number; }
interface Quote {
  id: string; sequential_number: number; client_id: string; project_type: string;
  description: string | null; items: QuoteItem[]; total_value: number;
  payment_terms: string | null; validity_date: string | null; status: string;
  client_response_at: string | null; notes: string | null; created_at: string;
  profiles?: Profile;
}

const projectTypes = [
  "Logotipo Essencial", "Identidade Visual", "Branding Completo", "Manual de Logotipo",
  "Design de Conteúdo para Redes Sociais", "Edição de Vídeo — Reels/Shorts",
  "Edição de Vídeo — Institucional", "Edição de Vídeo — Tutorial/Educativo",
  "Landing Page Simples", "Landing Page Completa", "Site Institucional", "Site Completo",
];

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pendente: { label: "Pendente", color: "bg-amber-500/10 text-amber-400", icon: <Clock className="h-3.5 w-3.5" /> },
  aprovado: { label: "Aprovado", color: "bg-emerald-500/10 text-emerald-400", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  recusado: { label: "Recusado", color: "bg-destructive/10 text-destructive", icon: <XCircle className="h-3.5 w-3.5" /> },
};

const QuotesTab = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [clients, setClients] = useState<Profile[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewQuote, setViewQuote] = useState<Quote | null>(null);

  const [form, setForm] = useState({
    client_id: "", project_type: "Identidade Visual", description: "",
    payment_terms: "", validity_date: "", notes: "",
  });
  const [items, setItems] = useState<QuoteItem[]>([{ description: "", quantity: 1, unit_price: 0 }]);

  const fetchAll = async () => {
    const [quotesRes, clientsRes] = await Promise.all([
      supabase.from("quotes").select("*, profiles!quotes_client_id_fkey(id, full_name, company)").order("sequential_number", { ascending: false }),
      supabase.from("profiles").select("id, full_name, company"),
    ]);
    if (quotesRes.data) setQuotes(quotesRes.data as any);
    if (clientsRes.data) setClients(clientsRes.data);
  };

  useEffect(() => { fetchAll(); }, []);

  const totalValue = items.reduce((acc, i) => acc + i.quantity * i.unit_price, 0);

  const addItem = () => setItems([...items, { description: "", quantity: 1, unit_price: 0 }]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: keyof QuoteItem, value: string | number) => {
    setItems(items.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const validItems = items.filter((i) => i.description.trim());
    const { error } = await supabase.from("quotes").insert({
      client_id: form.client_id,
      project_type: form.project_type,
      description: form.description || null,
      items: validItems as any,
      total_value: totalValue,
      payment_terms: form.payment_terms || null,
      validity_date: form.validity_date || null,
      notes: form.notes || null,
    });
    if (error) toast.error("Erro ao criar orçamento");
    else {
      toast.success("Orçamento criado e disponível para o cliente!");
      setOpen(false);
      setForm({ client_id: "", project_type: "Identidade Visual", description: "", payment_terms: "", validity_date: "", notes: "" });
      setItems([{ description: "", quantity: 1, unit_price: 0 }]);
      fetchAll();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{quotes.length} orçamento(s)</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><FilePlus className="h-4 w-4" /> Novo Orçamento</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle style={{ fontFamily: "var(--font-display)" }}>Novo Orçamento</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Cliente *</label>
                  <Select value={form.client_id} onValueChange={(v) => setForm({ ...form, client_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>{clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.full_name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Serviço</label>
                  <Select value={form.project_type} onValueChange={(v) => setForm({ ...form, project_type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{projectTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Descrição</label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
              </div>

              {/* Items */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Itens do Orçamento</label>
                  <Button type="button" variant="ghost" size="sm" onClick={addItem} className="text-xs h-7 gap-1"><Plus className="h-3 w-3" />Item</Button>
                </div>
                {items.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-6 space-y-1">
                      {idx === 0 && <label className="text-[10px] text-muted-foreground">Descrição</label>}
                      <Input value={item.description} onChange={(e) => updateItem(idx, "description", e.target.value)} placeholder="Serviço..." />
                    </div>
                    <div className="col-span-2 space-y-1">
                      {idx === 0 && <label className="text-[10px] text-muted-foreground">Qtd</label>}
                      <Input type="number" min="1" value={item.quantity} onChange={(e) => updateItem(idx, "quantity", parseInt(e.target.value) || 1)} />
                    </div>
                    <div className="col-span-3 space-y-1">
                      {idx === 0 && <label className="text-[10px] text-muted-foreground">Valor Unit.</label>}
                      <Input type="number" step="0.01" value={item.unit_price || ""} onChange={(e) => updateItem(idx, "unit_price", parseFloat(e.target.value) || 0)} placeholder="0,00" />
                    </div>
                    <div className="col-span-1">
                      {items.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(idx)} className="h-9 w-9 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex justify-end pt-2 border-t border-border">
                  <p className="text-sm font-medium">Total: <span className="text-primary font-display font-bold">{formatCurrency(totalValue)}</span></p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Condições de pagamento</label>
                  <Textarea value={form.payment_terms} onChange={(e) => setForm({ ...form, payment_terms: e.target.value })} rows={2} placeholder="Ex: 50% + 50%" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Validade</label>
                  <Input type="date" value={form.validity_date} onChange={(e) => setForm({ ...form, validity_date: e.target.value })} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Observações</label>
                <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button type="submit" disabled={loading || !form.client_id}>{loading ? "Criando..." : "Criar Orçamento"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quotes list */}
      <div className="grid gap-3">
        {quotes.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground text-sm">Nenhum orçamento.</p>
          </div>
        ) : quotes.map((quote) => {
          const cfg = statusConfig[quote.status] || statusConfig.pendente;
          return (
            <button
              key={quote.id}
              onClick={() => setViewQuote(quote)}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all text-left w-full"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-primary" />
                    <span className="font-display font-bold text-primary">ORC-{String(quote.sequential_number).padStart(4, "0")}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${cfg.color}`}>
                      {cfg.icon} {cfg.label}
                    </span>
                  </div>
                  <h3 className="font-medium text-foreground">{(quote as any).profiles?.full_name || "—"}</h3>
                  <p className="text-xs text-muted-foreground">{quote.project_type}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-display font-semibold text-foreground">{formatCurrency(Number(quote.total_value))}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                    <Calendar className="h-3 w-3" />
                    {new Date(quote.created_at).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
              {quote.client_response_at && (
                <p className="text-xs text-muted-foreground mt-2 border-t border-border pt-2">
                  Respondido em {new Date(quote.client_response_at).toLocaleDateString("pt-BR")}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Quote detail sheet */}
      <Sheet open={!!viewQuote} onOpenChange={(o) => !o && setViewQuote(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          {viewQuote && (
            <>
              <SheetHeader>
                <SheetTitle style={{ fontFamily: "var(--font-display)" }}>
                  ORC-{String(viewQuote.sequential_number).padStart(4, "0")}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Cliente</label>
                  <p className="text-sm text-foreground">{(viewQuote as any).profiles?.full_name || "—"}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Serviço</label>
                  <p className="text-sm text-foreground">{viewQuote.project_type}</p>
                </div>
                {viewQuote.description && (
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Descrição</label>
                    <p className="text-sm text-foreground whitespace-pre-wrap">{viewQuote.description}</p>
                  </div>
                )}

                {/* Items */}
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Itens</label>
                  <div className="border border-border rounded-xl overflow-hidden">
                    <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                      <span className="col-span-6">Descrição</span>
                      <span className="col-span-2 text-center">Qtd</span>
                      <span className="col-span-2 text-right">Unit.</span>
                      <span className="col-span-2 text-right">Total</span>
                    </div>
                    {(viewQuote.items || []).map((item: any, idx: number) => (
                      <div key={idx} className="grid grid-cols-12 gap-2 px-4 py-3 border-t border-border text-sm">
                        <span className="col-span-6 text-foreground">{item.description}</span>
                        <span className="col-span-2 text-center text-muted-foreground">{item.quantity}</span>
                        <span className="col-span-2 text-right text-muted-foreground">{formatCurrency(item.unit_price)}</span>
                        <span className="col-span-2 text-right font-medium text-foreground">{formatCurrency(item.quantity * item.unit_price)}</span>
                      </div>
                    ))}
                    <div className="grid grid-cols-12 gap-2 px-4 py-3 border-t border-border bg-primary/5">
                      <span className="col-span-10 text-right text-sm font-medium text-foreground">Total</span>
                      <span className="col-span-2 text-right font-display font-bold text-primary">{formatCurrency(Number(viewQuote.total_value))}</span>
                    </div>
                  </div>
                </div>

                {viewQuote.payment_terms && (
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Condições de Pagamento</label>
                    <p className="text-sm text-foreground whitespace-pre-wrap">{viewQuote.payment_terms}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Status</label>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const cfg = statusConfig[viewQuote.status] || statusConfig.pendente;
                      return (
                        <span className={`text-sm px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 ${cfg.color}`}>
                          {cfg.icon} {cfg.label}
                        </span>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default QuotesTab;
