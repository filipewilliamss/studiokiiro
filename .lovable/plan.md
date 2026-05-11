## Objective
Replace the two images in the "Aplicações" section of the "Akedah Podcast" project with a single new image provided by the user.

## Technical Details
- **Files to modify**: 
    - `src/data/projects.ts`: Update the `pages` array for Akedah Podcast.
    - `src/pages/ProjectDetail.tsx`: Adjust the rendering logic for the "Aplicações" section to handle a single image specifically for Akedah Podcast.
- **Project**: Akedah Podcast (slug: `akedah-podcast`)
- **New URL**: `https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/inp2apbic18-1778462036867.png`
- **Target index**: `pages[9]`.

## Implementation Steps
1. **Modify `src/data/projects.ts`**:
    - Locate the `pages` array for the Akedah Podcast project.
    - Replace the values at indices 9 and 10 with the new URL at index 9 and remove index 10 (or keep it but we'll only use index 9 in the component). To keep things clean, I'll update index 9 and remove index 10.
2. **Modify `src/pages/ProjectDetail.tsx`**:
    - In the "Applications" section (around line 384), check if the project is "Akedah Podcast".
    - If so, render only one image instead of the two-column grid.
    - Ensure the single image spans the full width of the container.
3. **Verification**:
    - Navigate to the Akedah Podcast project page and scroll to the "Aplicações" section to ensure only one image is displayed and it matches the provided link.
