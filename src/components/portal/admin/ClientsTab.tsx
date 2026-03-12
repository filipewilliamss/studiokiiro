import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, Building2, Mail, Phone, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  client_type: string | null;
  notes: string | null;
  created_at: string;
}

const clientTypeLabels: Record<string, string> = {
  novo: "Novo",
  ativo: "Ativo",
  recorrente: "Recorrente",
  inativo: "Inativo",
};

const ClientsTab = () => {
  const [clients, setClients] = useState<Profile[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    client_type: "novo",
    notes: "",
  });

  const fetchClients = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // First create user via magic link (invites them)
    const { data: authData, error: authError } = await supabase.auth.signInWithOtp({
      email: form.email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/area-do-cliente`,
      },
    });

    if (authError) {
      toast.error("Erro ao criar convite: " + authError.message);
      setLoading(false);
      return;
    }

    // We update the profile after it's created by the trigger
    // For now, wait a moment and update by email
    setTimeout(async () => {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", form.email)
        .single();

      if (profileData) {
        await supabase.from("profiles").update({
          full_name: form.full_name,
          phone: form.phone || null,
          company: form.company || null,
          client_type: form.client_type,
          notes: form.notes || null,
        }).eq("id", profileData.id);
      }

      toast.success(`Convite enviado para ${form.email}`);
      setForm({ full_name: "", email: "", phone: "", company: "", client_type: "novo", notes: "" });
      setOpen(false);
      setLoading(false);
      fetchClients();
    }, 2000);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((c) => c.id)));
    }
  };

  const handleDelete = async () => {
    const ids = Array.from(selectedIds);
    const { error } = await supabase.from("profiles").delete().in("id", ids);
    if (error) {
      toast.error("Erro ao excluir clientes");
    } else {
      toast.success(`${ids.length} cliente(s) excluído(s)`);
      setSelectedIds(new Set());
      fetchClients();
    }
  };

  const filtered = clients.filter((c) =>
    (c.full_name + c.email + c.company).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>
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
                  <AlertDialogTitle>Excluir clientes?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação não pode ser desfeita. {selectedIds.size} cliente(s) e seus dados associados serão removidos.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle style={{ fontFamily: "var(--font-display)" }}>Adicionar Cliente</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Nome completo *</label>
                  <Input
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    required
                    placeholder="Nome do cliente"
                  />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">E-mail *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      placeholder="email@exemplo.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Telefone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(00) 00000-0000"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Empresa</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Empresa"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Tipo de cliente</label>
                  <Select value={form.client_type} onValueChange={(v) => setForm({ ...form, client_type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="novo">Novo</SelectItem>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="recorrente">Recorrente</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Observações</label>
                  <Textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Notas sobre o cliente..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Enviando convite..." : "Adicionar e Convidar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Client list */}
      <div className="grid gap-3">
        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground text-sm">Nenhum cliente encontrado.</p>
          </div>
        ) : (
          filtered.map((client) => (
            <div
              key={client.id}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium text-foreground">{client.full_name || "Sem nome"}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    {client.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {client.email}
                      </span>
                    )}
                    {client.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {client.phone}
                      </span>
                    )}
                    {client.company && (
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" /> {client.company}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {clientTypeLabels[client.client_type || "novo"] || client.client_type}
                </span>
              </div>
              {client.notes && (
                <p className="text-xs text-muted-foreground mt-3 border-t border-border pt-3">{client.notes}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientsTab;
