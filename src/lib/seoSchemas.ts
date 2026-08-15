/**
 * SEO Schema.org JSON-LD Generators for GullG Technology
 */

export const SITE_URL = 'https://gullgtech.online';
export const SITE_NAME = 'GullG Technology';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const SITE_LOGO = `${SITE_URL}/logo.png`;

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    'name': SITE_NAME,
    'alternateName': ['GullG Technologies', 'GullG'],
    'url': SITE_URL,
    'logo': {
      '@type': 'ImageObject',
      'url': SITE_LOGO,
      'width': 512,
      'height': 512
    },
    'image': DEFAULT_OG_IMAGE,
    'description': 'GullG Technology is a premier digital innovation agency delivering software development, UI/UX design, agentic AI integration, and workflow automation solutions.',
    'email': 'info@gullgtech.online',
    'founder': {
      '@type': 'Person',
      'name': 'Gull Nawaz'
    },
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'PK'
    },
    'sameAs': [
      'https://www.behance.net/gullnawaz',
      'https://www.linkedin.com/company/gullgtech',
      'https://twitter.com/gullgtech'
    ],
    'priceRange': '$$',
    'knowsAbout': [
      'Modern Web & Mobile App Development',
      'Data-Driven Dashboard Design',
      'UI/UX Prototyping & User Research',
      'Agentic AI & Chatbot Integration',
      'Intelligent Process & Workflow Automation',
      'Social Media Growth & Marketing Strategy',
      'Brand Identity & Design Systems'
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Digital Engineering & Innovation Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Modern Web & Mobile App Development',
            'description': 'High-performance, scalable full-stack applications built with modern frameworks.'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Data-Driven Dashboard Design',
            'description': 'Custom analytics dashboards and real-time business telemetry platforms.'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Live AI Chatbot Integration',
            'description': 'Custom LLM-powered context-aware AI assistants for customer support and automation.'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Intelligent Process & Workflow Automation',
            'description': 'Connecting enterprise tools with automated pipelines and robotic process workflows.'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'UI/UX Prototyping & User Research',
            'description': 'User-centered interactive prototypes, user journey mapping, and design systems.'
          }
        }
      ]
    }
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    'url': SITE_URL,
    'name': SITE_NAME,
    'description': 'Digital innovation agency bridging engineering, AI, and human-centric design.',
    'publisher': {
      '@id': `${SITE_URL}/#organization`
    },
    'inLanguage': 'en-US'
  };
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.name,
      'item': crumb.item.startsWith('http') ? crumb.item : `${SITE_URL}${crumb.item.startsWith('/') ? '' : '/'}${crumb.item}`
    }))
  };
}

export interface ArticleSchemaProps {
  title: string;
  excerpt: string;
  slug: string;
  datePublished: string;
  image: string;
  category: string;
}

export function getArticleSchema(article: ArticleSchemaProps) {
  const url = `${SITE_URL}/knowledge-hub/${article.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url
    },
    'headline': article.title,
    'description': article.excerpt,
    'image': [article.image],
    'datePublished': new Date(article.datePublished || '2026-08-15').toISOString(),
    'dateModified': new Date(article.datePublished || '2026-08-15').toISOString(),
    'author': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'url': SITE_URL
    },
    'publisher': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'logo': {
        '@type': 'ImageObject',
        'url': SITE_LOGO
      }
    },
    'articleSection': article.category,
    'inLanguage': 'en-US'
  };
}

export function getServiceSchema(title: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': title,
    'description': description,
    'url': url.startsWith('http') ? url : `${SITE_URL}${url}`,
    'provider': {
      '@id': `${SITE_URL}/#organization`
    },
    'areaServed': 'Worldwide',
    'serviceType': title
  };
}
