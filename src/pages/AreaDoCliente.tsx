import { useAuth } from "@/contexts/AuthContext";
import LoginPage from "@/components/portal/LoginPage";
import AdminDashboard from "@/components/portal/AdminDashboard";
import ClientDashboard from "@/components/portal/ClientDashboard";
import PartnerDashboard from "@/components/portal/PartnerDashboard";

const AreaDoCliente = () => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        <div className="animate-pulse text-primary font-display font-bold uppercase tracking-[0.3em] text-[10px]">Studio Kiiro</div>
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
