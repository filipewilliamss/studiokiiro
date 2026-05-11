## Objective
Replace the typography image for the "Akedah Podcast" project with a new URL provided by the user.

## Technical Details
- **File to modify**: `src/data/projects.ts`
- **Location**: Inside the `projects` array, for the object with `slug: "akedah-podcast"`.
- **Target index**: `pages[6]` (the seventh element in the `pages` array).
- **New URL**: `https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/1erxj049prw-1778461621817.png`

## Implementation Steps
1. Modify `src/data/projects.ts`.
2. Locate the `pages` array for the Akedah Podcast project.
3. Replace the current value at index 6 (`akedahPag7`) with the new URL.
4. Verify the change in the project detail page.
