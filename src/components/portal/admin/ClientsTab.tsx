import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, Building2, Mail, Phone, Search, Trash2, Pencil, Users, Sparkles, ClipboardList, Check } from "lucide-react";
import { toast } from "sonner";
import { BriefingLinkModal } from "./BriefingLinkModal";
import { ensureBriefingToken } from "@/services/briefingService";
import { methodologyStages } from "@/data/methodologyStages";

const projectTypes = [
  "Logotipo Essencial", "Identidade Visual", "Branding Completo", "Manual de Logotipo",
  "Personal Brand Kit", "Design de Conteúdo para Redes Sociais", "Edição de Vídeo — Reels/Shorts",
  "Edição de Vídeo — Institucional", "Edição de Vídeo — Tutorial/Educativo",
  "Landing Page Simples", "Landing Page Completa", "Site Institucional", "Site Completo",
  "Apresentações Comerciais e Institucionais", "Layout de Transmissão",
];

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
  const { user } = useAuth();
  const [clients, setClients] = useState<Profile[]>([]);
  const [clientProjects, setClientProjects] = useState<Record<string, { id: string; name: string; type: string; briefing_token: string | null; briefing_submitted: boolean }[]>>({});
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editingClient, setEditingClient] = useState<Profile | null>(null);
  const [createInitialProject, setCreateInitialProject] = useState(false);
  const [projectForm, setProjectForm] = useState({
    name: "",
    type: "Logotipo Essencial",
    deadline: "",
  });
  const [modalBriefing, setModalBriefing] = useState<{
    isOpen: boolean;
    projectName: string;
    projectType: string;
    clientName: string;
    clientPhone?: string | null;
    token: string | null;
  }>({
    isOpen: false,
    projectName: "",
    projectType: "",
    clientName: "",
    clientPhone: null,
    token: null,
  });

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    client_type: "novo",
    notes: "",
  });

  const fetchClients = async () => {
    // First get user_ids that have admin or partner roles (to exclude them)
    const { data: roleUsers } = await supabase
      .from("user_roles")
      .select("user_id")
      .in("role", ["admin", "partner"]);

    const excludeIds = (roleUsers || []).map((r) => r.user_id);

    let query = supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (excludeIds.length > 0) {
      query = query.not("user_id", "in", `(${excludeIds.join(",")})`);
    }

    const [clientsRes, projectsRes] = await Promise.all([
      query,
      supabase.from("projects").select("id, name, type, client_id, briefing_links(token, submitted_at)"),
    ]);

    if (clientsRes.error) {
      toast.error("Não foi possível carregar os clientes");
      return;
    }

    if (clientsRes.data) setClients(clientsRes.data);

    if (projectsRes.data) {
      const map: Record<string, { id: string; name: string; type: string; briefing_token: string | null; briefing_submitted: boolean }[]> = {};
      projectsRes.data.forEach((p: any) => {
        if (!map[p.client_id]) map[p.client_id] = [];
        map[p.client_id].push({
          id: p.id,
          name: p.name,
          type: p.type,
          briefing_token: p.briefing_links?.token ?? null,
          briefing_submitted: !!p.briefing_links?.submitted_at,
        });
      });
      setClientProjects(map);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchClients();
  }, [user?.id]);

  const openCreateDialog = () => {
    setEditingClient(null);
    setCreateInitialProject(false);
    setProjectForm({ name: "", type: "Logotipo Essencial", deadline: "" });
    setForm({ full_name: "", email: "", phone: "", company: "", client_type: "novo", notes: "" });
    setOpen(true);
  };

  const openEditDialog = (client: Profile) => {
    setEditingClient(client);
    setForm({
      full_name: client.full_name,
      email: client.email || "",
      phone: client.phone || "",
      company: client.company || "",
      client_type: client.client_type || "novo",
      notes: client.notes || "",
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingClient) {
      // Check if email changed - if so, update auth user email via edge function
      const emailChanged = form.email && form.email !== editingClient.email;
      
      if (emailChanged) {
        const response = await supabase.functions.invoke("update-client-email", {
          body: { user_id: editingClient.user_id, new_email: form.email },
        });
        if (response.error || response.data?.error) {
          toast.error("Erro ao atualizar e-mail: " + (response.data?.error || response.error?.message));
          setLoading(false);
          return;
        }
      }

      const { error } = await supabase.from("profiles").update({
        full_name: form.full_name,
        email: form.email || null,
        phone: form.phone || null,
        company: form.company || null,
        client_type: form.client_type,
        notes: form.notes || null,
      }).eq("id", editingClient.id);
      if (error) toast.error("Erro ao atualizar cliente");
      else { toast.success("Cliente atualizado!"); setOpen(false); setEditingClient(null); fetchClients(); }
    } else {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) { toast.error("Você precisa estar logado"); setLoading(false); return; }
        const response = await supabase.functions.invoke("create-client", {
          body: { email: form.email, full_name: form.full_name, phone: form.phone, company: form.company, client_type: form.client_type, notes: form.notes },
        });
        if (response.error || response.data?.error) {
          toast.error("Erro ao criar cliente: " + (response.data?.error || response.error?.message));
        } else {
          const userId = response.data?.user_id;

          // Se a opção de criar projeto inicial estiver ativada
          if (createInitialProject && userId) {
            const { data: newProfile } = await supabase
              .from("profiles")
              .select("id, full_name, company, phone")
              .eq("user_id", userId)
              .maybeSingle();

            if (newProfile) {
              const projName = projectForm.name.trim() || `${form.company || form.full_name} — ${projectForm.type}`;
              const { data: projData, error: projErr } = await supabase.from("projects").insert({
                name: projName,
                type: projectForm.type,
                client_id: newProfile.id,
                deadline: projectForm.deadline || null,
                priority: "normal",
              }).select("id").single();

              if (!projErr && projData) {
                const stagesData = methodologyStages[projectForm.type];
                if (stagesData?.length) {
                  await supabase.from("project_stages").insert(
                    stagesData.map((s) => ({ project_id: projData.id, name: s.name, description: s.description, sort_order: s.sort_order }))
                  );
                }

                // Gerar e garantir o token de briefing exclusivo
                const token = await ensureBriefingToken(projData.id);
                if (token) {
                  setModalBriefing({
                    isOpen: true,
                    projectName: projName,
                    projectType: projectForm.type,
                    clientName: newProfile.full_name,
                    clientPhone: newProfile.phone,
                    token: token,
                  });
                }
                toast.success(`Cliente e projeto criados! Link do briefing gerado.`);
              } else {
                toast.success(`Cliente ${form.full_name} criado, mas houve erro ao criar projeto.`);
              }
            } else {
              toast.success(`Cliente ${form.full_name} adicionado com sucesso!`);
            }
          } else {
            toast.success(`Cliente ${form.full_name} adicionado com sucesso!`);
          }

          setOpen(false);
          fetchClients();
        }
      } catch (err: any) { toast.error("Erro inesperado: " + err.message); }
    }
    setForm({ full_name: "", email: "", phone: "", company: "", client_type: "novo", notes: "" });
    setLoading(false);
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <Input
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
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
        <Dialog open={open} onOpenChange={(o) => { if (!o) setEditingClient(null); setOpen(o); }}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={openCreateDialog}>
              <UserPlus className="h-4 w-4" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle style={{ fontFamily: "var(--font-display)" }}>{editingClient ? "Editar Cliente" : "Adicionar Cliente"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                {!editingClient && (
                  <div className="col-span-2 pt-3 border-t border-border space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="create-project"
                        checked={createInitialProject}
                        onCheckedChange={(checked) => {
                          const isChecked = !!checked;
                          setCreateInitialProject(isChecked);
                          if (isChecked && !projectForm.name) {
                            const suggested = form.company || form.full_name ? `${form.company || form.full_name} — ${projectForm.type}` : "";
                            setProjectForm(prev => ({ ...prev, name: suggested }));
                          }
                        }}
                      />
                      <label
                        htmlFor="create-project"
                        className="text-xs font-semibold text-foreground cursor-pointer flex items-center gap-1.5 select-none"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        Criar projeto inicial e gerar link de briefing agora
                      </label>
                    </div>

                    {createInitialProject && (
                      <div className="bg-secondary/40 border border-border/80 rounded-xl p-3.5 space-y-3">
                        <div className="space-y-1.5">
                          <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Tipo de Projeto</label>
                          <Select
                            value={projectForm.type}
                            onValueChange={(v) => {
                              setProjectForm(prev => ({
                                ...prev,
                                type: v,
                                name: prev.name || `${form.company || form.full_name || "Cliente"} — ${v}`
                              }));
                            }}
                          >
                            <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {projectTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          {methodologyStages[projectForm.type] && (
                            <p className="text-[10px] text-primary">✓ {methodologyStages[projectForm.type].length} etapas da metodologia serão criadas</p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Nome do Projeto</label>
                          <Input
                            value={projectForm.name}
                            onChange={(e) => setProjectForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder={form.company || form.full_name ? `${form.company || form.full_name} — ${projectForm.type}` : "Ex: Redesign de Marca"}
                            className="h-9"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Prazo Estimado (Opcional)</label>
                          <Input
                            type="date"
                            value={projectForm.deadline}
                            onChange={(e) => setProjectForm(prev => ({ ...prev, deadline: e.target.value }))}
                            className="h-9"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Salvando..." : editingClient ? "Salvar Alterações" : "Adicionar Cliente"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Client list */}
      <div className="grid gap-3">
        {filtered.length > 0 && (
          <div className="flex items-center gap-2 px-1">
            <Checkbox
              checked={selectedIds.size === filtered.length && filtered.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <span className="text-xs text-white/40">Selecionar todos</span>
          </div>
        )}
        {filtered.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-7 w-7 text-white/30" />
            </div>
            <p className="text-white font-display font-semibold text-lg mb-1">Nenhum cliente por aqui… ainda.</p>
            <p className="text-white/40 text-sm max-w-sm mx-auto">Quando você adicionar um cliente, ele aparece neste painel para você acompanhar cada detalhe.</p>
          </div>
        ) : (
          filtered.map((client) => (
            <div
              key={client.id}
              className={`relative bg-black border rounded-xl p-5 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/[0.05] overflow-hidden ${
                selectedIds.has(client.id) ? "border-primary/40" : "border-black/80 hover:border-primary/25"
              }`}
            >
              {/* Yellow accent line on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedIds.has(client.id)}
                    onCheckedChange={() => toggleSelect(client.id)}
                    className="mt-1"
                  />
                  <div className="space-y-1.5">
                    <h3 className="font-display font-semibold text-[15px] text-white group-hover:text-primary transition-colors duration-300">{client.full_name || "Sem nome"}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                      {client.email && (
                        <span className="flex items-center gap-1.5">
                          <Mail className="h-3 w-3 text-white/30" /> {client.email}
                        </span>
                      )}
                      {client.phone && (
                        <span className="flex items-center gap-1.5">
                          <Phone className="h-3 w-3 text-white/30" /> {client.phone}
                        </span>
                      )}
                      {client.company && (
                        <span className="flex items-center gap-1.5">
                          <Building2 className="h-3 w-3 text-white/30" /> {client.company}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold border border-primary/15 tracking-wide">
                    {clientTypeLabels[client.client_type || "novo"] || client.client_type}
                  </span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-primary hover:bg-primary/10 transition-all duration-300" onClick={() => openEditDialog(client)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              {/* Client projects & briefing shortcut */}
              {clientProjects[client.id] && clientProjects[client.id].length > 0 && (
                <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 ml-8">
                  <span className="text-[11px] text-white/40 font-medium">Projetos:</span>
                  {clientProjects[client.id].map((p) => (
                    <div key={p.id} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-xs">
                      <span className="text-white/80 font-medium truncate max-w-[150px]">{p.name}</span>
                      <span className="text-white/30">•</span>
                      {p.briefing_submitted ? (
                        <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                          <Check className="h-3 w-3" /> Briefing respondido
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="text-[10px] text-primary hover:underline font-medium flex items-center gap-1 cursor-pointer"
                          onClick={async (e) => {
                            e.stopPropagation();
                            const token = p.briefing_token || await ensureBriefingToken(p.id);
                            if (token) {
                              setModalBriefing({
                                isOpen: true,
                                projectName: p.name,
                                projectType: p.type,
                                clientName: client.full_name,
                                clientPhone: client.phone,
                                token: token,
                              });
                            }
                          }}
                        >
                          <ClipboardList className="h-3 w-3" /> Enviar briefing
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {client.notes && (
                <p className="text-xs text-white/40 mt-3 border-t border-white/10 pt-3 ml-8">{client.notes}</p>
              )}
            </div>
          ))
        )}
      </div>

      <BriefingLinkModal
        isOpen={modalBriefing.isOpen}
        onClose={() => setModalBriefing((prev) => ({ ...prev, isOpen: false }))}
        projectName={modalBriefing.projectName}
        projectType={modalBriefing.projectType}
        clientName={modalBriefing.clientName}
        clientPhone={modalBriefing.clientPhone}
        token={modalBriefing.token}
      />
    </div>
  );
};

export default ClientsTab;
