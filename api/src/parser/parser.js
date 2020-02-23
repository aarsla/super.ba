const chalk = require('chalk')
const klixParser = require('./feeds/klix')

async function runParser () {
  try {
    await klixParser.process()
  } catch (error) {
    console.log('ERR: ', error.message)
  }

  console.log(chalk.bold.gray('==========='))
  console.log(chalk.bold.green('Parser done'))
}

runParser()
