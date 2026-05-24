import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

function resolveSiteUrl(rawSiteUrl, shouldValidate) {
  const fallback = 'https://solutenerji.com';
  const value = rawSiteUrl?.trim() || fallback;

  try {
    const url = new URL(value);
    if (shouldValidate && url.protocol !== 'https:') {
      throw new Error('PUBLIC_SITE_URL must use https in production builds.');
    }
    return url.href.replace(/\/$/, '');
  } catch (error) {
    if (shouldValidate) {
      throw error;
    }
    return fallback;
  }
}

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const env = loadEnv(mode, process.cwd(), '');
const isBuild = process.argv.includes('build') || process.env.npm_lifecycle_event === 'build';
const site = resolveSiteUrl(env.PUBLIC_SITE_URL, isBuild);

export default defineConfig({
  site,
  output: 'static',

  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/tesekkurler') &&
        !page.includes('/gunes-enerjisi') &&
        !page.includes('/ev-sarj-ve-danismanlik') &&
        !page.includes('/iletisim'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 0,
    },
  },
});
