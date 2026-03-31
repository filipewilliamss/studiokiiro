import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { FilePlus, Hash, Calendar, CheckCircle2, XCircle, Clock, Trash2, Plus, Pencil, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Profile { id: string; full_name: string; company: string | null; }
interface Proposal {
  id: string; sequential_number: number; client_id: string; project_type: string;
  description: string | null; total_value: number; status: string; sub_status: string;
  estimated_margin: number | null; created_at: string;
  profiles?: Profile;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  "Enviada": { label: "Enviada", color: "bg-blue-500/10 text-blue-400", icon: <Clock className="h-3.5 w-3.5" /> },
  "Em Negociação": { label: "Em Negociação", color: "bg-amber-500/10 text-amber-400", icon: <TrendingUp className="h-3.5 w-3.5" /> },
  "Aceita": { label: "Aceita", color: "bg-emerald-500/10 text-emerald-400", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  "Recusada": { label: "Recusada", color: "bg-destructive/10 text-destructive", icon: <XCircle className="h-3.5 w-3.5" /> },
};

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

const ProposalsTab = () => {
  const { user } = useAuth();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [clients, setClients] = useState<Profile[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null);

  const [form, setForm] = useState({
    client_id: "", project_type: "", description: "", total_value: "",
    sub_status: "Enviada", estimated_margin: ""
  });

  const fetchAll = async () => {
    const [quotesRes, clientsRes] = await Promise.all([
      supabase.from("quotes").select("*, profiles!quotes_client_id_fkey(id, full_name, company)").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id, full_name, company"),
    ]);

    if (quotesRes.data) setProposals(quotesRes.data as any);
    if (clientsRes.data) setClients(clientsRes.data);
  };

  useEffect(() => {
    if (!user) return;
    fetchAll();
  }, [user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      client_id: form.client_id,
      project_type: form.project_type,
      description: form.description || null,
      total_value: parseFloat(form.total_value) || 0,
      sub_status: form.sub_status,
      estimated_margin: parseFloat(form.estimated_margin) || null,
    };

    if (editingProposal) {
      const { error } = await supabase.from("quotes").update(payload).eq("id", editingProposal.id);
      if (error) toast.error("Erro ao atualizar proposta");
      else { toast.success("Proposta atualizada!"); setOpen(false); fetchAll(); }
    } else {
      const { error } = await supabase.from("quotes").insert(payload);
      if (error) toast.error("Erro ao criar proposta");
      else { toast.success("Proposta criada!"); setOpen(false); fetchAll(); }
    }
    setLoading(false);
  };

  const openEdit = (p: Proposal) => {
    setEditingProposal(p);
    setForm({
      client_id: p.client_id,
      project_type: p.project_type,
      description: p.description || "",
      total_value: String(p.total_value),
      sub_status: p.sub_status || "Enviada",
      estimated_margin: String(p.estimated_margin || ""),
    });
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Funil de Vendas — Propostas</h2>
        <Button className="gap-2" onClick={() => { setEditingProposal(null); setForm({ client_id: "", project_type: "", description: "", total_value: "", sub_status: "Enviada", estimated_margin: "" }); setOpen(true); }}>
          <Plus className="h-4 w-4" /> Nova Proposta
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingProposal ? "Editar Proposta" : "Nova Proposta"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase text-muted-foreground">Cliente</label>
              <Select value={form.client_id} onValueChange={(v) => setForm({ ...form, client_id: v })}>
                <SelectTrigger><SelectValue placeholder="Selecione o cliente" /></SelectTrigger>
                <SelectContent>{clients.map(c => <SelectItem key={c.id} value={c.id}>{c.full_name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase text-muted-foreground">Serviço</label>
              <Input value={form.project_type} onChange={e => setForm({ ...form, project_type: e.target.value })} placeholder="Ex: Branding Completo" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase text-muted-foreground">Valor Total</label>
                <Input type="number" step="0.01" value={form.total_value} onChange={e => setForm({ ...form, total_value: e.target.value })} placeholder="0.00" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase text-muted-foreground">Margem Estimada</label>
                <Input type="number" step="0.01" value={form.estimated_margin} onChange={e => setForm({ ...form, estimated_margin: e.target.value })} placeholder="0.00" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase text-muted-foreground">Status da Proposta</label>
              <Select value={form.sub_status} onValueChange={(v) => setForm({ ...form, sub_status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Enviada">Enviada</SelectItem>
                  <SelectItem value="Em Negociação">Em Negociação</SelectItem>
                  <SelectItem value="Aceita">Aceita</SelectItem>
                  <SelectItem value="Recusada">Recusada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase text-muted-foreground">Observações</label>
              <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Salvando..." : "Salvar Proposta"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-3">
        {proposals.map((p, i) => {
          const cfg = statusConfig[p.sub_status] || statusConfig["Enviada"];
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => openEdit(p)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-muted-foreground">PROP-{String(p.sequential_number).padStart(4, '0')}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${cfg.color} flex items-center gap-1`}>
                      {cfg.icon} {cfg.label}
                    </span>
                  </div>
                  <h3 className="font-medium text-foreground mt-1">{p.project_type}</h3>
                  <p className="text-xs text-muted-foreground">{p.profiles?.full_name} {p.profiles?.company ? `— ${p.profiles.company}` : ""}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{formatCurrency(p.total_value)}</p>
                  {p.estimated_margin && (
                    <p className="text-[10px] text-emerald-400 font-medium mt-1">Margem: {formatCurrency(p.estimated_margin)}</p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
        {proposals.length === 0 && (
          <div className="text-center py-10 bg-card border border-border rounded-xl border-dashed">
            <p className="text-sm text-muted-foreground">Nenhuma proposta encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalsTab;
