const chalk = require('chalk')
const db = require('./feeds/model/db')
const aljazeeraParser = require('./feeds/aljazeera')
const klixParser = require('./feeds/klix')
const radioSarajevoParser = require('./feeds/radiosarajevo')

async function runParser () {
  try {
    await processFeeds()
  } catch (error) {

  } finally {
    db.close()
  }
}

runParser()

async function processFeeds () {
  try {
    await aljazeeraParser.process()
  } catch (error) {
    console.log('ERR: ', error.message)
  }

  try {
    await klixParser.process()
  } catch (error) {
    console.log('ERR: ', error.message)
  }

  try {
    await radioSarajevoParser.process()
  } catch (error) {
    console.log('ERR: ', error.message)
  }

  console.log(chalk.bold.gray('==========='))
  console.log(chalk.bold.green('Parser done'))
}
