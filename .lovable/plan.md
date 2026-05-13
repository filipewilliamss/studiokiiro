The goal is to review and improve the SEO of the Studio Kiiro portfolio. Currently, the site has basic SEO in `index.html`, but lacks dynamic meta tags for project pages and consistent semantic structure for better indexing.

### Proposed SEO Enhancements:

1.  **Dynamic Project SEO**: Implement a SEO component using `react-helmet-async` (or a custom hook if we want to avoid extra deps, but Helmet is standard) to update the page title and meta description dynamically based on the project being viewed.
2.  **Semantic HTML Improvements**:
    *   Ensure each page has exactly one `h1`.
    *   Add `alt` text to all project images using the project title and context.
    *   Use semantic tags like `<article>` for projects and `<section>` for page segments.
3.  **Meta Data Refinement**:
    *   Update `index.html` with a more descriptive meta description.
    *   Add missing Open Graph (OG) tags for better social sharing.
4.  **JSON-LD Schema**: Add a `LocalBusiness` or `ProfessionalService` schema to the homepage to help search engines understand the studio's nature and location.
5.  **Canonical Tags**: Add canonical tags to prevent duplicate content issues.

### Technical Details:

*   **Dependencies**: Install `react-helmet-async`.
*   **New Component**: Create `src/components/SEO.tsx` to handle meta tag injection.
*   **Project Details**: Update `src/pages/ProjectDetail.tsx` to include the `SEO` component, using the project title and subtitle for meta tags.
*   **Homepage**: Update `src/pages/Index.tsx` with studio-specific schema.
*   **Images**: Audit `ScrollAnimatedImage.tsx` and ensure it accepts and uses `alt` tags.

### Implementation Plan:

1.  **Install react-helmet-async**: `bun add react-helmet-async`.
2.  **Setup SEO Component**: Create a reusable `SEO` component.
3.  **Integrate SEO Component**:
    *   Add it to `src/App.tsx` (Provider).
    *   Add it to `src/pages/Index.tsx`.
    *   Add it to `src/pages/ProjectDetail.tsx`.
4.  **Semantic Audit**:
    *   Review `HeroSection.tsx` (ensure it has the only `h1` on the home page).
    *   Review `ProjectDetail.tsx` (ensure project title is `h1`).
    *   Add missing `alt` attributes in `PortfolioSection.tsx` and `ProjectDetail.tsx`.
5.  **Schema.org**: Add JSON-LD to `src/pages/Index.tsx`.
