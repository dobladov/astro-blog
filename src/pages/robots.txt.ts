import { SITE_URL } from "#astro/consts";

export async function GET() {
  return new Response(`User-agent: ia_archiver
Disallow: /

User-agent: *
Disallow: 

Sitemap: ${SITE_URL}/sitemap-index.xml
`);
}
