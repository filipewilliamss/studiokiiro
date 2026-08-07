import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { MethodologyContent } from "@/data/methodologyContent";
import logoUrl from "@/assets/logo.png";

const BRAND = {
  black: [3, 3, 4] as [number, number, number],
  yellow: [245, 199, 26] as [number, number, number],
  gray: [120, 120, 120] as [number, number, number],
  light: [235, 235, 235] as [number, number, number],
};

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

export async function generateMethodologyPdf(methodology: MethodologyContent): Promise<jsPDF> {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const M = 48;

  // --- Page 1: Cover ---
  doc.setFillColor(...BRAND.black);
  doc.rect(0, 0, pageW, 160, "F");

  const logo = await loadLogo();
  if (logo) {
    try {
      const props = doc.getImageProperties(logo);
      const h = 40;
      const w = (props.width / props.height) * h;
      doc.addImage(logo, "PNG", M, 40, w, h);
    } catch {}
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...BRAND.yellow);
  doc.text("METODOLOGIA DE TRABALHO", M, 100);
  
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text(methodology.title, M, 130);

  let y = 200;

  // Introduction
  doc.setFontSize(10);
  doc.setTextColor(...BRAND.gray);
  doc.text("INTRODUÇÃO", M, y);
  y += 20;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...BRAND.black);
  const introLines = doc.splitTextToSize(methodology.introduction, pageW - M * 2);
  doc.text(introLines, M, y);
  y += introLines.length * 14 + 30;

  // Principles
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...BRAND.gray);
  doc.text("PRINCÍPIOS FUNDAMENTAIS", M, y);
  y += 20;
  methodology.principles.forEach(p => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BRAND.black);
    doc.text(`• ${p.title}:`, M, y);
    const titleW = doc.getTextWidth(`• ${p.title}: `);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    const descLines = doc.splitTextToSize(p.description, pageW - M * 2 - titleW);
    doc.text(descLines, M + titleW, y);
    y += descLines.length * 14 + 6;
  });

  // Phases
  methodology.phases.forEach((phase) => {
    if (y > pageH - 120) {
      doc.addPage();
      y = M;
    } else {
      y += 20;
    }

    doc.setFillColor(...BRAND.black);
    doc.rect(M, y, pageW - M * 2, 30, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...BRAND.yellow);
    doc.text(phase.title.toUpperCase(), M + 10, y + 20);
    y += 45;

    // Objective
    doc.setFontSize(9);
    doc.setTextColor(...BRAND.gray);
    doc.text("OBJETIVO", M, y);
    y += 15;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...BRAND.black);
    const objLines = doc.splitTextToSize(phase.objective, pageW - M * 2);
    doc.text(objLines, M, y);
    y += objLines.length * 13 + 15;

    // Deliverables
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BRAND.gray);
    doc.text("ENTREGÁVEIS", M, y);
    y += 15;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...BRAND.black);
    phase.deliverables.forEach((d) => {
      doc.text(`- ${d}`, M + 10, y);
      y += 14;
    });
    y += 15;

    // Steps (Missing before)
    if (phase.steps && phase.steps.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...BRAND.gray);
      doc.text("ETAPAS", M, y);
      y += 15;
      phase.steps.forEach((s) => {
        if (y > pageH - 40) {
          doc.addPage();
          y = M;
        }
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...BRAND.black);
        doc.text(`• ${s.title}:`, M + 10, y);
        const sTitleW = doc.getTextWidth(`• ${s.title}: `);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(60, 60, 60);
        const sDescLines = doc.splitTextToSize(s.description, pageW - M * 2 - sTitleW - 10);
        doc.text(sDescLines, M + 10 + sTitleW, y);
        y += sDescLines.length * 13 + 8;
      });
      y += 10;
    }
  });

  // Schedule (Missing before)
  if (methodology.schedule && methodology.schedule.length > 0) {
    doc.addPage();
    y = M;

    doc.setFillColor(...BRAND.black);
    doc.rect(0, y - M, pageW, 60, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...BRAND.yellow);
    doc.text("CRONOGRAMA DETALHADO", M, y);
    y += 40;

    methodology.schedule.forEach((schedPhase) => {
      if (y > pageH - 100) {
        doc.addPage();
        y = M;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...BRAND.black);
      doc.text(schedPhase.title, M, y);
      y += 15;

      doc.setFontSize(9);
      doc.setTextColor(...BRAND.gray);
      doc.text(`Prazo real: ${schedPhase.realDeadline} | Prazo cliente: ${schedPhase.clientDeadline}`, M, y);
      y += 20;

      schedPhase.days.forEach((day) => {
        if (y > pageH - 60) {
          doc.addPage();
          y = M;
        }

        doc.setFont("helvetica", "bold");
        doc.setTextColor(...BRAND.black);
        doc.text(day.day, M + 10, y);
        y += 14;

        doc.setFont("helvetica", "normal");
        doc.setTextColor(60, 60, 60);
        day.tasks.forEach((task) => {
          const taskLines = doc.splitTextToSize(`- ${task}`, pageW - M * 2 - 20);
          doc.text(taskLines, M + 20, y);
          y += taskLines.length * 13 + 2;
        });

        if (day.note) {
          doc.setFont("helvetica", "italic");
          doc.setTextColor(180, 83, 9); // amber-600 approx
          const noteLines = doc.splitTextToSize(`Obs: ${day.note}`, pageW - M * 2 - 20);
          doc.text(noteLines, M + 20, y);
          y += noteLines.length * 12 + 4;
        }
        y += 8;
      });
      y += 15;
    });
  }

  // Footer on all pages
  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...BRAND.gray);
    doc.text("Studio Kiiro · Methodology Document", M, pageH - 30);
    doc.text(`Página ${p} de ${pages}`, pageW - M, pageH - 30, { align: "right" });
  }

  return doc;
}

export async function downloadMethodologyPdf(methodology: MethodologyContent) {
  const doc = await generateMethodologyPdf(methodology);
  const slug = methodology.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  doc.save(`METODOLOGIA-${slug}.pdf`);
}
