import rss from '@astrojs/rss';

export const get = () => rss({
  title: 'DobladoV',
  description: 'A humble Astronaut’s guide to the stars',
  site: import.meta.env.SITE,
  items: import.meta.glob('./**/*.md*'),
  stylesheet: '/rss/pretty-feed-v3.xsl',
});