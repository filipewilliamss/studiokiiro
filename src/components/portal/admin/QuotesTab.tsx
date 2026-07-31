import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { FilePlus, Hash, Calendar, CheckCircle2, XCircle, Clock, Trash2, Plus, Pencil, ShieldCheck, MessageSquareText, Download } from "lucide-react";
import { toast } from "sonner";
import { downloadQuotePdf } from "@/lib/quotePdf";

interface Profile { id: string; full_name: string; company: string | null; }
interface QuoteItem { description: string; quantity: number; unit_price: number; }
interface Quote {
  id: string; sequential_number: number; client_id: string; project_type: string;
  description: string | null; items: QuoteItem[]; total_value: number;
  payment_terms: string | null; validity_date: string | null; status: string;
  client_response_at: string | null; notes: string | null; created_at: string;
  admin_confirmed: boolean;
  profiles?: Profile;
}
interface QuoteRejection {
  id: string; reason: string; decision_factor: string | null; comment: string | null; created_at: string;
}

const projectDescriptions: Record<string, string> = {
  "Logotipo Essencial": "Criação de logotipo profissional com versões principal, secundária e submark, incluindo paleta de cores e tipografia definida.",
  "Identidade Visual": "Desenvolvimento completo de identidade visual com logotipo, paleta de cores, tipografia, elementos gráficos e manual básico de aplicação.",
  "Branding Completo": "Estratégia de marca completa incluindo posicionamento, identidade visual, tom de voz, diretrizes de comunicação e manual de marca detalhado.",
  "Manual de Logotipo": "Documentação técnica do logotipo com regras de uso, variações, área de proteção, aplicações corretas e incorretas, e especificações de cores.",
  "Personal Brand Kit": "Kit de marca pessoal com identidade visual, templates para redes sociais, assinatura de e-mail e materiais de apresentação profissional.",
  "Design de Conteúdo para Redes Sociais": "Criação de artes para feed e stories com identidade visual aplicada, incluindo templates editáveis e planejamento visual de grid.",
  "Edição de Vídeo — Reels/Shorts": "Edição profissional de vídeos curtos para Reels e Shorts, com cortes dinâmicos, legendas, trilha sonora e motion graphics.",
  "Edição de Vídeo — Institucional": "Edição de vídeo institucional com narrativa profissional, correção de cor, trilha sonora, legendas e finalização em alta qualidade.",
  "Edição de Vídeo — Tutorial/Educativo": "Edição de vídeo tutorial/educativo com didática visual, destaques de tela, legendas, transições e organização de conteúdo.",
  "Landing Page Simples": "Criação de landing page de alta conversão com design responsivo, seção hero, CTA principal e formulário de contato.",
  "Landing Page Completa": "Landing page completa com múltiplas seções, depoimentos, FAQ, integrações e otimização para conversão e SEO.",
  "Site Institucional": "Desenvolvimento de site institucional com páginas essenciais (home, sobre, serviços, contato), design responsivo e otimização SEO.",
  "Site Completo": "Site completo com múltiplas páginas, blog, área de portfólio, integrações avançadas, painel administrativo e otimização de performance.",
};

const projectTypes = Object.keys(projectDescriptions);

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pendente: { label: "Pendente", color: "bg-amber-500/10 text-amber-400", icon: <Clock className="h-3.5 w-3.5" /> },
  aprovado: { label: "Aprovado", color: "bg-emerald-500/10 text-emerald-400", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  recusado: { label: "Recusado", color: "bg-destructive/10 text-destructive", icon: <XCircle className="h-3.5 w-3.5" /> },
};

const emptyForm = { client_id: "", project_type: "Identidade Visual", description: "", payment_terms: "", validity_date: "", notes: "", status: "pendente" };
const emptyItems: QuoteItem[] = [{ description: "", quantity: 1, unit_price: 0 }];

