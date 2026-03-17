import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import kiiroLogo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Sparkles, CheckCircle, Lock, Users } from "lucide-react";

type LoginMode = "client" | "partner";

const LoginPage = () => {
  const [mode, setMode] = useState<LoginMode>("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [stayConnected, setStayConnected] = useState(true);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/area-do-cliente` },
    });

    if (error) {
      setError("Erro ao enviar o link. Tente novamente.");
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  const handlePartnerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("E-mail ou senha incorretos. Tente novamente.");
    }
    setLoading(false);
  };

  const switchMode = (newMode: LoginMode) => {
    setMode(newMode);
    setEmail("");
    setPassword("");
    setError("");
    setSent(false);
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
            <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              {mode === "client" ? "Área do Cliente" : "Painel do Parceiro"}
            </h1>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
              {mode === "client" ? (
                <>Bem-vindo à sua área no Studio Kiiro.<br />Acompanhe seus projetos em tempo real.</>
              ) : (
                <>Acesse o painel do parceiro comercial.<br />Acompanhe projetos e comissões.</>
              )}
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          {mode === "client" && sent ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Link enviado!</p>
                <p className="text-xs text-muted-foreground">
                  Verifique sua caixa de entrada em<br />
                  <span className="font-medium text-foreground">{email}</span>
                </p>
              </div>
              <button
                onClick={() => { setSent(false); setEmail(""); }}
                className="text-xs text-muted-foreground hover:text-primary transition-colors mt-2"
              >
                Usar outro e-mail
              </button>
            </div>
          ) : mode === "client" ? (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
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
                  Manter conectado por 30 dias
                </label>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Enviando..." : "Enviar link de acesso"}
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
              {error && <p className="text-sm text-destructive text-center">{error}</p>}
            </form>
          ) : (
            <form onSubmit={handlePartnerLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parceiro@email.com"
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
                <Lock className="ml-2 h-4 w-4" />
              </Button>
              {error && <p className="text-sm text-destructive text-center">{error}</p>}
            </form>
          )}
        </div>

        {/* Mode toggle */}
        <div className="text-center">
          {mode === "client" ? (
            <button
              onClick={() => switchMode("partner")}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Users className="h-3.5 w-3.5" />
              Login de parceiro
            </button>
          ) : (
            <button
              onClick={() => switchMode("client")}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              Voltar ao login de cliente
            </button>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Studio Kiiro. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
