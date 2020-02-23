const chalk = require('chalk')
const db = require('./feeds/model/db')
const aljazeeraParser = require('./feeds/aljazeera')
const avazParser = require('./feeds/avaz')
const klixParser = require('./feeds/klix')
const radioSarajevoParser = require('./feeds/radiosarajevo')

class Parser {
  async run () {
    try {
      await this.processFeeds()
    } catch (error) {

    } finally {
      db.close()
    }
  }

  async processFeeds () {
    console.log(chalk.green('--- parser processing feeds ---'))

    const avaz = avazParser.process()
    const aljazeera = aljazeeraParser.process()
    const klix = klixParser.process()
    const radioSarajevo = radioSarajevoParser.process()

    const parsers = [
      // avaz
      // aljazeera,
      // klix,
      // radioSarajevo
    ]

    await Promise.all(parsers)
  }
}

module.exports = Parser
