## Objective
Fix the cropping/zoom issue in the "Logotipo e variações" image for the Akedah Podcast project. The user reports that information is still being cut off despite previous attempts to fix it.

## Technical Analysis
- The image container has `overflow-hidden` and `justify-center`.
- For the `akedah-podcast` project, the image has `className="max-w-none"`.
- It also has a transform applied: `x: -200`.
- The combination of `max-w-none`, `justify-center`, and `x: -200` on an image that is likely wider than the screen (or container) is causing it to shift left and be clipped by the `overflow-hidden` parent.
- To show the image "completely without cutting anything," we should allow it to fit within the container's width.

## Proposed Changes
- In `src/pages/ProjectDetail.tsx`:
    - Remove the conditional `max-w-none` for `akedah-podcast`.
    - Change it to `w-full` or a specific `max-w` that ensures it fits.
    - Remove the `x: -200` offset which was likely intended to "center" a specific part of a wider image but is now causing the cropping of the new image.
    - Reset the `scale` and `x` properties for this project to ensure a clean display.

## Implementation Steps
1. Modify `src/pages/ProjectDetail.tsx`.
2. Update the `style` prop of the `motion.img` in the Variations section to remove the `x` offset for Akedah Podcast.
3. Update the `className` to use `w-full` (consistent with other projects) or `max-w-full` to ensure the image stays within bounds.
4. Remove the `overflow-hidden` on the parent if necessary, though `w-full` should solve it.
