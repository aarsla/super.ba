const chalk = require('chalk')
const baseParser = require('./baseParser')
const Article = require('./model/article')
const db = require('./model/db')
const ArticleModel = db.model('Article')

const feed = 'https://ba.n1info.com/rss/249/Naslovna'
const source = {
  title: 'N1 Info',
  url: 'https://ba.n1info.com/',
  logo: 'https://ba.n1info.com/Static/Picture/n1v2logo.png'
}

class N1info {
  constructor () {
    this.items = []
  }

  async process () {
    try {
      this.items = await baseParser(feed)

      for (const item of this.items) {
        if (await this.articleExists(item)) { return }

        await new Article(item.title)
          .setDescription(item.description)
          .setPubDate(item.pubDate)
          .setLink(item.link)
          .setImage(item['rss:image']['#'])
          .setCategory({ title: 'BiH' })
          .setSource(source)
          .save()
      }
    } catch (error) {
      console.log(chalk.bold.red(`${this.constructor.name}: ${error.message}`))
    } finally {
      console.log(chalk.gray(`${this.constructor.name} done`))
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

module.exports = new N1info()
