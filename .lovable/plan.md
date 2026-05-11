## Objective
Replace the "Usos não recomendados" image for the "Akedah Podcast" project with a new URL provided by the user.

## Technical Details
- **File to modify**: `src/data/projects.ts`
- **Location**: Inside the `projects` array, for the object with `slug: "akedah-podcast"`.
- **Target index**: `pages[8]` (the ninth element in the `pages` array, which corresponds to the "Usos não recomendados" section in `ProjectDetail.tsx`).
- **New URL**: `https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/gxgomdmador-1778461875600.png`

## Implementation Steps
1. Modify `src/data/projects.ts`.
2. Locate the `pages` array for the Akedah Podcast project.
3. Replace the current value at index 8 (`akedahPag9`) with the new URL.
4. Verify the change by checking the "Usos não recomendados" section in the project detail page.
