import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import kiiroLogo from "@/assets/logo.webp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Sparkles, Lock, Users, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type LoginMode = "client" | "admin" | "partner";

const LoginPage = () => {
  const [mode, setMode] = useState<LoginMode>("client");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [stayConnected, setStayConnected] = useState(true);
  const { signInCustom, setSessionRole } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (trimmedUsername.length > 100 || trimmedPassword.length > 100) {
      toast.error("Usuário ou senha inválidos.");
      return;
    }

    setLoading(true);

    try {
      // Clear any stale custom session to avoid role being locked from a previous login
      localStorage.removeItem("kiiro_custom_session");

      // 1. Verify credentials against the database (returns id, name, role, email)
      const { data, error } = await supabase.rpc("verify_client_credentials", {
        p_username: trimmedUsername,
        p_password: trimmedPassword
      });

      if (error) {
        console.error("Erro na verificação:", error.message);
        throw error;
      }

      if (!data || data.length === 0) {
        toast.error("Usuário ou senha incorretos.");
        return;
      }

      const userFound: any = data[0];

      // 2. If the user has an email in auth.users, create a real Supabase session
      if (userFound.email) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: userFound.email,
          password: trimmedPassword,
        });

        if (signInError) {
          console.error("Erro ao iniciar sessão auth:", signInError.message);
          toast.error("Não foi possível iniciar a sessão. Verifique suas credenciais.");
          return;
        }

        // Seed role/profile imediatamente para evitar flash do ClientDashboard
        // enquanto o AuthContext busca user_roles do banco.
        setSessionRole(userFound.role as LoginMode, {
          full_name: userFound.client_name,
          company: null,
        });

        toast.success(`Bem-vindo, ${userFound.client_name}!`);
      } else {
        // Fallback (legacy custom session)
        signInCustom(userFound.id, userFound.role as LoginMode, { full_name: userFound.client_name, company: null });
        toast.success(`Bem-vindo, ${userFound.client_name}!`);
      }
    } catch (err: any) {
      toast.error("Ocorreu um erro ao tentar entrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };


  const switchMode = (newMode: LoginMode) => {
    setMode(newMode);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-6">
          <Link to="/">
            <img src={kiiroLogo} alt="Studio Kiiro" className="h-10 hover:opacity-80 transition-opacity cursor-pointer" />
          </Link>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-foreground font-display">
              {mode === "client" ? "Área do Cliente" : mode === "admin" ? "Painel Administrativo" : "Painel do Parceiro"}
            </h1>
            <p className="text-sm text-muted-foreground font-body">
              {mode === "client" ? (
                <>Acesse sua área exclusiva no Studio Kiiro.<br />Use seu usuário e senha fornecidos.</>
              ) : mode === "admin" ? (
                <>Acesso restrito para administradores.<br />Gestão interna do estúdio.</>
              ) : (
                <>Acesse o painel do parceiro comercial.<br />Acompanhe projetos e comissões.</>
              )}
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Usuário
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nome de usuário"
                  className="pl-10 bg-background border-border"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-background border-border"
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="stay-connected"
                checked={stayConnected}
                onCheckedChange={(checked) => setStayConnected(checked === true)}
              />
              <label htmlFor="stay-connected" className="text-xs text-muted-foreground cursor-pointer select-none">
                Manter conectado
              </label>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>

        {/* Mode toggle */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex justify-center gap-4">
            {mode !== "client" && (
              <button
                onClick={() => switchMode("client")}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Users className="h-3.5 w-3.5" />
                Área do Cliente
              </button>
            )}
            {mode !== "admin" && (
              <button
                onClick={() => switchMode("admin")}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Administrador
              </button>
            )}
          </div>
          
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Studio Kiiro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;