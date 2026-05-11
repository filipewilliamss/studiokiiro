## Objective
Remove specific text-related line decorations (dashes/horizontal lines) that appear before or within titles and paragraphs across the entire website, while preserving structural section separators.

## Technical Details

### 1. Component Cleanup (Removing Decorative Lines)
I will remove the `span` or `div` elements that render small horizontal lines (usually `h-[1px]`) next to titles and eyebrows in the following components:
- **HeroSection.tsx**: Remove lines next to \\"Creative Design Studio\\" and \\"EST. 2018\\".
- **AboutSection.tsx**: Remove line before \\"A Mente Criativa\\". Also remove the 20px line between paragraphs in the content side.
- **ServicesSection.tsx**: Remove line before \\"Soluções Estratégicas\\".
- **ContactSection.tsx**: Remove lines surrounding \\"Pronto para o próximo nível?\\".
- **EditorialQuote.tsx**: Remove lines next to the eyebrow and attribution.
- **ProjectDetail.tsx**: Remove lines from all section headers (\\"Sobre o projeto\\", \\"O Desafio\\", \\"O Objetivo\\", \\"Conceito\\", etc.).

### 2. Text Cleanup (Removing Dashes/Separators)
I will replace em dashes (`—`) or double dashes (`--`) used as text separators with commas or spaces to ensure natural reading flow without the visual dash:
- **ServicesSection.tsx**: Update service descriptions.
- **HeroSection.tsx**: Update the location/meta bar.
- **ContactSection.tsx**: Update the manifesto/quote text.
- **data/projects.ts**: Update project descriptions, challenges, and strategy texts.
- **data/methodologyStages.ts**: Update phase names.
- **TestimonialsSection.tsx**: Update testimonial text.

### 3. Preserved Elements
- Vertical lines connecting steps in `ProcessSection`.
- Full-width section divider borders (`border-t`, `border-b`).
- Background grid patterns and gradients.
- Progress bars and indicators in sliders/portfolio.

## User-Facing Description
Vou remover os traços decorativos que aparecem ao lado de títulos e no meio de alguns textos em todo o site, garantindo um visual mais limpo conforme solicitado. As linhas que separam as seções principais e os elementos estruturais do design serão mantidas para preservar a organização da página.
