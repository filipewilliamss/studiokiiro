import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { FilePlus, Printer, Hash, Calendar, Trash2, Pencil, Plus, X } from "lucide-react";
import { toast } from "sonner";
import kiiroLogo from "@/assets/logo.webp";

interface Profile { id: string; full_name: string; company: string | null; phone: string | null; email: string | null; }
interface Project { id: string; name: string; type: string; }
interface ServiceItem { description: string; qty: number; unit_price: number; }
interface ServiceOrder {
  id: string; sequential_number: number; project_id: string | null; client_id: string;
  service_type: string; description: string | null; total_value: number;
  payment_terms: string | null; terms_conditions: string | null; notes: string | null;
  status: string; created_at: string; items: ServiceItem[]; deadline: string | null;
  profiles?: Profile; projects?: { name: string };
}

const projectTypes = [
  "Logotipo Essencial", "Identidade Visual", "Branding Completo", "Manual de Logotipo",
  "Personal Brand Kit", "Design de Conteúdo para Redes Sociais", "Edição de Vídeo — Reels/Shorts",
  "Edição de Vídeo — Institucional", "Edição de Vídeo — Tutorial/Educativo",
  "Landing Page Simples", "Landing Page Completa", "Site Institucional", "Site Completo",
];

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

const formatDateLong = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
};

const formatDateTimeLong = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })} às ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
};

// Studio Kiiro provider info
const PROVIDER = {
  name: "Filipe Soares",
  document: "449.403.838-57",
  address: "Rua Osvaldo Avilez, 147 - Casa 2, Jardim Ponte Alta I, Guarulhos/SP, CEP 07179300",
};

const emptyItem: ServiceItem = { description: "", qty: 1, unit_price: 0 };

const emptyForm = {
  client_id: "", project_id: "", service_type: "Identidade Visual",
  description: "", total_value: "", payment_terms: "", terms_conditions: "", notes: "", status: "ativa",
  deadline: "", items: [{ ...emptyItem }] as ServiceItem[],
};

