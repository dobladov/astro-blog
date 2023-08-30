import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION, SITE_AUTHOR } from '#astro/consts'

import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET (context) {
  const posts = await getCollection('blog')

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    customData: `
      <language>en</language>
      <managingEditor>danieldoblado@gmail.com (${SITE_AUTHOR})</managingEditor>
      <webMaster>danieldoblado@gmail.com (${SITE_AUTHOR})</webMaster>
      <lastBuildDate>${(new Date()).toUTCString()}</lastBuildDate>
      <generator>Astro</generator>
    `,
    items: posts
      .filter((post) => !post.data.draft)
      .map((post) => {
        return {
          ...post.data,
          link: `/blog/${post.slug}/`,
          content: sanitizeHtml(parser.render(post.body), {
            // allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
          }),
          categories: post.data.tags,
          author: SITE_AUTHOR
    }})
  })
}
