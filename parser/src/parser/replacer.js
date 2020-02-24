const chalk = require('chalk')
const db = require('./feeds/model/db')
const ArticleModel = db.model('Article')

async function replacer () {
  await ArticleModel.updateMany({
    'source.title': 'xxx'
  }, { $set: { 'source.title': 'CIN' } })
}

async function runReplacer () {
  try {
    console.log(chalk.green('--- running replacer ---'))
    await replacer()
    console.log(chalk.green('--- replacer complete ---'))
  } catch (error) {

  } finally {
    db.close()
  }
}

runReplacer()
