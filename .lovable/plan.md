## Objective
Remove all decorative horizontal lines (often used as section dividers or text accents) across the entire application, as requested by the user.

## Technical Details
The "lines" are implemented as `<span>` or `<div>` elements with specific classes or inline styles like:
- `bg-[#FFCA16]` or `bg-white/10`
- Fixed `h-[1px]` or `w-1px`
- Classes like `section-divider`

I will identify and remove these from all key components.

## Implementation Steps
1.  **Modify `src/pages/Index.tsx`**:
    - Remove the `SectionDivider` component and all its usages in the `Index` page.
2.  **Modify `src/pages/ProjectDetail.tsx`**:
    - Remove horizontal lines in the Hero metadata section.
    - Remove lines inside `h2` elements (subheaders).
    - Remove lines used as spacers/accents (e.g., line 141, 163, 178, 201, 242, 272, etc.).
3.  **Modify `src/components/AboutSection.tsx`**:
    - Remove the line in the "A Mente Criativa" intro (line 36).
    - Remove the line between paragraphs (line 95).
4.  **Modify `src/components/ServicesSection.tsx`**:
    - Remove the line in the intro section (line 62).
5.  **Modify `src/components/ProcessSection.tsx`**:
    - Remove the vertical connecting line (line 56) and the horizontal line in the "Fase" tag (line 84 if it exists as a line).
6.  **Modify `src/components/EditorialQuote.tsx`**:
    - Remove the line before the eyebrow text (line 24).
    - Remove the line before the attribution text (line 51).
7.  **Modify `src/components/ContactSection.tsx`**:
    - Remove the decorative lines at the top and bottom of the section (lines 11-12).
    - Remove the lines on both sides of the "Pronto para o próximo nível?" text (lines 28, 32).
8.  **Modify `src/components/HeroSection.tsx`**:
    - Remove the line in the meta intro (line 314).
    - Remove the scroll indicator line (line 390).
    - Remove the side label line (line 378).
9.  **Modify `src/components/PortfolioSection.tsx`**:
    - Remove the scroll indicator line (line 155).
    - Remove the indicator bars for cases (lines 142-144).
