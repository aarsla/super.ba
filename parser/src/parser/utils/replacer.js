const chalk = require('chalk')
const db = require('../../parser/db')
const ArticleModel = require('../feeds/model/mongooseArticle')

async function replacer () {
  await ArticleModel.updateMany({
    'source.title': 'xxx'
  }, { $set: { 'source.title': 'CIN' } })
}

async function runReplacer () {
  try {
    await replacer()
    console.log(chalk.gray('--- replacer complete ---'))
  } catch (error) {

  } finally {
    db.mongoose.connection.close()
  }
}

runReplacer()
