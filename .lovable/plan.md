I will adjust the image sizes for the Akedah Podcast project to match your specific requirements while ensuring a professional presentation without any information loss.

### Changes:

- **Conceito e Solução de Design**: Increase the primary logo size by 20% (from 300px to 360px on mobile, and 500px to 600px on desktop).
- **Logotipo e Variações**: 
    - Decrease the variations image size by 20% from its current state.
    - Remove the negative margin/large overflow that was causing side-clipping.
    - Ensure the image fits perfectly within the viewport to prevent any text or graphics from being cut off at the edges.

### Technical Details:

- Update `ProjectDetail.tsx` responsive classes for the first logo (`max-w-[360px]` and `md:max-w-[600px]`).
- Adjust the variations image container to use `max-w-full` or a slightly smaller percentage to ensure no clipping, while maintaining the requested size reduction.
- Keep the existing scroll-based zoom animations as they were well-received.
