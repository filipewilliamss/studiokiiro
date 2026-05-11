## Objective
Replace the two images in the "Construção, área de proteção e legibilidade" section of the "Akedah Podcast" project with the new URLs provided by the user.

## Technical Details
- **File to modify**: `src/data/projects.ts`
- **Project**: Akedah Podcast (slug: `akedah-podcast`)
- **Target indices in `pages` array**: 
    - `pages[3]` for the first image.
    - `pages[4]` for the second image.
- **New URLs**:
    - Image 1: `https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/kdno3twnwhl-1778460683658.png`
    - Image 2: `https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/5crxqn5dosm-1778460992251.png`

## Implementation Steps
1. Open `src/data/projects.ts`.
2. Locate the `projects` object with `slug: "akedah-podcast"`.
3. Update the `pages` array at index 3 and 4 with the new URLs.
4. Verify the changes by checking the "Construção, área de proteção e legibilidade" section in the project detail page.
