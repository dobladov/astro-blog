import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION } from '#astro/consts'

import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function get (context) {
  const posts = await getCollection('blog')

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts
      .filter((post) => !post.data.draft)
      .map((post) => {
        return {
          ...post.data,
          link: `/blog/${post.slug}/`,
          content: sanitizeHtml(parser.render(post.body), {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
          })
    }})
  })
}
