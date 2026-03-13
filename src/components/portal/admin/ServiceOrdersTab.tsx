import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { FilePlus, Printer, Hash, Calendar, Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";
import kiiroLogo from "@/assets/logo.png";

interface Profile { id: string; full_name: string; company: string | null; phone: string | null; email: string | null; }
interface Project { id: string; name: string; type: string; }
interface ServiceOrder {
  id: string; sequential_number: number; project_id: string | null; client_id: string;
  service_type: string; description: string | null; total_value: number;
  payment_terms: string | null; terms_conditions: string | null; notes: string | null;
  status: string; created_at: string;
  profiles?: Profile; projects?: { name: string };
}

const projectTypes = [
  "Logotipo Essencial", "Identidade Visual", "Branding Completo", "Manual de Logotipo",
  "Design de Conteúdo para Redes Sociais", "Edição de Vídeo — Reels/Shorts",
  "Edição de Vídeo — Institucional", "Edição de Vídeo — Tutorial/Educativo",
  "Landing Page Simples", "Landing Page Completa", "Site Institucional", "Site Completo",
];

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

const defaultTerms = `1. O prazo de execução será acordado entre as partes após a aprovação desta Ordem de Serviço.
2. O pagamento deverá ser realizado conforme as condições estabelecidas neste documento.
3. Qualquer alteração no escopo do projeto poderá resultar em ajuste de valor e prazo.
4. Os direitos sobre o material criativo serão transferidos ao cliente após a quitação total do serviço.
5. O Studio Kiiro reserva-se o direito de utilizar o projeto em seu portfólio.`;

const emptyForm = {
  client_id: "", project_id: "", service_type: "Identidade Visual",
  description: "", total_value: "", payment_terms: "", terms_conditions: defaultTerms, notes: "", status: "ativa",
};

const ServiceOrdersTab = () => {
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
    if (ordersRes.data) setOrders(ordersRes.data as any);
    if (clientsRes.data) setClients(clientsRes.data);
    if (projectsRes.data) setProjects(projectsRes.data);
  };

  useEffect(() => { fetchAll(); }, []);

  const openCreateDialog = () => {
    setEditingOrder(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEditDialog = (order: ServiceOrder) => {
    setEditingOrder(order);
    setForm({
      client_id: order.client_id,
      project_id: order.project_id || "",
      service_type: order.service_type,
      description: order.description || "",
      total_value: String(order.total_value),
      payment_terms: order.payment_terms || "",
      terms_conditions: order.terms_conditions || defaultTerms,
      notes: order.notes || "",
      status: order.status,
    });
    setOpen(true);
    setViewOrder(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      client_id: form.client_id,
      project_id: form.project_id || null,
      service_type: form.service_type,
      description: form.description || null,
      total_value: parseFloat(form.total_value) || 0,
      payment_terms: form.payment_terms || null,
      terms_conditions: form.terms_conditions || null,
      notes: form.notes || null,
      status: form.status,
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
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; color: #1a1a1a; padding: 40px; max-width: 800px; margin: 0 auto; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #E5A80A; padding-bottom: 20px; margin-bottom: 30px; }
        .logo img { height: 40px; }
        .os-number { font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; color: #E5A80A; }
        .os-date { font-size: 12px; color: #666; margin-top: 4px; }
        .section { margin-bottom: 24px; }
        .section-title { font-family: 'Space Grotesk', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #E5A80A; font-weight: 600; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 6px; }
        .field label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #999; }
        .field p { font-size: 14px; margin-top: 2px; }
        .terms { font-size: 12px; line-height: 1.8; color: #444; white-space: pre-wrap; }
        .footer { margin-top: 60px; display: flex; justify-content: space-between; }
        .signature { width: 45%; text-align: center; }
        .signature-line { border-top: 1px solid #333; margin-top: 60px; padding-top: 8px; font-size: 12px; }
        @media print { body { padding: 20px; } }
      </style></head><body>
      ${content.innerHTML}
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

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
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
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
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Projeto vinculado</label>
                <Select value={form.project_id} onValueChange={(v) => setForm({ ...form, project_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Opcional" /></SelectTrigger>
                  <SelectContent>{projects.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
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
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Valor Total *</label>
              <Input type="number" step="0.01" value={form.total_value} onChange={(e) => setForm({ ...form, total_value: e.target.value })} required placeholder="0,00" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Descrição do serviço</label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Condições de pagamento</label>
              <Textarea value={form.payment_terms} onChange={(e) => setForm({ ...form, payment_terms: e.target.value })} rows={2} placeholder="Ex: 50% na aprovação + 50% na entrega" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Termos e condições</label>
              <Textarea value={form.terms_conditions} onChange={(e) => setForm({ ...form, terms_conditions: e.target.value })} rows={5} />
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
                      <span className="font-display font-bold text-primary">OS-{String(order.sequential_number).padStart(4, "0")}</span>
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
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {viewOrder && (
            <>
              <DialogHeader>
                <DialogTitle style={{ fontFamily: "var(--font-display)" }}>
                  OS-{String(viewOrder.sequential_number).padStart(4, "0")}
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-end gap-2">
                <Button onClick={() => openEditDialog(viewOrder)} variant="outline" className="gap-2">
                  <Pencil className="h-4 w-4" /> Editar
                </Button>
                <Button onClick={handlePrint} variant="outline" className="gap-2">
                  <Printer className="h-4 w-4" /> Imprimir / PDF
                </Button>
              </div>

              {/* Print content */}
              <div ref={printRef}>
                <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "3px solid #E5A80A", paddingBottom: "20px", marginBottom: "30px" }}>
                  <div className="logo">
                    <img src={kiiroLogo} alt="Studio Kiiro" style={{ height: "40px" }} />
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="os-number" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px", fontWeight: 700, color: "#E5A80A" }}>
                      OS-{String(viewOrder.sequential_number).padStart(4, "0")}
                    </div>
                    <div className="os-date" style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                      Emissão: {new Date(viewOrder.created_at).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                </div>

                <div className="section" style={{ marginBottom: "24px" }}>
                  <div className="section-title" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", textTransform: "uppercase" as const, letterSpacing: "2px", color: "#E5A80A", fontWeight: 600, marginBottom: "12px", borderBottom: "1px solid #eee", paddingBottom: "6px" }}>
                    Dados do Cliente
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <div><span style={{ fontSize: "10px", textTransform: "uppercase" as const, letterSpacing: "1px", color: "#999" }}>Nome</span><p style={{ fontSize: "14px", marginTop: "2px" }}>{(viewOrder as any).profiles?.full_name || "—"}</p></div>
                    <div><span style={{ fontSize: "10px", textTransform: "uppercase" as const, letterSpacing: "1px", color: "#999" }}>Empresa</span><p style={{ fontSize: "14px", marginTop: "2px" }}>{(viewOrder as any).profiles?.company || "—"}</p></div>
                    <div><span style={{ fontSize: "10px", textTransform: "uppercase" as const, letterSpacing: "1px", color: "#999" }}>E-mail</span><p style={{ fontSize: "14px", marginTop: "2px" }}>{(viewOrder as any).profiles?.email || "—"}</p></div>
                    <div><span style={{ fontSize: "10px", textTransform: "uppercase" as const, letterSpacing: "1px", color: "#999" }}>Telefone</span><p style={{ fontSize: "14px", marginTop: "2px" }}>{(viewOrder as any).profiles?.phone || "—"}</p></div>
                  </div>
                </div>

                <div className="section" style={{ marginBottom: "24px" }}>
                  <div className="section-title" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", textTransform: "uppercase" as const, letterSpacing: "2px", color: "#E5A80A", fontWeight: 600, marginBottom: "12px", borderBottom: "1px solid #eee", paddingBottom: "6px" }}>
                    Serviço
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <div><span style={{ fontSize: "10px", textTransform: "uppercase" as const, letterSpacing: "1px", color: "#999" }}>Tipo</span><p style={{ fontSize: "14px", marginTop: "2px" }}>{viewOrder.service_type}</p></div>
                    <div><span style={{ fontSize: "10px", textTransform: "uppercase" as const, letterSpacing: "1px", color: "#999" }}>Valor Total</span><p style={{ fontSize: "14px", marginTop: "2px", fontWeight: 600 }}>{formatCurrency(Number(viewOrder.total_value))}</p></div>
                  </div>
                  {viewOrder.description && (
                    <div style={{ marginTop: "12px" }}>
                      <span style={{ fontSize: "10px", textTransform: "uppercase" as const, letterSpacing: "1px", color: "#999" }}>Descrição</span>
                      <p style={{ fontSize: "13px", marginTop: "4px", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{viewOrder.description}</p>
                    </div>
                  )}
                </div>

                {viewOrder.payment_terms && (
                  <div className="section" style={{ marginBottom: "24px" }}>
                    <div className="section-title" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", textTransform: "uppercase" as const, letterSpacing: "2px", color: "#E5A80A", fontWeight: 600, marginBottom: "12px", borderBottom: "1px solid #eee", paddingBottom: "6px" }}>
                      Condições de Pagamento
                    </div>
                    <p style={{ fontSize: "13px", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{viewOrder.payment_terms}</p>
                  </div>
                )}

                {viewOrder.terms_conditions && (
                  <div className="section" style={{ marginBottom: "24px" }}>
                    <div className="section-title" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", textTransform: "uppercase" as const, letterSpacing: "2px", color: "#E5A80A", fontWeight: 600, marginBottom: "12px", borderBottom: "1px solid #eee", paddingBottom: "6px" }}>
                      Termos e Condições
                    </div>
                    <p className="terms" style={{ fontSize: "12px", lineHeight: 1.8, color: "#444", whiteSpace: "pre-wrap" }}>{viewOrder.terms_conditions}</p>
                  </div>
                )}

                <div className="footer" style={{ marginTop: "60px", display: "flex", justifyContent: "space-between" }}>
                  <div className="signature" style={{ width: "45%", textAlign: "center" }}>
                    <div className="signature-line" style={{ borderTop: "1px solid #333", marginTop: "60px", paddingTop: "8px", fontSize: "12px" }}>
                      Studio Kiiro
                    </div>
                  </div>
                  <div className="signature" style={{ width: "45%", textAlign: "center" }}>
                    <div className="signature-line" style={{ borderTop: "1px solid #333", marginTop: "60px", paddingTop: "8px", fontSize: "12px" }}>
                      {(viewOrder as any).profiles?.full_name || "Cliente"}
                    </div>
                  </div>
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
