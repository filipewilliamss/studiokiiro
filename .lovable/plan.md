## Objective
Add a smooth scroll-triggered zoom-in/zoom-out animation and an entrance reveal effect to all project images.

## Technical Details
- Create a reusable `ScrollAnimatedImage` component that handles:
    - `useInView` and `motion` for the initial entrance effect (e.g., fade and scale up).
    - `useScroll` and `useTransform` for the scroll-synced zoom effect.
- The entrance effect will happen once when the image enters the viewport.
- The scroll zoom will continuously react to the scroll position relative to the image.

## Implementation Steps
1. **Create `ScrollAnimatedImage` component**:
    - Place it in a new file `src/components/ScrollAnimatedImage.tsx`.
    - Use `useRef` to track the image element.
    - Use `useScroll` with the `target` ref.
    - Transform scroll progress to scale (e.g., 0.95 to 1.1).
    - Use `initial`, `whileInView`, and `viewport={{ once: true }}` for the entrance animation.

2. **Refactor `ProjectDetail.tsx`**:
    - Replace all `<img>` and existing `motion.img` tags with the new `ScrollAnimatedImage` component.
    - This includes:
        - Concept images
        - Variations images
        - Construction images
        - Color palette images
        - Typography images
        - Symbols images
        - Applications images

3. **Fine-tune animations**:
    - Entrance: Scale from 0.8 to 1, opacity from 0 to 1, duration ~1s.
    - Scroll Zoom: Scale from 1 to 1.1 as the image moves from the bottom to the top of the viewport.
