import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy, ExternalLink, MessageCircle, Sparkles, ClipboardList, Send } from "lucide-react";
import { toast } from "sonner";
import { getBriefingUrl, buildBriefingMessage } from "@/services/briefingService";

interface BriefingLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  projectType: string;
  clientName: string;
  clientPhone?: string | null;
  token: string | null;
}

export const BriefingLinkModal = ({
  isOpen,
  onClose,
  projectName,
  projectType,
  clientName,
  clientPhone,
  token,
}: BriefingLinkModalProps) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  if (!token) return null;

  const briefingUrl = getBriefingUrl(token);
  const defaultMessage = buildBriefingMessage(clientName, projectName, projectType, token);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(briefingUrl);
      setCopiedLink(true);
      toast.success("Link do briefing copiado!");
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      toast.error("Não foi possível copiar o link. Selecione e copie manualmente.");
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(defaultMessage);
      setCopiedMessage(true);
      toast.success("Mensagem completa copiada para a área de transferência!");
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch {
      toast.error("Não foi possível copiar a mensagem.");
    }
  };

  const handleWhatsApp = () => {
    const rawPhone = (clientPhone || "").replace(/\D/g, "");
    let phoneParam = "";
    if (rawPhone.length >= 10) {
      phoneParam = rawPhone.startsWith("55") ? rawPhone : `55${rawPhone}`;
    }

    const encodedText = encodeURIComponent(defaultMessage);
    const url = phoneParam
      ? `https://wa.me/${phoneParam}?text=${encodedText}`
      : `https://api.whatsapp.com/send?text=${encodedText}`;

    window.open(url, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-card border border-border text-foreground">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="h-4 w-4" />
            Link de Briefing Gerado
          </div>
          <DialogTitle className="text-xl font-bold font-display leading-tight">
            Briefing Exclusivo para o Cliente
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Envie este link direto para o cliente responder ao briefing sem precisar criar senha ou fazer login no portal.
          </DialogDescription>
        </DialogHeader>

        {/* Project Info Badge */}
        <div className="bg-secondary/40 border border-border/80 rounded-xl p-3.5 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">Projeto:</span>
            <span className="font-semibold text-foreground">{projectName}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">Tipo:</span>
            <span className="text-primary font-medium">{projectType}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">Cliente:</span>
            <span className="text-foreground">{clientName}</span>
          </div>
          {clientPhone && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">WhatsApp:</span>
              <span className="text-foreground/80">{clientPhone}</span>
            </div>
          )}
        </div>

        {/* Link input with copy button */}
        <div className="space-y-2 pt-1">
          <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
            <ClipboardList className="h-3.5 w-3.5 text-primary" />
            Link Direto do Briefing
          </label>
          <div className="flex items-center gap-2">
            <Input
              value={briefingUrl}
              readOnly
              className="font-mono text-xs bg-background/80 border-border select-all"
            />
            <Button
              type="button"
              variant={copiedLink ? "default" : "outline"}
              size="sm"
              onClick={handleCopyLink}
              className="gap-1.5 shrink-0"
            >
              {copiedLink ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              {copiedLink ? "Copiado!" : "Copiar"}
            </Button>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          <Button
            type="button"
            className="w-full gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs h-9"
            onClick={handleWhatsApp}
          >
            <MessageCircle className="h-4 w-4" />
            Enviar via WhatsApp
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full gap-2 text-xs h-9"
            onClick={handleCopyMessage}
          >
            {copiedMessage ? <Check className="h-4 w-4 text-emerald-400" /> : <Send className="h-4 w-4" />}
            {copiedMessage ? "Mensagem copiada!" : "Copiar Mensagem Pronta"}
          </Button>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border mt-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => window.open(briefingUrl, "_blank")}
            className="text-xs text-muted-foreground hover:text-primary gap-1.5"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Testar link em nova aba
          </Button>
          <Button type="button" variant="default" size="sm" onClick={onClose} className="text-xs">
            Concluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BriefingLinkModal;
