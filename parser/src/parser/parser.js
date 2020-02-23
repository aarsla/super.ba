const chalk = require('chalk')
const db = require('./feeds/model/db')
const aljazeeraParser = require('./feeds/aljazeera')
const avazParser = require('./feeds/avaz')
const cinParser = require('./feeds/cin')
const info24Parser = require('./feeds/info24')
const klixParser = require('./feeds/klix')
const n1infoParser = require('./feeds/n1info')
const radioSarajevoParser = require('./feeds/radiosarajevo')
const moment = require('moment')

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
    const start = moment().format('YYYY-MM-DD HH:mm:ss')
    console.log(chalk.green(`${start} : parser processing feeds`))

    const avaz = avazParser.process()
    const cin = cinParser.process()
    const aljazeera = aljazeeraParser.process()
    const info24 = info24Parser.process()
    const klix = klixParser.process()
    const n1info = n1infoParser.process()
    const radioSarajevo = radioSarajevoParser.process()

    const parsers = [
      avaz,
      cin,
      aljazeera,
      info24,
      klix,
      n1info,
      radioSarajevo
    ]

    await Promise.all(parsers)

    const stop = moment().format('YYYY-MM-DD HH:mm:ss')
    console.log(chalk.green(`${stop} : feeds processed`))
  }
}

module.exports = Parser
