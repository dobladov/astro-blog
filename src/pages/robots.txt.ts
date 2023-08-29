import { SITE_URL } from '#astro/consts'

export async function get () {
  return {
    body: `User-agent: ia_archiver
Disallow: /

User-agent: *
Sitemap: ${SITE_URL}/sitemap-index.xml
`
  }
}
