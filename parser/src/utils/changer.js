const chalk = require('chalk')
const db = require('../parser/db')
const ArticleModel = require('../parser/feeds/model/mongooseArticle')

class Changer {
  async run (oldSource = null, newSource = null) {
    if (!oldSource || !newSource) {
      console.log('Sources not set!')
      return
    }

    try {
      await ArticleModel.updateMany(
        {
          'source.title': oldSource
        },
        {
          $set: {
            'source.title': newSource
          }
        })

      console.log(chalk.gray('--- changer complete ---'))
    } catch (error) {
      console.log(error.message)
    } finally {
      db.mongoose.connection.close()
    }
  }
}

module.exports = new Changer()
