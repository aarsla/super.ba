const chalk = require('chalk')
const moment = require('moment')
const db = require('../parser/db')
const ArticleModel = require('../parser/feeds/model/mongooseArticle')

class Deleter {
  async run (amount, interval) {
    const date = moment().subtract(amount, interval)

    try {
      await ArticleModel.deleteMany({
        pubDate: { $gt: date }
      })

      console.log(chalk.gray('--- deleter complete ---'))
    } catch (error) {
      console.log(chalk.red(error.message))
    } finally {
      db.mongoose.connection.close()
    }
  }
}

module.exports = new Deleter()
