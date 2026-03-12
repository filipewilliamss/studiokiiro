import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import kiiroLogo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "magic" | "forgot">("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("E-mail ou senha incorretos.");
    setLoading(false);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/area-do-cliente` },
    });

    if (error) {
      setError("Erro ao enviar o link. Tente novamente.");
    } else {
      setMessage("Link de acesso enviado para seu e-mail! Verifique sua caixa de entrada.");
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/area-do-cliente/reset-password`,
    });

    if (error) {
      setError("Erro ao enviar o link de redefinição.");
    } else {
      setMessage("Link de redefinição enviado! Verifique seu e-mail.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-6">
          <img src={kiiroLogo} alt="Studio Kiiro" className="h-10" />
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Área do Cliente
            </h1>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
              Bem-vindo à sua área no Studio Kiiro.<br />
              Acompanhe seus projetos em tempo real.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">E-mail</label>
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
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Senha</label>
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
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}

          {mode === "magic" && (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">E-mail</label>
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Enviando..." : "Enviar link mágico"}
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}

          {mode === "forgot" && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">E-mail</label>
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Enviando..." : "Redefinir senha"}
              </Button>
            </form>
          )}

          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          {message && <p className="text-sm text-primary text-center">{message}</p>}

          {/* Mode switchers */}
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            {mode !== "login" && (
              <button
                onClick={() => { setMode("login"); setError(""); setMessage(""); }}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Entrar com e-mail e senha
              </button>
            )}
            {mode !== "magic" && (
              <button
                onClick={() => { setMode("magic"); setError(""); setMessage(""); }}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Entrar com link mágico
              </button>
            )}
            {mode !== "forgot" && (
              <button
                onClick={() => { setMode("forgot"); setError(""); setMessage(""); }}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Esqueci minha senha
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Studio Kiiro. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
