import { useAuth } from "@/contexts/AuthContext";
import LoginPage from "@/components/portal/LoginPage";
import AdminDashboard from "@/components/portal/AdminDashboard";
import ClientDashboard from "@/components/portal/ClientDashboard";
import PartnerDashboard from "@/components/portal/PartnerDashboard";

const AreaDoCliente = () => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  if (role === "admin") {
    return <AdminDashboard />;
  }

  if (role === "partner") {
    return <PartnerDashboard />;
  }

  return <ClientDashboard />;
};

export default AreaDoCliente;
