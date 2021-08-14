const chalk = require('chalk')
const baseParser = require('../baseParser')
const Article = require('../model/article')

const feed = 'https://www.klix.ba/rss'
const source = {
  title: 'Klix',
  url: 'https://klix.ba/',
  logo: 'https://static.klix.ba/images/klix-logo2020.png'
}

class Klix {
  constructor () {
    this.items = []
  }

  async process () {
    try {
      this.items = await baseParser(feed)

      for (const item of this.items) {
        const article = await new Article(item.title)
          .setDescription(item.description)
          .setPubDate(item.pubDate)
          .setLink(item.link)
          .setImage(item.enclosures ? item.enclosures[0].url : '')
          .setCategory({ title: 'BiH' })
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

module.exports = new Klix()
