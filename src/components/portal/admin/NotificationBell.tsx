import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Bell, UserPlus, MessageSquare, CheckCircle2, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  icon: "client" | "message" | "quote" | "deadline";
  text: string;
  time: string;
}

const iconMap = {
  client: UserPlus,
  message: MessageSquare,
  quote: CheckCircle2,
  deadline: Clock,
};

const iconColorMap = {
  client: "text-emerald-400",
  message: "text-blue-400",
  quote: "text-primary",
  deadline: "text-orange-400",
};

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const notifs: Notification[] = [];
      const now = new Date();

      // Recent clients (last 7 days)
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const { data: recentClients } = await supabase
        .from("profiles")
        .select("full_name, created_at")
        .gte("created_at", weekAgo)
        .order("created_at", { ascending: false })
        .limit(3);

      recentClients?.forEach((c) => {
        notifs.push({
          id: `client-${c.created_at}`,
          icon: "client",
          text: `Novo cliente: ${c.full_name}`,
          time: formatTimeAgo(c.created_at),
        });
      });

      // Recent messages (last 3 days)
      const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString();
      const { data: recentMessages } = await supabase
        .from("messages")
        .select("content, created_at, project_id")
        .gte("created_at", threeDaysAgo)
        .order("created_at", { ascending: false })
        .limit(3);

      if (recentMessages?.length) {
        const projectIds = [...new Set(recentMessages.map((m) => m.project_id))];
        const { data: projects } = await supabase
          .from("projects")
          .select("id, name")
          .in("id", projectIds);
        const projectMap = new Map(projects?.map((p) => [p.id, p.name]) || []);

        recentMessages.forEach((m) => {
          notifs.push({
            id: `msg-${m.created_at}`,
            icon: "message",
            text: `Nova mensagem em "${projectMap.get(m.project_id) || "Projeto"}"`,
            time: formatTimeAgo(m.created_at),
          });
        });
      }

      // Recent feedbacks (last 7 days)
      const { data: recentFeedbacks } = await supabase
        .from("project_feedbacks")
        .select("content, created_at, project_id, projects(name)")
        .gte("created_at", weekAgo)
        .order("created_at", { ascending: false })
        .limit(3);

      recentFeedbacks?.forEach((f: any) => {
        notifs.push({
          id: `feedback-${f.created_at}`,
          icon: "message",
          text: `Novo feedback em "${f.projects?.name || "Projeto"}"`,
          time: formatTimeAgo(f.created_at),
        });
      });

      // Approved quotes (last 7 days)
      const { data: approvedQuotes } = await supabase
        .from("quotes")
        .select("project_type, client_response_at, sequential_number")
        .eq("status", "aprovado")
        .gte("client_response_at", weekAgo)
        .order("client_response_at", { ascending: false })
        .limit(3);

      approvedQuotes?.forEach((q) => {
        notifs.push({
          id: `quote-${q.sequential_number}`,
          icon: "quote",
          text: `Orçamento ORC-${String(q.sequential_number).padStart(4, "0")} aprovado`,
          time: formatTimeAgo(q.client_response_at || ""),
        });
      });

      // Approaching deadlines (next 3 days)
      const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      const today = now.toISOString().split("T")[0];
      const { data: urgentProjects } = await supabase
        .from("projects")
        .select("name, deadline")
        .gte("deadline", today)
        .lte("deadline", threeDaysFromNow)
        .in("status", ["briefing", "planejamento", "producao", "revisao", "finalizacao"])
        .limit(3);

      urgentProjects?.forEach((p) => {
        const daysLeft = Math.ceil(
          (new Date(p.deadline + "T00:00:00").getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );
        notifs.push({
          id: `deadline-${p.name}`,
          icon: "deadline",
          text: `Prazo de "${p.name}" em ${daysLeft} dia${daysLeft !== 1 ? "s" : ""}`,
          time: new Date(p.deadline + "T00:00:00").toLocaleDateString("pt-BR"),
        });
      });

      setNotifications(notifs);
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const hasNew = notifications.length > 0 && !seen;

  return (
    <Popover open={open} onOpenChange={(v) => { setOpen(v); if (v) setSeen(true); }}>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200">
          <Bell className="h-4 w-4" />
          <AnimatePresence>
            {hasNew && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"
              />
            )}
          </AnimatePresence>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 p-0 bg-[#0a0a0a] border-white/10 rounded-xl overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-white/10">
          <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 font-semibold">Notificações</h3>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-8 text-center">
              <Bell className="h-6 w-6 text-white/15 mx-auto mb-2" />
              <p className="text-white/35 text-xs">Nenhuma notificação recente.</p>
            </div>
          ) : (
            notifications.map((n, idx) => {
              const Icon = iconMap[n.icon];
              return (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="flex items-start gap-3 px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors"
                >
                  <div className={`mt-0.5 ${iconColorMap[n.icon]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/80 leading-snug">{n.text}</p>
                    <p className="text-[10px] text-white/35 mt-0.5">{n.time}</p>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

function formatTimeAgo(dateStr: string): string {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}min atrás`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h atrás`;
  const days = Math.floor(hours / 24);
  return `${days}d atrás`;
}

export default NotificationBell;
