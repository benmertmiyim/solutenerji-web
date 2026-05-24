function envString(key: keyof ImportMetaEnv, fallback: string): string {
  const v = import.meta.env[key];
  return typeof v === 'string' && v.trim().length > 0 ? v.trim() : fallback;
}

function safeHttpsUrl(value: string, allowedHostPattern: RegExp): string {
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && allowedHostPattern.test(url.hostname)) {
      return url.href;
    }
  } catch {}

  return '';
}

function safeSocialProfileUrl(value: string, allowedHostPattern: RegExp): string {
  const href = safeHttpsUrl(value, allowedHostPattern);
  if (!href) return '';

  const url = new URL(href);
  return url.pathname.replace(/\/+$/, '').length > 0 ? href : '';
}

/** İletişim ve sosyal bağlantılar — PUBLIC_* ile .env üzerinden güncellenir. */
export const siteConfig = {
  companyShortName: 'Solut Enerji',
  companyLegalName: 'Solut Enerji Mühendislik',
  email: envString('PUBLIC_CONTACT_EMAIL', 'iletisim@solutenerji.com'),
  /** tel: bağlantısı için E.164 */
  phoneE164: envString('PUBLIC_CONTACT_PHONE_E164', '+905071811616'),
  phoneDisplay: envString('PUBLIC_CONTACT_PHONE_DISPLAY', '+90 (507) 181 16 16'),
  /** Tam adres (footer / insan okunur) */
  address: envString('PUBLIC_CONTACT_ADDRESS', 'Umutbey Mah. Şehitler Cd. No 10C Konak/İzmir'),
  /** Schema.org PostalAddress — GBP ile birebir olmalı */
  streetAddress: envString('PUBLIC_STREET_ADDRESS', 'Umutbey Mah. Şehitler Cd. No 10C'),
  addressLocality: envString('PUBLIC_ADDRESS_LOCALITY', 'İzmir'),
  addressRegion: envString('PUBLIC_ADDRESS_REGION', 'İzmir'),
  addressCountry: envString('PUBLIC_ADDRESS_COUNTRY', 'TR'),
  openingHours: envString('PUBLIC_OPENING_HOURS', 'Mo-Sa 09:00-18:00'),
  openingHoursDisplay: envString('PUBLIC_OPENING_HOURS_DISPLAY', 'Pazartesi - Cumartesi: 09:00 - 18:00'),
  instagramUrl: safeSocialProfileUrl(
    envString('PUBLIC_INSTAGRAM_URL', ''),
    /(^|\.)instagram\.com$/i,
  ),
  linkedinUrl: safeSocialProfileUrl(
    envString('PUBLIC_LINKEDIN_URL', ''),
    /(^|\.)linkedin\.com$/i,
  ),
} as const;

/** Sosyal profil URL’leri — yalnızca gerçek hesaplar (placeholder kök URL’ler hariç). */
export function siteConfigSameAs(): string[] {
  const out: string[] = [];
  const ig = siteConfig.instagramUrl;
  const li = siteConfig.linkedinUrl;
  if (ig) out.push(ig);
  if (li) out.push(li);
  return out;
}
