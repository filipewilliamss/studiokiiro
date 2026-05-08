I will fix the alignment of the logo variations image for the Akedah Podcast project to ensure it perfectly aligns with the left edge of the text blocks, as requested in the annotated image.

### Technical Details
- **File**: `src/pages/ProjectDetail.tsx`
- **Analysis**: The current code uses `container-editorial` (which has responsive padding/max-width) and the image container has `justify-start`. However, if the image itself has internal transparent padding or if there's a mismatch between the text container and the image container, it won't align.
- **Changes**:
    - Wrap the `motion.img` for the variations section in a container that explicitly removes any horizontal padding that might be inherited or applied, ensuring the "start" of the flex container is the absolute left edge of the editorial column.
    - Check if the text paragraph above it has any `max-w` or padding that differs from the image.
    - Specifically for `akedah-podcast`, I will add a small negative margin or ensure the `max-w-full` image doesn't have intrinsic padding.
    - **Refinement**: I'll use `items-start` on the flex container and check if the image itself needs a slight negative margin if it has white space at the edge. However, based on the user's "red line" drawing, the image just needs to be pulled further left. I will apply a negative margin or check the parent container's padding.

### Plan
1.  In `src/pages/ProjectDetail.tsx`, find the Variations section.
2.  Update the image container to ensure it doesn't have any constraints that prevent it from hitting the left edge of the content area.
3.  Add `ml-[-20px]` (or similar negative margin) to the image if necessary to compensate for intrinsic white space in the logo variations image, as shown in the user's drawing.
4.  Ensure `justify-start` is correctly applied.
