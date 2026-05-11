The user wants to keep the 200px left shift but noted that the image now appears zoomed and cropped, cutting off information.

The zoom/crop is likely caused by the `useTransform` scale animation:
```typescript
const variationsScale = useTransform(variationsScroll, [0, 0.5, 1], [0.95, 1, 1.05]);
```
When this project is viewed, the image is scaled up (up to 1.05) as the user scrolls, and since it has `max-w-none` and is inside an `overflow-hidden` container, it easily clips.

To fix this:
1. I will remove the `scale` transformation for the `akedah-podcast` project to ensure it stays at its natural size (scale: 1).
2. I will keep the `x: -200` translation as requested previously.
3. I will ensure the container handles the overflow without unnecessary cropping if possible, but the primary issue is the scaling.

### User Review Required

> [!IMPORTANT]
> I will be removing the "scroll-to-zoom" effect on this specific image to prevent it from cropping the information, while maintaining the 200px shift to the left that you requested.

### Technical Details

- **File**: `src/pages/ProjectDetail.tsx`
- **Change**: Modify the `style` prop of the `motion.img` in the "Variations" section.
- **Logic**: 
  - Change `scale: project.slug === 'akedah-podcast' ? variationsScale : 1` to `scale: 1` (or simply remove it from the condition for this project).
  - Keep `x: project.slug === 'akedah-podcast' ? -200 : 0`.
