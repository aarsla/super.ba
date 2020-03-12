const chalk = require('chalk')
const moment = require('moment')
const Article = require('../parser/feeds/model/article')
const db = require('../parser/db')
const ArticleModel = require('../parser/feeds/model/mongooseArticle')
const { disconnect } = require('../producer')

class Sender {
  async run (source, number) {
    try {
      const match = {}

      if (source) {
        match['source.title'] = source
      }

      const dbArticles = await ArticleModel.aggregate([
        { $match: match },
        { $sample: { size: number >= 1 ? number : 1 } }
      ])

      for (const dbArticle of dbArticles) {
        const article = new Article('').fromModel(dbArticle)
        await article.notify()
        console.log(`${moment(article.pubDate).format('DD MMM YYYY hh:mm')}: ${article.source.title} - ${article.title}`)
      }

      console.log(chalk.gray('--- sender complete ---'))
    } catch (error) {
      console.log(`Sender error: ${error.message}`)
    } finally {
      await disconnect()
      db.mongoose.connection.close()
    }
  }
}

module.exports = new Sender()
