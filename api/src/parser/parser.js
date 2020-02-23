const chalk = require('chalk')
const klixParser = require('./feeds/klix')
const radioSarajevoParser = require('./feeds/radiosarajevo')

async function runParser () {
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

runParser()
