/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_FORMSPREE_FORM_ID?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_CONTACT_PHONE_E164?: string;
  readonly PUBLIC_CONTACT_PHONE_DISPLAY?: string;
  readonly PUBLIC_CONTACT_ADDRESS?: string;
  readonly PUBLIC_STREET_ADDRESS?: string;
  readonly PUBLIC_ADDRESS_LOCALITY?: string;
  readonly PUBLIC_ADDRESS_REGION?: string;
  readonly PUBLIC_ADDRESS_COUNTRY?: string;
  readonly PUBLIC_INSTAGRAM_URL?: string;
  readonly PUBLIC_LINKEDIN_URL?: string;
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
  readonly PUBLIC_TWITTER_SITE?: string;
}
