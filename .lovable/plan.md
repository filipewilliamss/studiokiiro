I will adjust the horizontal position of the "Logotipo e variações" image to be moved approximately 100 pixels to the left for the Akedah Podcast project.

### Technical Details
- **File**: `src/pages/ProjectDetail.tsx`
- **Change**: Replace the current `-translate-x-5` (which is 20px) with `-translate-x-[100px]` in the tailwind class for the variations image when the project slug is 'akedah-podcast'.
- **Verification**: Check that the image is shifted significantly to the left as requested without causing horizontal scroll issues on the container (which already has `overflow-hidden`).
