import { siteConfig, siteConfigSameAs } from '../site.config';

export function absoluteUrl(site: URL, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return new URL(p.slice(1), site).href;
}

export function logoUrl(site: URL): string {
  return new URL('/assets/logo.png', site).href;
}

export function globalJsonLd(site: URL): Record<string, unknown>[] {
  const origin = site.href.replace(/\/$/, '');
  const sameAs = siteConfigSameAs();

  const address: Record<string, unknown> = {
    '@type': 'PostalAddress',
    addressCountry: siteConfig.addressCountry,
    addressLocality: siteConfig.addressLocality,
    addressRegion: siteConfig.addressRegion,
  };
  if (siteConfig.streetAddress) {
    address.streetAddress = siteConfig.streetAddress;
  }

  const organization: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.companyShortName,
    legalName: siteConfig.companyLegalName,
    url: origin,
    logo: logoUrl(site),
    email: siteConfig.email,
    telephone: siteConfig.phoneE164,
  };
  if (sameAs.length) organization.sameAs = sameAs;

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.companyShortName,
    url: origin,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.companyShortName,
    },
  };

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.companyLegalName,
    image: logoUrl(site),
    url: origin,
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
    address,
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Ege Bölgesi' },
      { '@type': 'City', name: 'İzmir' },
    ],
  };

  return [organization, website, localBusiness];
}

export function breadcrumbJsonLd(
  site: URL,
  items: readonly { name: string; path: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(site, item.path),
    })),
  };
}

export function serviceJsonLd(
  site: URL,
  service: { name: string; description: string; path: string },
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: siteConfig.companyShortName,
      url: site.href.replace(/\/$/, ''),
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Ege Bölgesi' },
      { '@type': 'City', name: 'İzmir' },
    ],
    url: absoluteUrl(site, service.path),
  };
}

export function faqPageJsonLd(
  faqs: readonly { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}
