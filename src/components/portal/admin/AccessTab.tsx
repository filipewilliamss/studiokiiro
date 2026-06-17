import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, RefreshCw, Copy, Trash2, Key, User, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface ClientCredential {
  id: string;
  username: string;
  password: string;
  client_name: string;
  created_at: string;
}

const AccessTab = () => {
  const [credentials, setCredentials] = useState<ClientCredential[]>([]);
  const [loading, setLoading] = useState(true);
  const [newClientName, setNewClientName] = useState("");
  const [generating, setGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<{username: string, password: string} | null>(null);

  const fetchCredentials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("client_credentials")
      .select("id, username, client_name, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar acessos");
    } else {
      setCredentials(data as any || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  const generateRandomString = (length: number) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    return Array.from(arr, (n) => chars[n % chars.length]).join("");
  };


  const handleGenerate = async () => {
    const clientName = newClientName.trim();
    if (!clientName) {
      toast.error("Informe o nome do cliente");
      return;
    }

    setGenerating(true);
    setLastGenerated(null);
    const username = clientName.toLowerCase().replace(/\s+/g, ".") + "." + Math.floor(Math.random() * 1000);
    const password = generateRandomString(12);

    // 1. Insert into client_credentials
    const { data: credData, error: credError } = await supabase
      .from("client_credentials")
      .insert({
        client_name: clientName,
        username,
        password,
      })
      .select()
      .single();

    if (credError) {
      toast.error("Erro ao gerar acesso: " + credError.message);
    } else {
      // 2. Also create a profile for this user so they can be linked to projects
      const { error: profileError } = await supabase.from("profiles").insert({
        user_id: credData.id,
        full_name: clientName,
      });

      if (profileError) {
        console.error("Erro ao criar perfil:", profileError);
      }

      setLastGenerated({ username, password });
      toast.success("Acesso gerado com sucesso!");
      setNewClientName("");
      fetchCredentials();
    }
    setGenerating(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("client_credentials").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao excluir acesso");
    } else {
      toast.success("Acesso excluído");
      fetchCredentials();
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            Gestão de Acessos
          </h2>
          <p className="text-sm text-white/50">Gere usuários e senhas para seus clientes acessarem a plataforma.</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <Input
            placeholder="Nome do cliente"
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            className="bg-black/20 border-white/10 text-white max-w-[200px]"
          />
          <Button onClick={handleGenerate} disabled={generating} className="gap-2">
            <Plus className="h-4 w-4" />
            Gerar Acesso
          </Button>
        </div>
      </div>

      {lastGenerated && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Acesso Gerado - Copie as informações abaixo:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-white/40">Usuário</span>
              <div className="flex items-center justify-between bg-black/40 px-3 py-2 rounded-lg border border-white/5">
                <code className="text-white text-sm">{lastGenerated.username}</code>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(lastGenerated.username, "Usuário")} className="h-7 w-7">
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-white/40">Senha Temporária</span>
              <div className="flex items-center justify-between bg-black/40 px-3 py-2 rounded-lg border border-white/5">
                <code className="text-white text-sm">{lastGenerated.password}</code>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(lastGenerated.password, "Senha")} className="h-7 w-7">
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-white/30">Esta senha não será exibida novamente por motivos de segurança.</p>
        </div>
      )}

      <div className="rounded-xl border border-white/10 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="hover:bg-transparent border-white/10">
              <TableHead className="text-white/60">Cliente</TableHead>
              <TableHead className="text-white/60">Usuário</TableHead>
              <TableHead className="text-white/60">Status</TableHead>
              <TableHead className="text-white/60">Criado em</TableHead>
              <TableHead className="text-right text-white/60">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <RefreshCw className="h-6 w-6 animate-spin mx-auto text-primary" />
                </TableCell>
              </TableRow>
            ) : credentials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-white/30 italic">
                  Nenhum acesso gerado ainda.
                </TableCell>
              </TableRow>
            ) : (
              credentials.map((item) => (
                <TableRow key={item.id} className="border-white/5 hover:bg-white/[0.02]">
                  <TableCell className="font-medium text-white">{item.client_name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 group">
                      <code className="bg-white/5 px-2 py-0.5 rounded text-primary text-xs">{item.username}</code>
                      <button onClick={() => copyToClipboard(item.username, "Usuário")} className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Copy className="h-3 w-3 text-white/40 hover:text-white" />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-3 w-3 text-emerald-500" />
                      <span className="text-[10px] text-emerald-500/80 font-medium uppercase tracking-tighter">Protegido</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-white/40 text-xs">
                    {new Date(item.created_at).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="h-8 w-8 text-white/20 hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AccessTab;