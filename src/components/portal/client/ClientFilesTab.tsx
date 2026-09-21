import { motion } from "framer-motion";
import { FolderOpen, FileDown, ExternalLink, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { ProjectFile } from "@/services/projectService";

interface ClientFilesTabProps {
  files: ProjectFile[];
  isLoading: boolean;
}

export const ClientFilesTab = ({ files, isLoading }: ClientFilesTabProps) => {
  const handleDownloadAll = () => {
    if (files.length === 0) return;
    files.forEach((f) => {
      if (f.downloadUrl) {
        window.open(f.downloadUrl, "_blank");
      }
    });
    toast.success("Iniciando download dos arquivos...");
  };

  // Group files by prefix (e.g. 01_, 02_)
  const groups: Record<string, ProjectFile[]> = {};
  files.forEach((f) => {
    const parts = f.name.split("_");
    const group = parts.length > 1 && parts[0].length <= 3 ? `${parts[0]} ${parts[1]}` : "Entregáveis Gerais";
    if (!groups[group]) groups[group] = [];
    groups[group].push(f);
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-black p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <label className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold">
          Arquivos do Projeto
        </label>
        {files.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs rounded-xl border-white/10 hover:bg-white/5 text-white"
            onClick={handleDownloadAll}
          >
            <FileDown className="h-3.5 w-3.5 text-primary" />
            Baixar Todos ({files.length})
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="py-12 text-center">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-3" />
          <p className="text-white/40 text-xs font-mono">Gerando links seguros de download...</p>
        </div>
      ) : files.length === 0 ? (
        <div className="py-12 text-center">
          <FolderOpen className="h-8 w-8 text-white/15 mx-auto mb-2" />
          <p className="text-white/35 text-sm">Nenhum arquivo liberado ainda.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groups)
            .sort()
            .map(([groupName, groupFiles]) => (
              <div key={groupName} className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                  <Folder className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold text-white/70 uppercase tracking-wider font-display">
                    {groupName}
                  </span>
                </div>

                <div className="grid gap-2">
                  {groupFiles.map((file, idx) => (
                    <motion.div
                      key={file.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="relative flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-200 gap-3 group"
                    >
                      <span className="text-sm text-white font-medium truncate flex-1 pl-2">
                        {file.name}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        {file.viewUrl && (
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="gap-1.5 rounded-xl text-white border-white/20 hover:bg-white/10 text-xs"
                          >
                            <a href={file.viewUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3.5 w-3.5" />
                              Abrir
                            </a>
                          </Button>
                        )}
                        {file.downloadUrl && (
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="gap-1.5 rounded-xl text-white/60 hover:text-white text-xs"
                          >
                            <a href={file.downloadUrl} target="_blank" rel="noopener noreferrer">
                              <FileDown className="h-3.5 w-3.5 text-primary" />
                              Baixar
                            </a>
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ClientFilesTab;
