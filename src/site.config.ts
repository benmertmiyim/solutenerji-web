function envString(key: keyof ImportMetaEnv, fallback: string): string {
  const v = import.meta.env[key];
  return typeof v === 'string' && v.trim().length > 0 ? v.trim() : fallback;
}

/** İletişim ve sosyal bağlantılar — PUBLIC_* ile .env üzerinden güncellenir. */
export const siteConfig = {
  companyShortName: 'Solut Enerji',
  companyLegalName: 'Solut Enerji Mühendislik',
  email: envString('PUBLIC_CONTACT_EMAIL', 'iletisim@solutenerji.com'),
  /** tel: bağlantısı için E.164 */
  phoneE164: envString('PUBLIC_CONTACT_PHONE_E164', '+902121234567'),
  phoneDisplay: envString('PUBLIC_CONTACT_PHONE_DISPLAY', '+90 (212) 123 45 67'),
  /** Tam adres (footer / insan okunur) */
  address: envString('PUBLIC_CONTACT_ADDRESS', 'İzmir, Türkiye'),
  /** Schema.org PostalAddress — GBP ile birebir olmalı */
  streetAddress: envString('PUBLIC_STREET_ADDRESS', ''),
  addressLocality: envString('PUBLIC_ADDRESS_LOCALITY', 'İzmir'),
  addressRegion: envString('PUBLIC_ADDRESS_REGION', 'İzmir'),
  addressCountry: envString('PUBLIC_ADDRESS_COUNTRY', 'TR'),
  instagramUrl: envString('PUBLIC_INSTAGRAM_URL', 'https://www.instagram.com/'),
  linkedinUrl: envString('PUBLIC_LINKEDIN_URL', 'https://www.linkedin.com/'),
} as const;

/** Sosyal profil URL’leri — yalnızca gerçek hesaplar (placeholder kök URL’ler hariç). */
export function siteConfigSameAs(): string[] {
  const out: string[] = [];
  const ig = siteConfig.instagramUrl;
  const li = siteConfig.linkedinUrl;
  if (ig && !/\/instagram\.com\/?$/i.test(ig)) out.push(ig);
  if (li && !/\/linkedin\.com\/?$/i.test(li)) out.push(li);
  return out;
}
