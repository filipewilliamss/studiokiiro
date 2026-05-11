## Objective
Replace the "Símbolos e elementos de apoio" image for the "Akedah Podcast" project with a new URL provided by the user.

## Technical Details
- **File to modify**: `src/data/projects.ts`
- **Location**: Inside the `projects` array, for the object with `slug: "akedah-podcast"`.
- **Target index**: `pages[7]` (the eighth element in the `pages` array, which corresponds to the symbols section in `ProjectDetail.tsx`).
- **New URL**: `https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/ot2f8gdzega-1778461772009.png`

## Implementation Steps
1. Modify `src/data/projects.ts`.
2. Locate the `pages` array for the Akedah Podcast project.
3. Replace the current value at index 7 (`akedahPag8`) with the new URL.
4. Verify the change by checking the "Símbolos e elementos de apoio" section in the project detail page.
