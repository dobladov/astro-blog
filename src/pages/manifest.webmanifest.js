// ---
// // skeleton for a manifest.webmanifest
// // https://developer.mozilla.org/en-US/docs/Web/Manifest
// // https://web.dev/add-manifest/
// // https://web.dev/progressive-web-apps/
// ---

import { SITE_DESCRIPTION, SITE_TITLE } from '#astro/consts'

export async function GET () {
  return new Response(
    JSON.stringify({
      name: SITE_TITLE,
      short_name: SITE_TITLE.split(' ')[1],
      developer: {
        name: SITE_TITLE,
        url: 'https://github.com/dobladov'
      },
      lang: 'en-US',
      start_url: '/',
      display: 'minimal-ui',
      background_color: '#18181b',
      theme_color: 'rgb(161, 161, 170)',
      description: SITE_DESCRIPTION,
      icons: [
        {
          src: '/orb48.png',
          sizes: '48x48',
          type: 'image/png'
        },
        {
          src: '/orb72.png',
          sizes: '72x72',
          type: 'image/png'
        },
        {
          src: '/orb96.png',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          src: '/orb144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: '/orb168.png',
          sizes: '168x168',
          type: 'image/png'
        },
        {
          src: '/orb192.png',
          sizes: '192x192',
          type: 'image/png'
        }
      ]
    })
  )
}
