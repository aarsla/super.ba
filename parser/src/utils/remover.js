const chalk = require('chalk')
const db = require('../parser/db')
const ArticleModel = require('../parser/feeds/model/mongooseArticle')

class Remover {
  async run (source = null) {
    if (!source) {
      console.log('Source is not set')
      return
    }

    try {
      await ArticleModel.deleteMany({
        'source.title': source
      })

      console.log(chalk.gray('--- deleter complete ---'))
    } catch (error) {
      console.log(chalk.red(error.message))
    } finally {
      db.mongoose.connection.close()
    }
  }
}

module.exports = new Remover()
