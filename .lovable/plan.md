I will remove the containers (frames) from the "Akedah Podcast" project images in the "Conceito e solução de design" and "Logotipo e variações" sections. I will also increase the size of the logo variations image by 40% and apply a scroll-triggered parallax/zoom animation to both.

### Technical Details

- **File to modify:** `src/pages/ProjectDetail.tsx`
- **Component adjustments:**
  - Remove the `bg-white/[0.02] border border-white/5 rounded-2xl` classes from the container divs for both images in the Akedah Podcast specific logic.
  - For the "Logotipo e variações" section, increase the `max-w-4xl` constraint or use `max-w-[140%]` style to achieve the 40% size increase while ensuring it remains centered.
  - Add `useScroll` and `useTransform` logic localized to these image elements to create the scroll-based animation (fade + scale/zoom).
  - Adjust spacing between text and images by reducing `mb-16` or padding where appropriate to create a tighter "respiro" as requested.

### User Interface Changes

- The Akedah Podcast logo and its variations will now appear directly against the dark background of the site.
- Images will be larger and more prominent.
- A smooth zoom/movement effect will occur as the user scrolls past these sections.
