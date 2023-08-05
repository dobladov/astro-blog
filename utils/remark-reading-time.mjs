import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

export const remarkReadingTime = () => {
  return (tree, { data }) => {
    console.log(tree)
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)

    console.log(readingTime)
    data.astro.frontmatter.minutesRead = readingTime.text
    data.astro.frontmatter.words = readingTime.words
  }
}
