import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

import cloudflare from "@astrojs/cloudflare";

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const env = loadEnv(mode, process.cwd(), '');

export default defineConfig({
  site: env.PUBLIC_SITE_URL || 'https://solutenerji.com',

  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
        !page.includes('/tesekkurler') &&
        !page.includes('/gunes-enerjisi') &&
        !page.includes('/ev-sarj-ve-danismanlik') &&
        !page.includes('/iletisim'),
    }),
  ],

  adapter: cloudflare()
});