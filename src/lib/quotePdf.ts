import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoUrl from "@/assets/logo.png";

export interface QuotePdfItem {
  description: string;
  quantity: number;
  unit_price: number;
}

export interface QuotePdfData {
  sequential_number: number;
  project_type: string;
  description?: string | null;
  items?: QuotePdfItem[];
  total_value: number;
  payment_terms?: string | null;
  validity_date?: string | null;
  notes?: string | null;
  status?: string;
  created_at: string;
  clientName?: string;
  clientCompany?: string | null;
}

const BRAND = {
  black: [3, 3, 4] as [number, number, number],
  yellow: [245, 199, 26] as [number, number, number],
  gray: [120, 120, 120] as [number, number, number],
  light: [235, 235, 235] as [number, number, number],
};

const brl = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v || 0);

const dateBR = (d?: string | null) =>
  d ? new Date(d.length <= 10 ? `${d}T12:00:00` : d).toLocaleDateString("pt-BR") : "—";

async function loadLogo(): Promise<string | null> {
  try {
    const res = await fetch(logoUrl);
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function generateQuotePdf(quote: QuotePdfData): Promise<jsPDF> {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const M = 48;
  const code = `ORC-${String(quote.sequential_number).padStart(4, "0")}`;

  // ── Header band ──
  doc.setFillColor(...BRAND.black);
  doc.rect(0, 0, pageW, 120, "F");

  const logo = await loadLogo();
  if (logo) {
    try {
      const props = doc.getImageProperties(logo);
      const h = 34;
      const w = (props.width / props.height) * h;
      doc.addImage(logo, "PNG", M, 40, w, h);
    } catch {
      /* ignore */
    }
  } else {
    doc.setTextColor(...BRAND.yellow);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("STUDIO KIIRO", M, 66);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND.yellow);
  doc.text("ORÇAMENTO", pageW - M, 52, { align: "right" });
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text(code, pageW - M, 74, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(190, 190, 190);
  doc.text(`Emitido em ${dateBR(quote.created_at)}`, pageW - M, 90, { align: "right" });

  let y = 158;

  // ── Client / meta blocks ──
  const colW = (pageW - M * 2 - 16) / 2;
  const infoBlock = (x: number, label: string, value: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...BRAND.gray);
    doc.text(label.toUpperCase(), x, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...BRAND.black);
    doc.text(doc.splitTextToSize(value || "—", colW), x, y + 15);
  };

  infoBlock(M, "Cliente", quote.clientName || "—");
  infoBlock(M + colW + 16, "Serviço", quote.project_type || "—");
  y += 46;
  infoBlock(M, "Empresa", quote.clientCompany || "—");
  infoBlock(M + colW + 16, "Validade da proposta", dateBR(quote.validity_date));
  y += 52;

  // ── Description ──
  if (quote.description) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...BRAND.gray);
    doc.text("ESCOPO DO PROJETO", M, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    const lines = doc.splitTextToSize(quote.description, pageW - M * 2);
    doc.text(lines, M, y + 15);
    y += 15 + lines.length * 13 + 18;
  }

  // ── Items table ──
  const items = (quote.items || []).filter((i) => i && i.description);
  autoTable(doc, {
    startY: y,
    head: [["Descrição", "Qtd", "Valor unit.", "Total"]],
    body: items.length
      ? items.map((i) => [
          i.description,
          String(i.quantity),
          brl(Number(i.unit_price)),
          brl(Number(i.quantity) * Number(i.unit_price)),
        ])
      : [["—", "—", "—", "—"]],
    theme: "grid",
    margin: { left: M, right: M },
    styles: { font: "helvetica", fontSize: 10, cellPadding: 8, lineColor: BRAND.light, textColor: [40, 40, 40] },
    headStyles: { fillColor: BRAND.black, textColor: BRAND.yellow, fontStyle: "bold", fontSize: 8.5 },
    columnStyles: {
      0: { cellWidth: "auto" },
      1: { cellWidth: 50, halign: "center" },
      2: { cellWidth: 90, halign: "right" },
      3: { cellWidth: 95, halign: "right", fontStyle: "bold" },
    },
    alternateRowStyles: { fillColor: [250, 250, 250] },
  });

  y = (doc as any).lastAutoTable.finalY + 18;

  // ── Total ──
  const boxW = 240;
  doc.setFillColor(...BRAND.black);
  doc.roundedRect(pageW - M - boxW, y, boxW, 52, 6, 6, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...BRAND.yellow);
  doc.text("VALOR TOTAL", pageW - M - boxW + 16, y + 20);
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text(brl(Number(quote.total_value)), pageW - M - 16, y + 36, { align: "right" });
  y += 76;

  // ── Payment terms / notes ──
  const textBlock = (label: string, value: string) => {
    if (y > pageH - 140) {
      doc.addPage();
      y = M;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...BRAND.gray);
    doc.text(label.toUpperCase(), M, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    const lines = doc.splitTextToSize(value, pageW - M * 2);
    doc.text(lines, M, y + 15);
    y += 15 + lines.length * 13 + 18;
  };

  if (quote.payment_terms) textBlock("Condições de pagamento", quote.payment_terms);
  if (quote.notes) textBlock("Observações", quote.notes);

  // ── Footer on every page ──
  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    doc.setDrawColor(...BRAND.light);
    doc.line(M, pageH - 56, pageW - M, pageH - 56);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...BRAND.gray);
    doc.text("Studio Kiiro · contato@studiokiiro.com · studiokiiro.com", M, pageH - 38);
    doc.text(`${code} · Página ${p} de ${pages}`, pageW - M, pageH - 38, { align: "right" });
  }

  return doc;
}

export async function downloadQuotePdf(quote: QuotePdfData) {
  const doc = await generateQuotePdf(quote);
  const slug = (quote.clientName || "cliente").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
  doc.save(`ORC-${String(quote.sequential_number).padStart(4, "0")}-${slug}.pdf`);
}
