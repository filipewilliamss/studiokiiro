import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import kiiroLogo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { LogOut, Users, FolderKanban, DollarSign, Clock } from "lucide-react";

const AdminDashboard = () => {
  const { profile, signOut } = useAuth();
  const [stats, setStats] = useState({ activeProjects: 0, totalClients: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [projectsRes, clientsRes] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact" }).neq("status", "entregue"),
        supabase.from("profiles").select("id", { count: "exact" }),
      ]);
      setStats({
        activeProjects: projectsRes.count ?? 0,
        totalClients: clientsRes.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Projetos Ativos", value: stats.activeProjects, icon: FolderKanban, color: "text-primary" },
    { label: "Clientes", value: stats.totalClients, icon: Users, color: "text-primary" },
    { label: "Prazo Próximo (7d)", value: "—", icon: Clock, color: "text-primary" },
    { label: "A Receber (mês)", value: "—", icon: DollarSign, color: "text-primary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={kiiroLogo} alt="Studio Kiiro" className="h-7" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Admin</span>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            Olá, {profile?.full_name || "Admin"}.
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Painel administrativo do Studio Kiiro.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div key={card.label} className="bg-card border border-border rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <card.icon className={`h-4 w-4 ${card.color}`} />
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{card.label}</span>
              </div>
              <p className="text-3xl font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-medium text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Acesso Rápido
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start h-auto py-4 px-5">
              <Users className="h-4 w-4 mr-3 text-primary" />
              <div className="text-left">
                <div className="text-sm font-medium">Clientes</div>
                <div className="text-xs text-muted-foreground">Gerenciar clientes</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-4 px-5">
              <FolderKanban className="h-4 w-4 mr-3 text-primary" />
              <div className="text-left">
                <div className="text-sm font-medium">Projetos</div>
                <div className="text-xs text-muted-foreground">Gerenciar projetos</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-4 px-5">
              <DollarSign className="h-4 w-4 mr-3 text-primary" />
              <div className="text-left">
                <div className="text-sm font-medium">Financeiro</div>
                <div className="text-xs text-muted-foreground">Pagamentos e custos</div>
              </div>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
