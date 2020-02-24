const chalk = require('chalk')
const db = require('./feeds/model/db')
const ArticleModel = db.model('Article')

async function deleter () {
  await ArticleModel.deleteMany({
    'source.title': 'Cin'
  })
}

async function runDeleter () {
  try {
    console.log(chalk.green('--- running deleter ---'))
    await deleter()
    console.log(chalk.green('--- deleter complete ---'))
  } catch (error) {

  } finally {
    db.close()
  }
}

runDeleter()
