import { useState } from "react";
import { motion } from "framer-motion";
import {
  FolderPlus, Search, Filter, Layers, PauseCircle, CheckCircle2,
  ListFilter, AlertCircle, ChevronDown, Sparkles
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KanbanCard, type KanbanProject } from "./KanbanCard";

interface KanbanBoardProps {
  projects: KanbanProject[];
  onSelectProject: (project: KanbanProject) => void;
  onMoveStatus: (projectId: string, newStatus: string) => Promise<void> | void;
  onCreateProjectClick: () => void;
}

interface ColumnDef {
  id: string;
  label: string;
  accentColor: string;
  headerBorder: string;
  badgeBg: string;
}

const KANBAN_COLUMNS: ColumnDef[] = [
  {
    id: "briefing",
    label: "Briefing",
    accentColor: "text-blue-400",
    headerBorder: "border-blue-500/30",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    id: "planejamento",
    label: "Planejamento",
    accentColor: "text-amber-400",
    headerBorder: "border-amber-500/30",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    id: "producao",
    label: "Produção",
    accentColor: "text-[#FFCA16]",
    headerBorder: "border-[#FFCA16]/40",
    badgeBg: "bg-[#FFCA16]/10 text-[#FFCA16] border-[#FFCA16]/30",
  },
  {
    id: "revisao",
    label: "Revisão",
    accentColor: "text-purple-400",
    headerBorder: "border-purple-500/30",
    badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    id: "finalizacao",
    label: "Finalização",
    accentColor: "text-emerald-400",
    headerBorder: "border-emerald-500/30",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    id: "entregue",
    label: "Entregue",
    accentColor: "text-white/50",
    headerBorder: "border-white/10",
    badgeBg: "bg-white/5 text-white/60 border-white/10",
  },
];

export const KanbanBoard = ({
  projects,
  onSelectProject,
  onMoveStatus,
  onCreateProjectClick,
}: KanbanBoardProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPaused, setShowPaused] = useState(false);
  const [activeDropColumn, setActiveDropColumn] = useState<string | null>(null);

  // Filtragem
  const filteredProjects = projects.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q) ||
      p.profiles?.full_name.toLowerCase().includes(q) ||
      p.profiles?.company?.toLowerCase().includes(q)
    );
  });

  const pausedProjects = filteredProjects.filter((p) => p.status === "pausado");

  // Drag and Drop
  const handleDragOver = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    if (activeDropColumn !== colId) {
      setActiveDropColumn(colId);
    }
  };

  const handleDragLeave = () => {
    setActiveDropColumn(null);
  };

  const handleDrop = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    setActiveDropColumn(null);
    const projectId = e.dataTransfer.getData("text/plain");
    if (projectId) {
      onMoveStatus(projectId, colId);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Controls: Search, Filters & New Project Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0B0C0B] border border-white/10 p-3 rounded-2xl">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por projeto, cliente ou serviço..."
              className="bg-white/5 border-white/10 text-white text-xs pl-9 h-9 rounded-xl focus:border-[#FFCA16]"
            />
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowPaused(!showPaused)}
            className={`border-white/15 text-xs h-9 rounded-xl gap-1.5 ${
              showPaused ? "bg-orange-500/10 text-orange-400 border-orange-500/30" : "bg-white/5 text-white/70"
            }`}
          >
            <PauseCircle className="w-3.5 h-3.5" />
            Pausados ({pausedProjects.length})
          </Button>
        </div>

        <Button
          onClick={onCreateProjectClick}
          className="bg-[#FFCA16] text-black hover:bg-[#FFCA16]/90 font-bold text-xs h-9 px-4 rounded-xl gap-2 shadow-lg shadow-[#FFCA16]/10"
        >
          <FolderPlus className="w-4 h-4" />
          Novo Projeto
        </Button>
      </div>

      {/* Paused Projects Drawer / Section */}
      {showPaused && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 rounded-2xl border border-orange-500/20 bg-orange-500/5 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PauseCircle className="w-4 h-4 text-orange-400" />
              <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                Projetos Pausados ({pausedProjects.length})
              </h4>
            </div>
          </div>

          {pausedProjects.length === 0 ? (
            <p className="text-xs text-white/40 py-2">Nenhum projeto pausado no momento.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {pausedProjects.map((project) => (
                <KanbanCard
                  key={project.id}
                  project={project}
                  onClick={() => onSelectProject(project)}
                  onMoveStatus={onMoveStatus}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Kanban Board Columns Container */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x select-none min-h-[calc(100vh-280px)]">
        {KANBAN_COLUMNS.map((col) => {
          const colProjects = filteredProjects.filter((p) => p.status === col.id);
          const isDropActive = activeDropColumn === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`flex-shrink-0 w-80 flex flex-col rounded-2xl border transition-all duration-200 bg-[#070807] ${
                isDropActive
                  ? "border-[#FFCA16] bg-[#FFCA16]/5 ring-2 ring-[#FFCA16]/20"
                  : "border-white/10"
              }`}
            >
              {/* Column Header */}
              <div
                className={`p-3.5 border-b flex items-center justify-between sticky top-0 bg-[#070807]/95 backdrop-blur-md rounded-t-2xl z-10 ${col.headerBorder}`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${col.accentColor}`}>
                    {col.label}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${col.badgeBg}`}
                  >
                    {colProjects.length}
                  </span>
                </div>

                <div className="w-2 h-2 rounded-full bg-white/20" />
              </div>

              {/* Column Content / Cards List */}
              <div className="p-2.5 flex-1 space-y-3 overflow-y-auto max-h-[calc(100vh-340px)] min-h-[140px]">
                {colProjects.length === 0 ? (
                  <div
                    className={`h-28 rounded-xl border border-dashed flex flex-col items-center justify-center p-3 text-center transition-colors ${
                      isDropActive
                        ? "border-[#FFCA16] bg-[#FFCA16]/10 text-[#FFCA16]"
                        : "border-white/10 text-white/30"
                    }`}
                  >
                    <span className="text-xs">
                      {isDropActive ? "Solte para mover aqui" : "Nenhum projeto nesta etapa"}
                    </span>
                  </div>
                ) : (
                  colProjects.map((project) => (
                    <KanbanCard
                      key={project.id}
                      project={project}
                      onClick={() => onSelectProject(project)}
                      onMoveStatus={onMoveStatus}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
