const chalk = require('chalk')
const baseParser = require('../baseParser')
const Article = require('../model/article')

const feed = 'https://www.theverge.com/rss/index.xml'
const source = {
  title: 'The Verge',
  url: 'https://www.theverge.com/',
  logo: 'https://www.userlogos.org/files/logos/zahnjin/TheVerge_logo_refl.png'
}

const imageRegex = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/

class TheVerge {
  constructor () {
    this.items = []
  }

  async process () {
    try {
      this.items = await baseParser(feed)

      for (const item of this.items) {
        const imageContainer = item['atom:content']['#']
        const regexResults = imageRegex.exec(imageContainer)
        const image = regexResults ? regexResults[1] : null

        const article = await new Article(item.title)
          .setDescription(item.description)
          .setPubDate(item.pubDate)
          .setLink(item.link)
          .setImage(image || '')
          .setCategory({ title: 'Tech' })
          .setSource(source)

        await article.save()
      }
    } catch (error) {
      console.log(chalk.bold.red(`${this.constructor.name}: ${error.message}`))
    } finally {
      // console.log(chalk.gray(`${this.constructor.name} done`))
    }
  }
}

module.exports = new TheVerge()
