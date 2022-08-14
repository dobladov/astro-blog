import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://dobladov.github.io',
	integrations: [react(), image(), mdx(), sitemap()],
	markdown: {
		shikiConfig: {
		  theme: 'dracula',
		},
	  },
});
