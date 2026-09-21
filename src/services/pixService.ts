/**
 * pixService.ts
 * Implementação padrão Banco Central do Brasil para PIX EMV (BR Code).
 * Gera códigos Pix Copia e Cola válidos para qualquer instituição financeira
 * e renderiza QR Code dinâmico com valor, beneficiário e identificador.
 */
import QRCode from "qrcode";

export interface StudioPixConfig {
  key: string;
  keyType: "email" | "cpf" | "cnpj" | "phone" | "random";
  merchantName: string;
  merchantCity: string;
}

const STORAGE_KEY = "studio_kiiro_pix_config";

const DEFAULT_PIX_CONFIG: StudioPixConfig = {
  key: "contato@studiokiiro.com",
  keyType: "email",
  merchantName: "STUDIO KIIRO",
  merchantCity: "SAO PAULO",
};

/**
 * Normaliza textos para o padrão EMV (sem acentos, maiúsculo, tamanho controlado).
 */
function sanitizeText(str: string, maxLength: number): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-zA-Z0-9 ]/g, "")   // remove caracteres especiais
    .trim()
    .toUpperCase()
    .substring(0, maxLength);
}

/**
 * Formata um campo no padrão TLV (Type, Length, Value).
 */
function formatField(id: string, value: string): string {
  const len = value.length.toString().padStart(2, "0");
  return `${id}${len}${value}`;
}

/**
 * Calcula CRC16 CCITT (Polinômio 0x1021, valor inicial 0xFFFF).
 */
function calculateCRC16(payload: string): string {
  let crc = 0xffff;
  const polynomial = 0x1021;

  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ polynomial) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export interface PixPayloadParams {
  key?: string;
  merchantName?: string;
  merchantCity?: string;
  amount?: number;
  txId?: string;
  description?: string;
}

/**
 * Gera a string Pix Copia e Cola (BR Code).
 */
export function generatePixPayload(params: PixPayloadParams = {}): string {
  const config = getStudioPixConfig();
  const key = (params.key || config.key).trim();
  const rawName = params.merchantName || config.merchantName;
  const rawCity = params.merchantCity || config.merchantCity;
  const name = sanitizeText(rawName, 25) || "STUDIO KIIRO";
  const city = sanitizeText(rawCity, 15) || "SAO PAULO";
  
  // Limpa txId (máx 25 chars, sem espaços)
  const rawTxId = params.txId ? params.txId.replace(/[^a-zA-Z0-9]/g, "") : "";
  const txId = rawTxId.length > 0 ? rawTxId.substring(0, 25) : "***";

  // ID 00: Payload Format Indicator
  let payload = formatField("00", "01");

  // ID 26: Merchant Account Information - PIX
  const gui = formatField("00", "br.gov.bcb.pix");
  const keyField = formatField("01", key);
  const descField = params.description
    ? formatField("02", sanitizeText(params.description, 40))
    : "";
  const merchantAccountInfo = `${gui}${keyField}${descField}`;
  payload += formatField("26", merchantAccountInfo);

  // ID 52: Merchant Category Code
  payload += formatField("52", "0000");

  // ID 53: Transaction Currency (986 = Real brasileiro)
  payload += formatField("53", "986");

  // ID 54: Transaction Amount (opcional, 2 casas decimais)
  if (params.amount != null && params.amount > 0) {
    const formattedAmount = params.amount.toFixed(2);
    payload += formatField("54", formattedAmount);
  }

  // ID 58: Country Code
  payload += formatField("58", "BR");

  // ID 59: Merchant Name
  payload += formatField("59", name);

  // ID 60: Merchant City
  payload += formatField("60", city);

  // ID 62: Additional Data Field (TxID)
  const txIdField = formatField("05", txId);
  payload += formatField("62", txIdField);

  // ID 63: CRC16 (Payload sem o valor do CRC + tag "6304")
  const payloadForCrc = `${payload}6304`;
  const crc = calculateCRC16(payloadForCrc);

  return `${payloadForCrc}${crc}`;
}

/**
 * Gera um Data URL (imagem base64) com o QR Code a partir de uma string Pix.
 */
export async function generatePixQrCodeDataUrl(payload: string): Promise<string> {
  try {
    return await QRCode.toDataURL(payload, {
      width: 360,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "M",
    });
  } catch (err) {
    console.error("Erro ao gerar QR Code do PIX:", err);
    throw err;
  }
}

/**
 * Obtém as configurações atuais da Chave PIX do Studio Kiiro.
 */
export function getStudioPixConfig(): StudioPixConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_PIX_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn("Falha ao ler configuração de PIX do localStorage:", e);
  }
  return DEFAULT_PIX_CONFIG;
}

/**
 * Salva as configurações de PIX do Studio Kiiro.
 */
export function saveStudioPixConfig(config: StudioPixConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error("Erro ao salvar configuração do PIX:", e);
  }
}
