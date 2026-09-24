import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar, Clock, AlertTriangle, CheckCircle2, MessageCircle, Copy,
  Check, MoreHorizontal, ArrowRight, User, DollarSign, CheckSquare, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getBriefingUrl, buildBriefingMessage } from "@/services/briefingService";

export interface KanbanProject {
  id: string;
  name: string;
  type: string;
  status: string;
  progress: number;
  deadline: string | null;
  start_date: string | null;
  description: string | null;
  client_id: string;
  priority: string;
  partner_notes: string | null;
  studio_observation: string | null;
  health_status: string | null;
  partner_message: string | null;
  profiles?: {
    id: string;
    full_name: string;
    company: string | null;
    phone?: string | null;
  };
  briefing_links?: {
    token: string;
    submitted_at: string | null;
  } | null;
  payments?: {
    budget_total: number;
    remaining_amount: number | null;
    payment_status: string | null;
    installments_total: number | null;
    installments_paid: number | null;
  }[] | {
    budget_total: number;
    remaining_amount: number | null;
    payment_status: string | null;
    installments_total: number | null;
    installments_paid: number | null;
  } | null;
  project_stages?: {
    id: string;
    name: string;
    status: string;
    sort_order: number;
    internal_tasks: { id: string; text: string; completed: boolean }[] | null;
  }[];
}

interface KanbanCardProps {
  project: KanbanProject;
  onClick: () => void;
  onMoveStatus: (projectId: string, newStatus: string) => void;
  isDragging?: boolean;
}

const statusOptions = [
  { value: "briefing", label: "Briefing" },
  { value: "planejamento", label: "Planejamento" },
  { value: "producao", label: "Produção" },
  { value: "revisao", label: "Revisão" },
  { value: "finalizacao", label: "Finalização" },
  { value: "entregue", label: "Entregue" },
  { value: "pausado", label: "Pausado" },
];

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

