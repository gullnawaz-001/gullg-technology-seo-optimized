import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL, DEFAULT_OG_IMAGE, SITE_NAME } from '../lib/seoSchemas';

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  ogImageAlt?: string;
  noIndex?: boolean;
  schemas?: Record<string, any>[];
  publishedTime?: string;
  category?: string;
}

export function SEO({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = 'GullG Technology - Digital Innovation Agency',
  noIndex = false,
  schemas = [],
  publishedTime,
  category
}: SEOProps) {
  const fullTitle = title.includes('GullG') ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonicalPath.startsWith('http')
    ? canonicalPath
    : `${SITE_URL}${canonicalPath.startsWith('/') ? '' : '/'}${canonicalPath}`;

  const resolvedOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      
      {/* Canonical Link */}
      {!noIndex && <link rel="canonical" href={canonicalUrl} />}

      {/* Robots Tag */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {category && <meta property="article:section" content={category} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* JSON-LD Schemas */}
      {schemas.map((schemaObj, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(schemaObj)}
        </script>
      ))}
    </Helmet>
  );
}
