I will fix the horizontal positioning of the "Logotipo e variações" image by moving the translation from a Tailwind class to the Framer Motion `style` prop. This ensures it isn't overwritten by Framer Motion's internal transform management.

### Technical Details
- **File**: `src/pages/ProjectDetail.tsx`
- **Change**: 
    1. Remove `-translate-x-[200px]` from the `className`.
    2. Add `x: project.slug === 'akedah-podcast' ? -200 : 0` to the `style` prop of the `motion.img`.
    3. Keep `max-w-full` but ensure it doesn't constrain the movement in a way that looks like "nothing changed" (I'll try removing `max-w-full` if it still seems too small, but for now I'll just move the translation to `style`).
- **Verification**: The image should now correctly shift 200px to the left.