const ServiceOrdersTab = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [clients, setClients] = useState<Profile[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewOrder, setViewOrder] = useState<ServiceOrder | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editingOrder, setEditingOrder] = useState<ServiceOrder | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState(emptyForm);

  const fetchAll = async () => {
    const [ordersRes, clientsRes, projectsRes] = await Promise.all([
      supabase.from("service_orders").select("*, profiles!service_orders_client_id_fkey(id, full_name, company, phone, email), projects(name)").order("sequential_number", { ascending: false }),
      supabase.from("profiles").select("id, full_name, company, phone, email"),
      supabase.from("projects").select("id, name, type"),
    ]);

    if (ordersRes.error || clientsRes.error || projectsRes.error) return;
    if (ordersRes.data) setOrders(ordersRes.data as any);
    if (clientsRes.data) setClients(clientsRes.data);
    if (projectsRes.data) setProjects(projectsRes.data);
  };

  useEffect(() => {
    if (!user) return;
    fetchAll();
  }, [user?.id]);

  const calcTotal = (items: ServiceItem[]) =>
    items.reduce((sum, item) => sum + (item.qty * item.unit_price), 0);

  const updateItem = (index: number, field: keyof ServiceItem, value: string | number) => {
    const newItems = [...form.items];
    newItems[index] = { ...newItems[index], [field]: value };
    const total = calcTotal(newItems);
    setForm({ ...form, items: newItems, total_value: String(total) });
  };

  const addItem = () => setForm({ ...form, items: [...form.items, { ...emptyItem }] });
  const removeItem = (index: number) => {
    const newItems = form.items.filter((_, i) => i !== index);
    if (newItems.length === 0) newItems.push({ ...emptyItem });
    setForm({ ...form, items: newItems, total_value: String(calcTotal(newItems)) });
  };

  const openCreateDialog = () => {
    setEditingOrder(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEditDialog = (order: ServiceOrder) => {
    const items = Array.isArray(order.items) && order.items.length > 0
      ? order.items
      : [{ ...emptyItem }];
    setEditingOrder(order);
    setForm({
      client_id: order.client_id,
      project_id: order.project_id || "",
      service_type: order.service_type,
      description: order.description || "",
      total_value: String(order.total_value),
      payment_terms: order.payment_terms || "",
      terms_conditions: order.terms_conditions || "",
      notes: order.notes || "",
      status: order.status,
      deadline: order.deadline || "",
      items,
    });
    setOpen(true);
    setViewOrder(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const totalFromItems = calcTotal(form.items);
    const payload = {
      client_id: form.client_id,
      project_id: form.project_id || null,
      service_type: form.service_type,
      description: form.description || null,
      total_value: totalFromItems || parseFloat(form.total_value) || 0,
      payment_terms: form.payment_terms || null,
      terms_conditions: form.terms_conditions || null,
      notes: form.notes || null,
      status: form.status,
      items: form.items.filter(i => i.description.trim()) as unknown as any,
      deadline: form.deadline || null,
    };

    if (editingOrder) {
      const { error } = await supabase.from("service_orders").update(payload).eq("id", editingOrder.id);
      if (error) toast.error("Erro ao atualizar OS");
      else { toast.success("Ordem de Serviço atualizada!"); setOpen(false); fetchAll(); }
    } else {
      const { error } = await supabase.from("service_orders").insert(payload);
      if (error) toast.error("Erro ao criar OS");
      else { toast.success("Ordem de Serviço criada!"); setOpen(false); fetchAll(); }
    }
    setForm(emptyForm);
    setEditingOrder(null);
    setLoading(false);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };
  const toggleSelectAll = () => {
    setSelectedIds(selectedIds.size === orders.length ? new Set() : new Set(orders.map((o) => o.id)));
  };
  const handleDelete = async () => {
    const ids = Array.from(selectedIds);
    const { error } = await supabase.from("service_orders").delete().in("id", ids);
    if (error) toast.error("Erro ao excluir ordens de serviço");
    else { toast.success(`${ids.length} OS excluída(s)`); setSelectedIds(new Set()); fetchAll(); }
  };

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Ordem de Serviço</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; color: #1a1a1a; max-width: 800px; margin: 0 auto; background: #fff; }
        .os-header { background: #1a1a1a; color: #fff; padding: 32px 40px; display: flex; justify-content: space-between; align-items: center; }
        .os-header-left h2 { font-family: 'Space Grotesk', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 4px; color: #999; margin-bottom: 8px; }
        .os-header-left h1 { font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .os-header-left p { font-size: 13px; color: #aaa; line-height: 1.5; }
        .os-header-logo img { height: 48px; }
        .os-body { padding: 32px 40px; }
        .section { margin-bottom: 28px; }
        .section-title { font-family: 'Space Grotesk', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #666; font-weight: 600; margin-bottom: 14px; }
        .card { border: 1px solid #e5e5e5; border-radius: 4px; padding: 20px 24px; }
        .card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field-label { font-family: 'Space Grotesk', sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #999; margin-bottom: 4px; }
        .field-value { font-size: 14px; color: #1a1a1a; line-height: 1.5; }
        .items-table { width: 100%; border-collapse: collapse; }
        .items-table thead th { font-family: 'Space Grotesk', sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #999; padding: 12px 16px; text-align: left; border-bottom: 1px solid #e5e5e5; }
        .items-table thead th:nth-child(2), .items-table thead th:nth-child(3), .items-table thead th:nth-child(4) { text-align: right; }
        .items-table tbody td { padding: 14px 16px; font-size: 14px; border-bottom: 1px solid #f0f0f0; }
        .items-table tbody td:nth-child(2), .items-table tbody td:nth-child(3), .items-table tbody td:nth-child(4) { text-align: right; }
        .total-row { display: flex; justify-content: flex-end; align-items: center; gap: 16px; padding: 16px; }
        .total-label { font-family: 'Space Grotesk', sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #999; }
        .total-value { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; color: #1a1a1a; }
        .os-footer { text-align: center; padding: 40px; color: #999; font-size: 12px; line-height: 1.8; border-top: 1px solid #e5e5e5; margin-top: 20px; }
        @media print { 
          body { padding: 0; } 
          .os-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      </style></head><body>
      ${content.innerHTML}
      </body></html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  const getOsHash = (order: ServiceOrder) => order.id.substring(0, 8).toUpperCase();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">{orders.length} ordem(ns) de serviço</p>
          {selectedIds.size > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="gap-2"><Trash2 className="h-4 w-4" />Excluir ({selectedIds.size})</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir ordens de serviço?</AlertDialogTitle>
                  <AlertDialogDescription>{selectedIds.size} OS serão removidas permanentemente.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        <Button className="gap-2" onClick={openCreateDialog}><FilePlus className="h-4 w-4" /> Nova OS</Button>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={open} onOpenChange={(o) => { if (!o) setEditingOrder(null); setOpen(o); }}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "var(--font-display)" }}>{editingOrder ? "Editar Ordem de Serviço" : "Nova Ordem de Serviço"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Cliente *</label>
              <Select value={form.client_id} onValueChange={(v) => setForm({ ...form, client_id: v })}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>{clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.full_name} {c.company ? `(${c.company})` : ""}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Tipo de Serviço</label>
                <Select value={form.service_type} onValueChange={(v) => setForm({ ...form, service_type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{projectTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Vencimento</label>
                <Input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Projeto vinculado</label>
                <Select value={form.project_id} onValueChange={(v) => setForm({ ...form, project_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Opcional" /></SelectTrigger>
                  <SelectContent>{projects.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              {editingOrder && (
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Status</label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativa">Ativa</SelectItem>
                      <SelectItem value="concluida">Concluída</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Descrição do serviço</label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
            </div>

            {/* Items section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Itens e Serviços</label>
                <Button type="button" variant="outline" size="sm" onClick={addItem} className="gap-1 h-7 text-xs">
                  <Plus className="h-3 w-3" /> Adicionar Item
                </Button>
              </div>
              <div className="space-y-2">
                {form.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-[1fr_70px_100px_32px] gap-2 items-end">
                    <div className="space-y-1">
                      {index === 0 && <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Descrição</span>}
                      <Input
                        placeholder="Ex: Mockup Carrossel"
                        value={item.description}
                        onChange={(e) => updateItem(index, "description", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      {index === 0 && <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Qtd</span>}
                      <Input
                        type="number" min="1"
                        value={item.qty}
                        onChange={(e) => updateItem(index, "qty", parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div className="space-y-1">
                      {index === 0 && <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Valor Unit.</span>}
                      <Input
                        type="number" step="0.01" min="0"
                        value={item.unit_price}
                        onChange={(e) => updateItem(index, "unit_price", parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <Button
                      type="button" variant="ghost" size="icon"
                      className="h-10 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(index)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="text-right text-sm font-medium text-foreground">
                Total: {formatCurrency(calcTotal(form.items))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Condições de pagamento</label>
              <Textarea value={form.payment_terms} onChange={(e) => setForm({ ...form, payment_terms: e.target.value })} rows={2} placeholder="Ex: 50% na aprovação + 50% na entrega" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Observações</label>
              <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={loading || !form.client_id}>{loading ? "Salvando..." : editingOrder ? "Salvar Alterações" : "Criar OS"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Orders list */}
      <div className="grid gap-3">
        {orders.length > 0 && (
          <div className="flex items-center gap-2 px-1">
            <Checkbox checked={selectedIds.size === orders.length && orders.length > 0} onCheckedChange={toggleSelectAll} />
            <span className="text-xs text-muted-foreground">Selecionar todos</span>
          </div>
        )}
        {orders.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground text-sm">Nenhuma ordem de serviço.</p>
          </div>
        ) : orders.map((order) => (
          <div
            key={order.id}
            className={`bg-card border rounded-xl p-5 hover:border-primary/30 transition-all ${selectedIds.has(order.id) ? "border-primary/50" : "border-border"}`}
          >
            <div className="flex items-start gap-3">
              <Checkbox checked={selectedIds.has(order.id)} onCheckedChange={() => toggleSelect(order.id)} className="mt-1" />
              <button onClick={() => setViewOrder(order)} className="flex-1 text-left">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-primary" />
                      <span className="font-display font-bold text-primary">OS #{getOsHash(order)}</span>
                    </div>
                    <h3 className="font-medium text-foreground">{(order as any).profiles?.full_name || "—"}</h3>
                    <p className="text-xs text-muted-foreground">{order.service_type}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-display font-semibold text-foreground">{formatCurrency(Number(order.total_value))}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                      <Calendar className="h-3 w-3" />
                      {new Date(order.created_at).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              </button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEditDialog(order)}>
                <Pencil className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* View/Print modal */}
      <Dialog open={!!viewOrder} onOpenChange={(o) => !o && setViewOrder(null)}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0">
          {viewOrder && (
            <>
              <div className="flex justify-end gap-2 p-4 pb-0">
                <Button onClick={() => openEditDialog(viewOrder)} variant="outline" className="gap-2">
                  <Pencil className="h-4 w-4" /> Editar
                </Button>
                <Button onClick={handlePrint} variant="outline" className="gap-2">
                  <Printer className="h-4 w-4" /> Imprimir / PDF
                </Button>
              </div>

              {/* Print content - matching the PDF layout exactly */}
              <div ref={printRef}>
                {/* Dark header banner */}
                <div className="os-header" style={{ background: "#1a1a1a", color: "#fff", padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="os-header-left">
                    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", textTransform: "uppercase", letterSpacing: "4px", color: "#999", marginBottom: "8px" }}>
                      Ordem de Serviço
                    </h2>
                    <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                      {PROVIDER.name}
                    </h1>
                    <p style={{ fontSize: "13px", color: "#aaa", lineHeight: 1.5 }}>
                      {PROVIDER.document}<br />
                      {PROVIDER.address}
                    </p>
                  </div>
                  <div className="os-header-logo">
                    <img src={kiiroLogo} alt="Studio Kiiro" style={{ height: "48px" }} />
                  </div>
                </div>

                {/* Body */}
                <div className="os-body" style={{ padding: "32px 40px" }}>
                  {/* CLIENTE section */}
                  <div className="section" style={{ marginBottom: "28px" }}>
                    <div className="section-title" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", textTransform: "uppercase", letterSpacing: "3px", color: "#666", fontWeight: 600, marginBottom: "14px" }}>
                      Cliente
                    </div>
                    <div className="card" style={{ border: "1px solid #e5e5e5", borderRadius: "4px", padding: "20px 24px" }}>
                      <div className="card-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div>
                          <div className="field-label" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", marginBottom: "4px" }}>Nome</div>
                          <div className="field-value" style={{ fontSize: "14px", color: "#1a1a1a" }}>{(viewOrder as any).profiles?.full_name || "—"}</div>
                        </div>
                        <div>
                          <div className="field-label" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", marginBottom: "4px" }}>Contato</div>
                          <div className="field-value" style={{ fontSize: "14px", color: "#1a1a1a" }}>{(viewOrder as any).profiles?.email || "—"}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RESUMO section */}
                  <div className="section" style={{ marginBottom: "28px" }}>
                    <div className="section-title" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", textTransform: "uppercase", letterSpacing: "3px", color: "#666", fontWeight: 600, marginBottom: "14px" }}>
                      Resumo
                    </div>
                    <div className="card" style={{ border: "1px solid #e5e5e5", borderRadius: "4px", padding: "20px 24px" }}>
                      <div className="card-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div>
                          <div className="field-label" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", marginBottom: "4px" }}>Título</div>
                          <div className="field-value" style={{ fontSize: "14px", color: "#1a1a1a" }}>{viewOrder.service_type}</div>
                        </div>
                        <div>
                          <div className="field-label" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", marginBottom: "4px" }}>Vencimento</div>
                          <div className="field-value" style={{ fontSize: "14px", color: "#1a1a1a" }}>
                            {viewOrder.deadline ? formatDateLong(viewOrder.deadline) : "—"}
                          </div>
                        </div>
                        <div>
                          <div className="field-label" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", marginBottom: "4px" }}>Descrição</div>
                          <div className="field-value" style={{ fontSize: "14px", color: "#1a1a1a", lineHeight: 1.5 }}>{viewOrder.description || "—"}</div>
                        </div>
                        <div>
                          <div className="field-label" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", marginBottom: "4px" }}>Responsável</div>
                          <div className="field-value" style={{ fontSize: "14px", color: "#1a1a1a" }}>{PROVIDER.name}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ITENS E SERVIÇOS section */}
                  {Array.isArray(viewOrder.items) && viewOrder.items.length > 0 && viewOrder.items.some((i: any) => i.description) && (
                    <div className="section" style={{ marginBottom: "28px" }}>
                      <div className="section-title" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", textTransform: "uppercase", letterSpacing: "3px", color: "#666", fontWeight: 600, marginBottom: "14px" }}>
                        Itens e Serviços
                      </div>
                      <div className="card" style={{ border: "1px solid #e5e5e5", borderRadius: "4px", padding: "0" }}>
                        <table className="items-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                          <thead>
                            <tr>
                              <th style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", padding: "14px 16px", textAlign: "left", borderBottom: "1px solid #e5e5e5" }}>Descrição</th>
                              <th style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", padding: "14px 16px", textAlign: "right", borderBottom: "1px solid #e5e5e5" }}>Qtd</th>
                              <th style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", padding: "14px 16px", textAlign: "right", borderBottom: "1px solid #e5e5e5" }}>Valor Unit.</th>
                              <th style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", padding: "14px 16px", textAlign: "right", borderBottom: "1px solid #e5e5e5" }}>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(viewOrder.items as ServiceItem[]).filter((i) => i.description).map((item, idx) => (
                              <tr key={idx}>
                                <td style={{ padding: "14px 16px", fontSize: "14px", borderBottom: "1px solid #f0f0f0" }}>{item.description}</td>
                                <td style={{ padding: "14px 16px", fontSize: "14px", textAlign: "right", borderBottom: "1px solid #f0f0f0" }}>{item.qty}</td>
                                <td style={{ padding: "14px 16px", fontSize: "14px", textAlign: "right", borderBottom: "1px solid #f0f0f0" }}>{formatCurrency(item.unit_price)}</td>
                                <td style={{ padding: "14px 16px", fontSize: "14px", textAlign: "right", borderBottom: "1px solid #f0f0f0" }}>{formatCurrency(item.qty * item.unit_price)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="total-row" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "16px", padding: "16px" }}>
                          <span className="total-label" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999" }}>Total Geral</span>
                          <span className="total-value" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px", fontWeight: 700, color: "#1a1a1a" }}>{formatCurrency(Number(viewOrder.total_value))}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* If no items, show simple total */}
                  {(!Array.isArray(viewOrder.items) || viewOrder.items.length === 0 || !viewOrder.items.some((i: any) => i.description)) && (
                    <div className="section" style={{ marginBottom: "28px" }}>
                      <div className="section-title" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", textTransform: "uppercase", letterSpacing: "3px", color: "#666", fontWeight: 600, marginBottom: "14px" }}>
                        Valor
                      </div>
                      <div className="card" style={{ border: "1px solid #e5e5e5", borderRadius: "4px", padding: "20px 24px", textAlign: "right" }}>
                        <span className="total-label" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#999", marginRight: "16px" }}>Total Geral</span>
                        <span className="total-value" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px", fontWeight: 700, color: "#1a1a1a" }}>{formatCurrency(Number(viewOrder.total_value))}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="os-footer" style={{ textAlign: "center", padding: "40px", color: "#999", fontSize: "12px", lineHeight: 1.8, borderTop: "1px solid #e5e5e5", marginTop: "20px" }}>
                  OS #{getOsHash(viewOrder)} gerada em {formatDateTimeLong(viewOrder.created_at)}<br />
                  Documento emitido via Studio Kiiro
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceOrdersTab;
