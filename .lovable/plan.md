I will modify the project details pages to follow the user's specific navigation requests.

### Modifications

#### 1. Project Detail Page (`src/pages/ProjectDetail.tsx`)
- **Remove Fixed Side Button**: Delete the current fixed "Back to Portfolio" button that appears on the left side during scrolling.
- **Maintain Back to Top**: Keep the fixed "Back to Top" arrow on the bottom right.
- **Add End-of-Project Button**: Insert a new section at the end of the project content (just before the "Next Project" teaser). This section will feature a prominent "Voltar para o Portfólio" button.
- **Anchor Linking**: Configure the button to link specifically to the `#portfolio` section of the home page. I will use a standard anchor link to ensure the browser navigates to the home page and scrolls to the correct section.

#### 2. Technical Implementation Details
- The new button will match the site's editorial and minimal aesthetic, using a circular arrow icon and uppercase tracking for the label.
- I will ensure the transition between the project content and the footer/next-project section remains seamless.
- I'll verify that the link correctly scrolls to the portfolio section on the home page.

### User Experience Improvements
- **Cleaner Interface**: Removing the persistent side button reduces visual clutter while the user is focused on the project content.
- **Contextual Navigation**: Placing the "Back to Portfolio" button at the end of the project aligns with the natural reading flow—after finishing one project, the user can easily return to see others.
- **Precise Redirection**: Linking directly to the portfolio section (instead of the top of the home page) saves the user from having to scroll down again to find the project list.