export const KanbanCard = ({
  project,
  onClick,
  onMoveStatus,
}: KanbanCardProps) => {
  const [copiedLink, setCopiedLink] = useState(false);

  // Cliente info
  const clientName = project.profiles?.full_name || "Cliente sem nome";
  const clientCompany = project.profiles?.company;
  const clientPhone = project.profiles?.phone;
  const initials = clientName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Prazo e Alertas
  const getDeadlineInfo = () => {
    if (!project.deadline) return null;
    const deadlineDate = new Date(project.deadline + "T23:59:59");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (project.status === "entregue") {
      return {
        text: `Entregue em ${new Date(project.deadline + "T00:00:00").toLocaleDateString("pt-BR")}`,
        color: "text-muted-foreground bg-white/5 border-white/10",
        urgent: false,
      };
    }

    if (diffDays < 0) {
      return {
        text: `Atrasado há ${Math.abs(diffDays)}d`,
        color: "text-rose-400 bg-rose-500/10 border-rose-500/30",
        urgent: true,
      };
    }
    if (diffDays === 0) {
      return {
        text: "Entrega hoje!",
        color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
        urgent: true,
      };
    }
    if (diffDays <= 3) {
      return {
        text: `${diffDays}d restantes`,
        color: "text-amber-300 bg-amber-500/10 border-amber-500/20",
        urgent: true,
      };
    }
    return {
      text: `${diffDays}d restantes`,
      color: "text-white/60 bg-white/5 border-white/10",
      urgent: false,
    };
  };

  const deadlineInfo = getDeadlineInfo();

  // Tarefas Internas
  const stages = project.project_stages || [];
  const allTasks = stages.flatMap((s) => (s.internal_tasks as any[]) || []);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => t.completed).length;
  const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Financeiro
  const payment = Array.isArray(project.payments) ? project.payments[0] : project.payments;
  const isPaid = payment?.payment_status === "pago" || (payment?.remaining_amount != null && payment.remaining_amount <= 0 && (payment.installments_paid ?? 0) >= (payment.installments_total ?? 1));
  const remainingValue = payment?.remaining_amount ?? payment?.budget_total ?? null;

  // Briefing
  const briefingToken = project.briefing_links?.token;
  const isBriefingAnswered = Boolean(project.briefing_links?.submitted_at);

  const handleCopyBriefing = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!briefingToken) return;
    try {
      await navigator.clipboard.writeText(getBriefingUrl(briefingToken));
      setCopiedLink(true);
      toast.success("Link do briefing copiado com sucesso!");
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      toast.error("Erro ao copiar link.");
    }
  };

  const handleSendWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!briefingToken) return;
    const msg = buildBriefingMessage(clientName, project.name, project.type, briefingToken);
    const phone = clientPhone?.replace(/\D/g, "");
    const url = phone
      ? `https://wa.me/55${phone}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      onClick={onClick}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", project.id);
      }}
      className="group relative bg-[#0B0C0B] hover:bg-[#121312] border border-white/10 hover:border-[#FFCA16]/40 rounded-xl p-4 transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-0.5"
    >
      {/* Top Header: Client & Menu */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-full bg-[#FFCA16]/10 border border-[#FFCA16]/30 flex items-center justify-center text-[10px] font-bold text-[#FFCA16] shrink-0">
            {initials || <User className="w-3 h-3" />}
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-white/90 truncate block">
              {clientName}
            </span>
            {clientCompany && (
              <span className="text-[10px] text-white/40 truncate block">
                {clientCompany}
              </span>
            )}
          </div>
        </div>

        {/* Move dropdown button */}
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-6 w-6 rounded-md hover:bg-white/10 text-white/40 hover:text-white flex items-center justify-center transition-colors">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 bg-[#0F100F] border-white/15 text-white">
              <DropdownMenuLabel className="text-[10px] text-white/50 uppercase tracking-wider">
                Mover para Etapa
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              {statusOptions
                .filter((s) => s.value !== project.status)
                .map((s) => (
                  <DropdownMenuItem
                    key={s.value}
                    onClick={() => onMoveStatus(project.id, s.value)}
                    className="text-xs hover:bg-[#FFCA16]/10 hover:text-[#FFCA16] cursor-pointer"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 text-white/40" />
                    {s.label}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Project Name */}
      <h4 className="text-sm font-bold text-white group-hover:text-[#FFCA16] transition-colors leading-snug mb-2 line-clamp-2">
        {project.name}
      </h4>

      {/* Service Type Tag */}
      <div className="mb-3">
        <span className="inline-block text-[10px] font-medium tracking-wide bg-white/5 text-white/70 px-2 py-0.5 rounded-md border border-white/10">
          {project.type}
        </span>
      </div>

      {/* Checklists / Tasks */}
      {totalTasks > 0 && (
        <div className="mb-3 space-y-1">
          <div className="flex items-center justify-between text-[10px] text-white/50">
            <span className="flex items-center gap-1">
              <CheckSquare className="w-3 h-3 text-[#FFCA16]" />
              Tarefas da Etapa
            </span>
            <span>
              {completedTasks}/{totalTasks} ({taskProgress}%)
            </span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FFCA16] transition-all duration-300"
              style={{ width: `${taskProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Briefing Quick Action */}
      <div className="mb-3 flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 text-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <div
            className={`w-2 h-2 rounded-full shrink-0 ${
              isBriefingAnswered ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
            }`}
          />
          <span
            className={`text-[10px] font-medium truncate ${
              isBriefingAnswered ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {isBriefingAnswered ? "Briefing respondido" : "Briefing pendente"}
          </span>
        </div>

        {briefingToken && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleCopyBriefing}
              title="Copiar link do briefing"
              className="h-6 w-6 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors"
            >
              {copiedLink ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
            <button
              onClick={handleSendWhatsApp}
              title="Enviar briefing por WhatsApp"
              className="h-6 w-6 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 flex items-center justify-center transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Card Footer: Deadline & Financial */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2 text-[11px]">
        {/* Deadline Alert */}
        {deadlineInfo ? (
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-semibold ${deadlineInfo.color}`}
          >
            <Clock className="w-3 h-3" />
            {deadlineInfo.text}
          </span>
        ) : (
          <span className="text-[10px] text-white/30">Sem prazo</span>
        )}

        {/* Financial Badge */}
        {payment ? (
          isPaid ? (
            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Quitado
            </span>
          ) : remainingValue != null && remainingValue > 0 ? (
            <span className="text-[10px] font-mono font-medium text-amber-300">
              {formatCurrency(remainingValue)}
            </span>
          ) : (
            <span className="text-[10px] text-white/40">Em aberto</span>
          )
        ) : (
          <span className="text-[10px] text-white/30">—</span>
        )}
      </div>
    </div>
  );
};

export default KanbanCard;
