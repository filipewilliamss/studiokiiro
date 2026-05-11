## Objective
Replace the color palette image for the "Akedah Podcast" project with a new URL provided by the user.

## Technical Details
- **File to modify**: `src/data/projects.ts`
- **Location**: Inside the `projects` array, for the object with `slug: "akedah-podcast"`.
- **Target index**: `pages[5]` (the sixth element in the `pages` array, which corresponds to the "Paleta de cores" section in `ProjectDetail.tsx`).
- **New URL**: `https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/o0jdg67ugl-1778461519546.png`

## Implementation Steps
1. Modify `src/data/projects.ts`.
2. Locate the `pages` array for the Akedah Podcast project.
3. Replace the current value at index 5 (`akedahPag6`) with the new URL.
4. Verify the change by navigating to the project page and scrolling to the "Paleta de cores" section.
