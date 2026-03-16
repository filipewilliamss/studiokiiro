import { MethodologyContent } from "@/data/methodologyContent";
import { Sparkles, Target, Package, ListChecks, Clock, Lightbulb, AlertTriangle } from "lucide-react";

interface Props {
  methodology: MethodologyContent;
}

const MethodologyDocument = ({ methodology }: Props) => {
  return (
    <div className="space-y-0">
      {/* ── PAGE 1: Cover + Intro + Principles + First phases ── */}
      <div className="bg-white rounded-2xl border border-black/10 overflow-hidden shadow-lg">
        {/* Black diagonal header */}
        <div className="relative bg-black text-white px-8 sm:px-12 py-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
          <p className="text-primary font-display font-extrabold text-sm uppercase tracking-[0.3em] mb-2">Metodologia:</p>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">{methodology.title}</h1>
          <p className="italic text-white/70 mt-3 text-sm sm:text-base">{methodology.subtitle}</p>
          <div className="flex items-center gap-6 mt-5 text-xs text-white/50">
            <span>Apresentado por: <strong className="text-white/70">Studio Kiiro</strong></span>
            <span>Data: {methodology.date}</span>
          </div>
        </div>

        <div className="px-8 sm:px-12 py-8 space-y-8">
          {/* Introduction */}
          <div>
            <h2 className="font-display font-bold text-lg text-black mb-3">Introdução</h2>
            <p className="text-black/70 text-sm leading-relaxed">{methodology.introduction}</p>
          </div>

          {/* Principles */}
          <div>
            <h2 className="font-display font-bold text-lg text-black mb-3">Princípios Fundamentais</h2>
            <ul className="space-y-2">
              {methodology.principles.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span className="text-black/80">
                    <strong className="text-black">{p.title}:</strong> {p.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Total deadline */}
          {methodology.totalDeadline && (
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-black">Prazo real: <strong>{methodology.totalDeadline.real}</strong></span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/5 border border-black/10">
                <Clock className="h-4 w-4 text-black/50" />
                <span className="text-xs font-medium text-black">Prazo cliente: <strong>{methodology.totalDeadline.client}</strong></span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── PHASE PAGES ── */}
      {methodology.phases.map((phase, phaseIdx) => (
        <div key={phaseIdx} className="bg-white rounded-2xl border border-black/10 overflow-hidden shadow-lg mt-6">
          {/* Phase header — yellow accent */}
          <div className="px-8 sm:px-12 pt-8 pb-0">
            <div className="border-b-2 border-primary/30 pb-4 mb-6">
              <h2 className="font-display font-extrabold text-lg sm:text-xl text-primary leading-tight">{phase.title}</h2>
              <p className="italic text-black/50 text-sm mt-1">{phase.subtitle}</p>
            </div>
          </div>

          <div className="px-8 sm:px-12 pb-8 space-y-6">
            {/* Objective */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-primary" />
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-black">Objetivo:</h3>
              </div>
              <p className="text-black/70 text-sm leading-relaxed">{phase.objective}</p>
            </div>

            {/* Deliverables */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4 text-primary" />
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-black">Entregáveis:</h3>
              </div>
              <ul className="space-y-1.5">
                {phase.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span className="text-black/70">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ListChecks className="h-4 w-4 text-primary" />
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-black">Etapas:</h3>
              </div>
              <ul className="space-y-3">
                {phase.steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-black/70">
                      <strong className="text-black">{s.title}:</strong> {s.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      {/* ── SCHEDULE PAGES ── */}
      {methodology.schedule.length > 0 && (
        <div className="bg-white rounded-2xl border border-black/10 overflow-hidden shadow-lg mt-6">
          <div className="relative bg-black text-white px-8 sm:px-12 py-6">
            <p className="text-primary font-display font-extrabold text-sm uppercase tracking-[0.3em]">Cronograma Detalhado</p>
            <p className="text-white/50 text-xs mt-1">Planejamento dia a dia para execução otimizada</p>
          </div>

          <div className="px-8 sm:px-12 py-8 space-y-8">
            {methodology.schedule.map((schedPhase, spIdx) => (
              <div key={spIdx}>
                {/* Schedule phase header */}
                <div className="border-b-2 border-primary/30 pb-3 mb-5">
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-primary">{schedPhase.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <span className="text-xs text-black/60">Prazo real: <strong className="text-black">{schedPhase.realDeadline}</strong></span>
                    <span className="text-xs text-black/60">Prazo cliente: <strong className="text-black">{schedPhase.clientDeadline}</strong></span>
                  </div>
                </div>

                {/* Days */}
                <div className="space-y-4">
                  {schedPhase.days.map((day, dIdx) => (
                    <div key={dIdx} className="pl-4 border-l-2 border-black/10">
                      <h4 className="font-display font-bold text-sm text-black mb-1.5">{day.day}</h4>
                      <ul className="space-y-1">
                        {day.tasks.map((task, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2 text-sm">
                            <span className="w-1 h-1 rounded-full bg-black/30 mt-2 flex-shrink-0" />
                            <span className="text-black/65">{task}</span>
                          </li>
                        ))}
                      </ul>
                      {day.note && (
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-600">
                          <AlertTriangle className="h-3 w-3" />
                          <span className="italic">{day.note}</span>
                        </div>
                      )}
                      {day.aiTips && day.aiTips.length > 0 && (
                        <div className="mt-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Lightbulb className="h-3 w-3 text-primary" />
                            <span className="text-[10px] uppercase tracking-wider font-bold text-primary">Use IA aqui:</span>
                          </div>
                          <ul className="space-y-0.5">
                            {day.aiTips.map((tip, tipIdx) => (
                              <li key={tipIdx} className="text-xs text-black/50">{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-8 sm:px-12 py-4 border-t border-black/5 flex items-center justify-between">
            <span className="font-display text-xs font-bold text-black/30">Studio Kiiro</span>
            <div className="flex items-center gap-4 text-[10px] text-black/30">
              <span>studiokiiro.com</span>
              <span>contato@studiokiiro.com</span>
              <span>(11) 99107-6096</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MethodologyDocument;
