import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
    title: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'profile';
    author?: string;
    publishedTime?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description = "Araucária Informa - O seu portal de notícias, eventos e serviços de Araucária, atualizado em tempo real.",
    image = "/icon-192.png", // Usando o ícone do app como padrão se nada for passado
    url = typeof window !== 'undefined' ? window.location.href : '',
    type = 'website',
    author = 'Redação Araucária Informa',
    publishedTime
}) => {

    // Concatena o nome do site ao título, se já não tiver
    const siteTitle = title.includes('Araucária Informa') ? title : `${title} | Araucária Informa`;

    // Garante URL absoluta para imagem (OG tags exigem URL completa)
    const absoluteImage = image?.startsWith('http')
        ? image
        : `${window.location.origin}${image.startsWith('/') ? image : '/' + image}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            {publishedTime && <meta name="article:published_time" content={publishedTime} />}
            {author && <meta name="author" content={author} />}

            {/* Open Graph / Facebook / WhatsApp */}
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content="Araucária Informa" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={absoluteImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={url} />
            <meta property="og:locale" content="pt_BR" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={absoluteImage} />

            {/* Canonical */}
            <link rel="canonical" href={url} />

            {/* JSON-LD Structured Data (Google News & AdSense Friendly) */}
            <script type="application/ld+json">
                {JSON.stringify(
                    type === 'article' ? {
                        "@context": "https://schema.org",
                        "@type": "NewsArticle",
                        "headline": title.substring(0, 110), // Google limits
                        "image": [absoluteImage],
                        "datePublished": publishedTime || new Date().toISOString(),
                        "dateModified": publishedTime || new Date().toISOString(),
                        "author": [{
                            "@type": "Person",
                            "name": author || "Redação Araucária Informa",
                            "url": "https://araucariainforma.com/sobre"
                        }],
                        "publisher": {
                            "@type": "Organization",
                            "name": "Araucária Informa",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://araucariainforma.com/icon-192.png"
                            }
                        },
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": url
                        },
                        "description": description
                    } : {
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Araucária Informa",
                        "url": "https://araucariainforma.com/",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://araucariainforma.com/busca?q={search_term_string}",
                            "query-input": "required name=search_term_string"
                        }
                    }
                )}
            </script>
        </Helmet>
    );
};

export default SEO;
