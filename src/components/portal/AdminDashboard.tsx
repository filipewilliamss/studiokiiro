import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Users, FolderKanban, DollarSign, FileText, Receipt } from "lucide-react";
import ClientsTab from "./admin/ClientsTab";
import ProjectsTab from "./admin/ProjectsTab";
import FinanceTab from "./admin/FinanceTab";
import ServiceOrdersTab from "./admin/ServiceOrdersTab";
import QuotesTab from "./admin/QuotesTab";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Sub-header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-16 md:top-20 z-30 mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">Admin</span>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            Olá, {profile?.full_name || "Admin"}.
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Gerencie clientes, projetos, finanças, orçamentos e ordens de serviço.</p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="bg-card border border-border h-12 p-1 gap-1 flex flex-wrap">
            <TabsTrigger value="clients" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Clientes</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FolderKanban className="h-4 w-4" />
              <span className="hidden sm:inline">Projetos</span>
            </TabsTrigger>
            <TabsTrigger value="finance" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Financeiro</span>
            </TabsTrigger>
            <TabsTrigger value="quotes" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Receipt className="h-4 w-4" />
              <span className="hidden sm:inline">Orçamentos</span>
            </TabsTrigger>
            <TabsTrigger value="service-orders" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Ordens de Serviço</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <ClientsTab />
          </TabsContent>
          <TabsContent value="projects">
            <ProjectsTab />
          </TabsContent>
          <TabsContent value="finance">
            <FinanceTab />
          </TabsContent>
          <TabsContent value="quotes">
            <QuotesTab />
          </TabsContent>
          <TabsContent value="service-orders">
            <ServiceOrdersTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
