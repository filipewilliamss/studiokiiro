import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: any;
}

const SEO = ({ 
  title = "Studio Kiiro | Design Estratégico & Identidade Visual", 
  description = "Studio Kiiro — Design estratégico que transforma marcas em referência visual. Especialistas em Identidade Visual, Branding e Presença Digital em São Paulo.",
  image = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d267e9c4-5caf-40ac-a058-3159ed1fe30c/id-preview-1aaaf73e--329d2406-9190-4896-bf7a-d98ea9a495ee.lovable.app-1773278607521.png",
  url = "https://studiokiiro.com",
  type = "website",
  schema
}: SEOProps) => {
  const siteTitle = title.includes("Studio Kiiro") ? title : `${title} | Studio Kiiro`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;