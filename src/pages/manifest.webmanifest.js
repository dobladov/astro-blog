// ---
// // skeleton for a manifest.webmanifest
// // https://developer.mozilla.org/en-US/docs/Web/Manifest
// // https://web.dev/add-manifest/
// // https://web.dev/progressive-web-apps/
// ---

import { SITE_DESCRIPTION, SITE_TITLE } from '#astro/consts'

export async function get () {
  return {
    body: JSON.stringify({
      name: SITE_TITLE,
      short_name: SITE_TITLE.split(' ')[1],
      developer: {
        name: SITE_TITLE,
        url: 'https://github.com/dobladov'
      },
      lang: 'en-US',
      start_url: '/',
      display: 'minimal-ui',
      background_color: 'hsl(0, 0%, 95%)',
      theme_color: 'hsl(180, 3%, 23%)',
      description: SITE_DESCRIPTION,
      icons: [
        {
          src: 'images/touch/homescreen48.png',
          sizes: '48x48',
          type: 'image/png'
        },
        {
          src: 'images/touch/homescreen72.png',
          sizes: '72x72',
          type: 'image/png'
        },
        {
          src: 'images/touch/homescreen96.png',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          src: 'images/touch/homescreen144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: 'images/touch/homescreen168.png',
          sizes: '168x168',
          type: 'image/png'
        },
        {
          src: 'images/touch/homescreen192.png',
          sizes: '192x192',
          type: 'image/png'
        }
      ],
      related_applications: [
        {
          platform: 'play',
          url: 'https://play.google.com/store/apps/details?id=cheeaun.hackerweb'
        }
      ]
    })
  }
}
