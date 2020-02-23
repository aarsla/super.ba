const chalk = require('chalk')
const baseParser = require('./baseParser')
const Article = require('./model/article')
const db = require('./model/db')
const ArticleModel = db.model('Article')

const feed = 'https://24sata.info/feed/'
const source = {
  title: '24sata info',
  url: 'https://24sata.info/',
  logo: 'https://24sata.info/wp-content/uploads/2019/12/logo24_web-2.jpg'
}

// const htmlTagRegex = /(<([^>]+)>)/ig

class Info24 {
  constructor () {
    this.items = []
  }

  async process () {
    try {
      this.items = await baseParser(feed)

      for (const item of this.items) {
        if (await this.articleExists(item)) { return }

        await new Article(item.title)
          .setDescription(item['rss:description']['#'])
          .setPubDate(item.pubDate)
          .setLink(item.link)
          .setImage(null)
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

module.exports = new Info24()