const QuotesTab = () => {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [clients, setClients] = useState<Profile[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewQuote, setViewQuote] = useState<Quote | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [rejectionFeedback, setRejectionFeedback] = useState<QuoteRejection | null>(null);

  const [form, setForm] = useState(emptyForm);
  const [items, setItems] = useState<QuoteItem[]>([...emptyItems]);

  const fetchAll = async () => {
    const [quotesRes, clientsRes] = await Promise.all([
      supabase.from("quotes").select("*, profiles!quotes_client_id_fkey(id, full_name, company)").order("sequential_number", { ascending: false }),
      supabase.from("profiles").select("id, full_name, company"),
    ]);

    if (quotesRes.error || clientsRes.error) return;
    if (quotesRes.data) setQuotes(quotesRes.data as any);
    if (clientsRes.data) setClients(clientsRes.data);
  };

  useEffect(() => {
    if (!user) return;
    fetchAll();
  }, [user?.id]);

  const totalValue = items.reduce((acc, i) => acc + i.quantity * i.unit_price, 0);

  const addItem = () => setItems([...items, { description: "", quantity: 1, unit_price: 0 }]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: keyof QuoteItem, value: string | number) => {
    setItems(items.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const openCreateDialog = () => {
    setEditingQuote(null);
    setForm(emptyForm);
    setItems([...emptyItems]);
    setOpen(true);
  };

  const openEditDialog = (quote: Quote) => {
    setEditingQuote(quote);
    setForm({
      client_id: quote.client_id,
      project_type: quote.project_type,
      description: quote.description || "",
      payment_terms: quote.payment_terms || "",
      validity_date: quote.validity_date || "",
      notes: quote.notes || "",
      status: quote.status,
    });
    setItems(quote.items?.length ? [...quote.items] : [...emptyItems]);
    setOpen(true);
    setViewQuote(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const validItems = items.filter((i) => i.description.trim());
    const payload = {
      client_id: form.client_id,
      project_type: form.project_type,
      description: form.description || null,
      items: validItems as any,
      total_value: totalValue,
      payment_terms: form.payment_terms || null,
      validity_date: form.validity_date || null,
      notes: form.notes || null,
      status: form.status,
    };

    if (editingQuote) {
      const { error } = await supabase.from("quotes").update(payload).eq("id", editingQuote.id);
      if (error) toast.error("Erro ao atualizar orçamento");
      else { toast.success("Orçamento atualizado!"); setOpen(false); fetchAll(); }
    } else {
      const { error } = await supabase.from("quotes").insert(payload);
      if (error) toast.error("Erro ao criar orçamento");
      else { toast.success("Orçamento criado e disponível para o cliente!"); setOpen(false); fetchAll(); }
    }
    setForm(emptyForm);
    setItems([...emptyItems]);
    setEditingQuote(null);
    setLoading(false);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };
  const toggleSelectAll = () => {
    setSelectedIds(selectedIds.size === quotes.length ? new Set() : new Set(quotes.map((q) => q.id)));
  };
  const handleDelete = async () => {
    const ids = Array.from(selectedIds);
    const { error } = await supabase.from("quotes").delete().in("id", ids);
    if (error) toast.error("Erro ao excluir orçamentos");
    else { toast.success(`${ids.length} orçamento(s) excluído(s)`); setSelectedIds(new Set()); fetchAll(); }
  };

  const handleAdminConfirm = async (quote: Quote) => {
    const { error } = await supabase.from("quotes").update({ admin_confirmed: true }).eq("id", quote.id);
    if (error) toast.error("Erro ao confirmar");
    else {
      toast.success("Projeto confirmado e área do cliente liberada! ✅");
      setViewQuote({ ...quote, admin_confirmed: true });
      fetchAll();
    }
  };

  const fetchRejectionFeedback = async (quoteId: string) => {
    const { data } = await supabase.from("quote_rejections").select("*").eq("quote_id", quoteId).maybeSingle();
    setRejectionFeedback(data as any);
  };

  const openQuoteDetail = (quote: Quote) => {
    setViewQuote(quote);
    setRejectionFeedback(null);
    if (quote.status === "recusado") {
      fetchRejectionFeedback(quote.id);
    }
  };

  const handleDownloadPdf = async (quote: Quote) => {
    try {
      toast.loading("Gerando PDF...", { id: "quote-pdf" });
      await downloadQuotePdf({
        sequential_number: quote.sequential_number,
        project_type: quote.project_type,
        description: quote.description,
        items: quote.items,
        total_value: Number(quote.total_value),
        payment_terms: quote.payment_terms,
        validity_date: quote.validity_date,
        notes: quote.notes,
        status: quote.status,
        created_at: quote.created_at,
        clientName: (quote as any).profiles?.full_name || "—",
        clientCompany: (quote as any).profiles?.company || null,
      });
      toast.success("PDF gerado!", { id: "quote-pdf" });
    } catch {
      toast.error("Erro ao gerar PDF", { id: "quote-pdf" });
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">{quotes.length} orçamento(s)</p>
          {selectedIds.size > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="gap-2"><Trash2 className="h-4 w-4" />Excluir ({selectedIds.size})</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir orçamentos?</AlertDialogTitle>
                  <AlertDialogDescription>{selectedIds.size} orçamento(s) serão removidos permanentemente.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        <Button className="gap-2" onClick={openCreateDialog}><FilePlus className="h-4 w-4" /> Novo Orçamento</Button>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={open} onOpenChange={(o) => { if (!o) { setEditingQuote(null); } setOpen(o); }}>
        <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "var(--font-display)" }}>{editingQuote ? "Editar Orçamento" : "Novo Orçamento"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
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
                <Select value={form.project_type} onValueChange={(v) => setForm({ ...form, project_type: v, description: projectDescriptions[v] || "" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{projectTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>

            {editingQuote && (
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Status</label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="aprovado">Aprovado</SelectItem>
                    <SelectItem value="recusado">Recusado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

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
              <Button type="submit" disabled={loading || !form.client_id}>{loading ? "Salvando..." : editingQuote ? "Salvar Alterações" : "Criar Orçamento"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Quotes list */}
      <div className="grid gap-3">
        {quotes.length > 0 && (
          <div className="flex items-center gap-2 px-1">
            <Checkbox checked={selectedIds.size === quotes.length && quotes.length > 0} onCheckedChange={toggleSelectAll} />
            <span className="text-xs text-muted-foreground">Selecionar todos</span>
          </div>
        )}
        {quotes.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground text-sm">Nenhum orçamento.</p>
          </div>
        ) : quotes.map((quote) => {
          const cfg = statusConfig[quote.status] || statusConfig.pendente;
          return (
            <div
              key={quote.id}
              className={`bg-card border rounded-xl p-5 hover:border-primary/30 transition-all ${selectedIds.has(quote.id) ? "border-primary/50" : "border-border"}`}
            >
              <div className="flex items-start gap-3">
                <Checkbox checked={selectedIds.has(quote.id)} onCheckedChange={() => toggleSelect(quote.id)} className="mt-1" />
                <button onClick={() => openQuoteDetail(quote)} className="flex-1 text-left">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-primary" />
                        <span className="font-display font-bold text-primary">ORC-{String(quote.sequential_number).padStart(4, "0")}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${cfg.color}`}>
                          {cfg.icon} {cfg.label}
                        </span>
                        {quote.status === "aprovado" && !quote.admin_confirmed && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 bg-amber-500/10 text-amber-400">
                            <Clock className="h-3 w-3" /> Aguardando confirmação
                          </span>
                        )}
                        {quote.status === "aprovado" && quote.admin_confirmed && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 bg-emerald-500/10 text-emerald-400">
                            <ShieldCheck className="h-3 w-3" /> Confirmado
                          </span>
                        )}
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
                </button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Baixar PDF" onClick={() => handleDownloadPdf(quote)}>
                  <Download className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEditDialog(quote)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
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
                <div className="flex justify-end gap-2">
                  <Button size="sm" className="gap-2" onClick={() => handleDownloadPdf(viewQuote)}>
                    <Download className="h-3.5 w-3.5" /> Baixar PDF
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => openEditDialog(viewQuote)}>
                    <Pencil className="h-3.5 w-3.5" /> Editar
                  </Button>
                </div>
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
                  <div className="flex items-center gap-2 flex-wrap">
                    {(() => {
                      const cfg = statusConfig[viewQuote.status] || statusConfig.pendente;
                      return (
                        <span className={`text-sm px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 ${cfg.color}`}>
                          {cfg.icon} {cfg.label}
                        </span>
                      );
                    })()}
                    {viewQuote.status === "aprovado" && viewQuote.admin_confirmed && (
                      <span className="text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400">
                        <ShieldCheck className="h-3.5 w-3.5" /> Confirmado
                      </span>
                    )}
                    {viewQuote.status === "aprovado" && !viewQuote.admin_confirmed && (
                      <span className="text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 bg-amber-500/10 text-amber-400">
                        <Clock className="h-3.5 w-3.5" /> Aguardando sua confirmação
                      </span>
                    )}
                  </div>
                </div>

                {/* Admin confirmation button */}
                {viewQuote.status === "aprovado" && !viewQuote.admin_confirmed && (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="h-5 w-5 text-emerald-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Proposta aceita pelo cliente</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          O cliente aceitou esta proposta. Confirme abaixo para liberar a área completa do cliente.
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleAdminConfirm(viewQuote)}
                      className="w-full gap-2 rounded-xl"
                      style={{ backgroundColor: "hsl(142, 71%, 35%)", color: "white" }}
                    >
                      <ShieldCheck className="h-4 w-4" />
                      Confirmar recebimento / Iniciar projeto
                    </Button>
                  </div>
                )}

                {/* Rejection feedback */}
                {viewQuote.status === "recusado" && rejectionFeedback && (
                  <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <MessageSquareText className="h-4 w-4 text-destructive" />
                      <p className="text-sm font-medium text-foreground">Feedback do cliente</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Motivo da recusa</p>
                        <p className="text-foreground">{rejectionFeedback.reason}</p>
                      </div>
                      {rejectionFeedback.decision_factor && (
                        <div>
                          <p className="text-xs text-muted-foreground">Fator decisivo</p>
                          <p className="text-foreground">{rejectionFeedback.decision_factor}</p>
                        </div>
                      )}
                      {rejectionFeedback.comment && (
                        <div>
                          <p className="text-xs text-muted-foreground">Comentário</p>
                          <p className="text-foreground whitespace-pre-wrap">{rejectionFeedback.comment}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default QuotesTab;
