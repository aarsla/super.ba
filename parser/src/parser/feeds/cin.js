const chalk = require('chalk')
const baseParser = require('./baseParser')
const Article = require('./model/article')
const db = require('./model/db')
const ArticleModel = db.model('Article')

const feed = 'https://www.cin.ba/feed/'
const source = {
  title: 'Cin',
  url: 'https://www.cin.ba/',
  logo: 'https://www.cin.ba/wp-content/uploads/2016/09/logocin-300x246.jpg'
}

class Cin {
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

module.exports = new Cin()
