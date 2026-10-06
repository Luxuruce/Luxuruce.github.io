// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://luxuruce.github.io',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
