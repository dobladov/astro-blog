import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

import sitemap from '@astrojs/sitemap'
import { remarkReadingTime } from './utils/remark-reading-time.mjs'
import rehypeExternalLinks from 'rehype-external-links'

// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: [
      remarkReadingTime,
      rehypeSlug,
      [rehypeAutolinkHeadings,
        { behavior: 'append' }
      ],
      [
        rehypeExternalLinks,
        {
          rel: ['nofollow'],
          target: ['_blank']
        }
      ]
    ]
  },
  site: 'https://dobla.do',
  integrations: [mdx(), sitemap()]
})
