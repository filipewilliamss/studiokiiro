I will implement a "back to top" button and a "back to portfolio" link on the project details page, and update all other projects to follow the detailed layout used for the Akedah Podcast project.

### Phase 1: Navigation & Utility
- **Back to Top Button**: Add a floating button (arrow) on the side that appears when scrolling down.
- **Back to Portfolio**: Add a clear way to return to the previous page (portfolio/index) from the project detail view.

### Phase 2: Project Data Standardization
- Update `src/data/projects.ts` to include detailed fields for all projects:
    - **Construmar**: Add `subtitle`, `about`, `objective`, `concept`, `variations`, `construction`, `colors`, `typography`, `symbols`, `nonRecommended`, `applications`, and `finalResult`.
    - **Templo de Deus**: Add similar detailed fields.
    - **Team Luísa Crosstraining**: Add similar detailed fields.
- *Note: I will use the information already present in their "intro", "challenge", "strategy", "solution", and "result" fields to expand these into the new structure, ensuring the content remains factual to each project.*

### Phase 3: Project Detail Page Refinement
- Update `src/pages/ProjectDetail.tsx` to handle the display of these new fields for all projects, removing the "fallback" gallery and ensuring a consistent editorial experience.

### Technical Details
- Use `framer-motion` for the floating button's entrance/exit and smooth scroll.
- Use `react-router-dom`'s `Link` for the "Back to Portfolio" navigation.
- Ensure the `ProjectDetail.tsx` components are flexible enough to handle projects with different amounts of data (using conditional rendering).

````text
[ Floating Arrow ]  -> Bottom Right (or left as requested)
[ Back to Portfolio ] -> Top left or near navigation
````

I'll start by enhancing the project data and then move to the UI components.