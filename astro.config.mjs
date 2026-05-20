import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jasn9776.github.io',
  base: '/portfolio',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
