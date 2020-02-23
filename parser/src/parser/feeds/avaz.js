const chalk = require('chalk')
const baseParser = require('./baseParser')
const Article = require('./model/article')
const db = require('./model/db')
const ArticleModel = db.model('Article')

const feed = 'https://avaz.ba/rss'
const source = {
  title: 'Avaz',
  url: 'https://avaz.ba',
  logo: 'https://avaz.ba/safari-pinned-tab.svg'
}

class Avaz {
  constructor () {
    this.items = []
  }

  async process () {
    try {
      this.items = await baseParser(feed)

      console.log(chalk.yellow(`${this.constructor.name} ...`))

      for (const item of this.items) {
        if (await this.articleExists(item)) { return }

        await new Article(item.title)
          .setDescription(item.description)
          .setPubDate(item.pubDate)
          .setLink(item.link)
          .setImage(item.enclosures ? item.enclosures[0].url : '')
          .setCategory({ title: 'BiH' })
          .setSource(source)
          .save()
      }
    } catch (error) {
      console.log(chalk.bold.red(`${this.constructor.name}: ${error.message}`))
    }
  }

  async articleExists (item) {
    return ArticleModel.findOne(
      {
        title: item.title,
        'source.title': source.title
      }
    )
  }
}

module.exports = new Avaz()
