const chalk = require('chalk')
const db = require('../../parser/db')
const moment = require('moment')
const ArticleModel = require('../feeds/model/mongooseArticle')

async function deleter (ArticleModel) {
  // const existingArticle = await ArticleModel.findOne(
  //   {
  //     'source.title': 'CIN'
  //   }
  // )

  const dateTime = moment().subtract(2, 'hours')

  await ArticleModel.deleteMany({
    pubDate: { $gt: dateTime }
  })

  // await ArticleModel.deleteMany({
  //   'source.title': 'Cin'
  // })
}

async function runDeleter () {
  try {
    await deleter(ArticleModel)
    console.log(chalk.gray('--- deleter complete ---'))
  } catch (error) {
    console.log(chalk.red(error.message))
  } finally {
    db.mongoose.connection.close()
  }
}

runDeleter()
