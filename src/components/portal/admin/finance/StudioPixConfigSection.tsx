import { useState, useEffect } from "react";
import { QrCode, Save, Check, Copy, Sparkles, Building2, User, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  getStudioPixConfig,
  saveStudioPixConfig,
  generatePixPayload,
  generatePixQrCodeDataUrl,
  type StudioPixConfig
} from "@/services/pixService";

export const StudioPixConfigSection = () => {
  const [config, setConfig] = useState<StudioPixConfig>(getStudioPixConfig());
  const [previewQr, setPreviewQr] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const payload = generatePixPayload({
      key: config.key,
      merchantName: config.merchantName,
      merchantCity: config.merchantCity,
      amount: 1500,
      description: "Demonstracao PIX Kiiro",
    });

    generatePixQrCodeDataUrl(payload)
      .then(setPreviewQr)
      .catch((err) => console.error("Erro no preview QR:", err));
  }, [config]);

  const handleSave = () => {
    saveStudioPixConfig(config);
    toast.success("Configurações do PIX salvas com sucesso!", {
      description: "Os clientes agora verão esta chave ao liquidar parcelas no portal.",
    });
  };

  const handleCopySample = async () => {
    const payload = generatePixPayload({
      key: config.key,
      merchantName: config.merchantName,
      merchantCity: config.merchantCity,
      amount: 1500,
    });
    await navigator.clipboard.writeText(payload);
    setCopied(true);
    toast.success("Código PIX Copia e Cola de teste copiado!");
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFCA16]/10 border border-[#FFCA16]/20 flex items-center justify-center text-[#FFCA16]">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-display">
              Configuração da Chave PIX do Studio Kiiro
            </h3>
            <p className="text-xs text-white/50">
              Chave utilizada para gerar QR Code oficial do Banco Central e Copia e Cola nas cobranças dos clientes.
            </p>
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="bg-[#FFCA16] text-black hover:bg-[#FFCA16]/90 font-bold text-xs h-9 px-4 rounded-xl gap-2 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          Salvar Chave PIX
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Formulário de Configuração */}
        <div className="md:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5 sm:col-span-1">
              <label className="text-[11px] uppercase tracking-wider text-white/60 font-medium">
                Tipo da Chave
              </label>
              <Select
                value={config.keyType}
                onValueChange={(val: any) => setConfig({ ...config, keyType: val })}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white text-xs h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">E-mail</SelectItem>
                  <SelectItem value="cpf">CPF</SelectItem>
                  <SelectItem value="cnpj">CNPJ</SelectItem>
                  <SelectItem value="phone">Celular</SelectItem>
                  <SelectItem value="random">Chave Aleatória</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[11px] uppercase tracking-wider text-white/60 font-medium">
                Chave PIX
              </label>
              <div className="relative">
                <Input
                  value={config.key}
                  onChange={(e) => setConfig({ ...config, key: e.target.value })}
                  placeholder="ex: contato@studiokiiro.com"
                  className="bg-white/5 border-white/10 text-white font-mono text-xs h-10 pr-8"
                />
                <KeyRound className="w-4 h-4 text-white/30 absolute right-2.5 top-3" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-white/60 font-medium">
                Nome do Beneficiário (Banco)
              </label>
              <div className="relative">
                <Input
                  value={config.merchantName}
                  onChange={(e) => setConfig({ ...config, merchantName: e.target.value.toUpperCase() })}
                  maxLength={25}
                  placeholder="STUDIO KIIRO"
                  className="bg-white/5 border-white/10 text-white text-xs h-10 uppercase pr-8"
                />
                <Building2 className="w-4 h-4 text-white/30 absolute right-2.5 top-3" />
              </div>
              <span className="text-[10px] text-white/40">Máx. 25 caracteres (padrão BACEN)</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-white/60 font-medium">
                Cidade do Beneficiário
              </label>
              <div className="relative">
                <Input
                  value={config.merchantCity}
                  onChange={(e) => setConfig({ ...config, merchantCity: e.target.value.toUpperCase() })}
                  maxLength={15}
                  placeholder="SAO PAULO"
                  className="bg-white/5 border-white/10 text-white text-xs h-10 uppercase pr-8"
                />
                <User className="w-4 h-4 text-white/30 absolute right-2.5 top-3" />
              </div>
              <span className="text-[10px] text-white/40">Máx. 15 caracteres (sem acentos)</span>
            </div>
          </div>
        </div>

        {/* Preview do QR Code gerado */}
        <div className="md:col-span-5 bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center">
          <span className="text-[10px] uppercase tracking-widest text-[#FFCA16] font-bold mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> Prévia ao Vivo
          </span>

          <div className="p-3 bg-white rounded-xl shadow-lg border border-white/20 mb-3">
            {previewQr ? (
              <img src={previewQr} alt="QR Code Preview" className="w-32 h-32 object-contain rounded" />
            ) : (
              <div className="w-32 h-32 bg-zinc-200 animate-pulse rounded" />
            )}
          </div>

          <div className="text-xs text-white/80 font-medium mb-1">
            {config.merchantName || "STUDIO KIIRO"}
          </div>
          <div className="text-[11px] font-mono text-[#FFCA16] mb-3">
            {config.key || "chave não configurada"}
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={handleCopySample}
            className="border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs h-8 rounded-lg gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copiado!" : "Testar Copia e Cola"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudioPixConfigSection;
