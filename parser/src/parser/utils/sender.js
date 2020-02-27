const chalk = require('chalk')
const db = require('../../parser/db')
const Article = require('../feeds/model/article')
const ArticleModel = require('../feeds/model/mongooseArticle')
const { disconnect } = require('../../producer')

async function runSender () {
  try {
    const match = {
      // 'source.title': 'Klix',
      'category.title': 'BiH'
    }

    const dbArticles = await ArticleModel.aggregate([
      { $match: match },
      { $sample: { size: 1 } }
    ])

    const article = new Article('').fromModel(dbArticles.shift())
    await article.notify()

    console.log(chalk.gray('--- sender complete ---'))
  } catch (error) {
    console.log(`Sender error: ${error.message}`)
  } finally {
    await disconnect()
    db.mongoose.connection.close()
  }
}

runSender()
