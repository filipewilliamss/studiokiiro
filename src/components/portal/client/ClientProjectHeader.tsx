import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/services/projectService";

interface ClientProjectHeaderProps {
  project: Project;
  onBack: () => void;
  statusLabels: Record<string, string>;
}

export const ClientProjectHeader = ({
  project,
  onBack,
  statusLabels,
}: ClientProjectHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="text-white/60 hover:text-white hover:bg-white/5 -ml-2 gap-1.5"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para todos os projetos
      </Button>

      <div className="bg-primary rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative">
          <h1 className="text-2xl sm:text-3xl font-bold text-black font-display tracking-tight">
            {project.name}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-sm text-black/80 font-medium">{project.type}</p>
            <span className="text-[10px] px-2.5 py-1 rounded-lg bg-black/15 text-black font-bold uppercase tracking-wider">
              {statusLabels[project.status] || project.status}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-5 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-black/80">Progresso geral</span>
              <span className="font-bold text-black">{project.progress}%</span>
            </div>
            <div className="h-2.5 bg-black/15 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="h-full bg-black rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientProjectHeader;
