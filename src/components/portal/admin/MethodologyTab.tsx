import { useState } from "react";
import { methodologyContent, availableMethodologies } from "@/data/methodologyContent";
import MethodologyDocument from "./MethodologyDocument";
import { BookOpen, ChevronRight, Download } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { downloadMethodologyPdf } from "@/lib/methodologyPdf";
import { toast } from "sonner";

const MethodologyTab = () => {
  const [selected, setSelected] = useState(availableMethodologies[0]);
  const current = methodologyContent[selected];

  const handleDownload = async () => {
    if (!current) return;
    try {
      await downloadMethodologyPdf(current);
      toast.success("Metodologia baixada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao gerar PDF.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar — service list */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 font-semibold">Selecionar serviço</p>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-white/40 hover:text-primary hover:bg-primary/10"
            onClick={handleDownload}
            title="Baixar metodologia atual"
          >
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
        <ScrollArea className="lg:max-h-[70vh]">
          <div className="space-y-1">
            {availableMethodologies.map((key) => {
              const isActive = selected === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "bg-primary/15 text-primary border border-primary/20"
                      : "text-white/50 hover:text-white/80 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <BookOpen className={`h-3.5 w-3.5 flex-shrink-0 ${isActive ? "text-primary" : ""}`} />
                  <span className="truncate">{key}</span>
                  {isActive && <ChevronRight className="h-3.5 w-3.5 ml-auto text-primary/60" />}
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Document viewer */}
      <div className="flex-1 min-w-0">
        {current && <MethodologyDocument methodology={current} />}
      </div>
    </div>
  );
};

export default MethodologyTab;
