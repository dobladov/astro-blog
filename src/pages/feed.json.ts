import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "#astro/consts";
import { getCollection } from 'astro:content'

import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function get (context) {
    const posts = await getCollection('blog')

    return {
        body: JSON.stringify({
            version: "https://jsonfeed.org/version/1",
            title: SITE_TITLE,
            home_page_url: SITE_URL,
            feed_url: `${SITE_URL}${context.url.pathname}`,
            description: SITE_DESCRIPTION,
            icon: `${SITE_URL}/orb512.png`,
            favicon: `${SITE_URL}/orb48.png`,
            language: "en",
            authors: [
                {
                    name: SITE_AUTHOR,
                    url: SITE_URL,
                    image: `${SITE_URL}/orb512.png`,
                }
            ],
            items: posts
                .filter((post) => !post.data.draft)
                .map((post) => {
                    const url = `${SITE_URL}/blog/${post.slug}/`;
                    return {
                        id: url,
                        title: post.data.title,
                        url,
                        summary: post.data.description,
                        date_published: post.data.pubDate,
                        content_html: sanitizeHtml(parser.render(post.body), {
                            // allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
                        }),
                        tags: post.data.tags,
                    }
                })
        }, null, 2),
    }
}
