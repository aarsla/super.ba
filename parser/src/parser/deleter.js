const chalk = require('chalk')
const db = require('./feeds/model/db')
const moment = require('moment')
const ArticleModel = db.model('Article')

async function deleter () {
  const dateTime = moment('2020-02-25T11:30:00.000+00:00')

  await ArticleModel.deleteMany({
    pubDate: { $gt: dateTime }
  })

  // await ArticleModel.deleteMany({
  //   'source.title': 'Cin'
  // })
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
