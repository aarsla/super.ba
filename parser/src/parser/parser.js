const chalk = require('chalk')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const fs = require('fs')
const lockFile = require('lockfile')

const aljazeeraParser = require('./feeds/bih/aljazeera')
const avazParser = require('./feeds/bih/avaz')
const cinParser = require('./feeds/bih/cin')
const info24Parser = require('./feeds/bih/info24')
const klixParser = require('./feeds/bih/klix')
const n1infoParser = require('./feeds/bih/n1info')
const radioSarajevoParser = require('./feeds/bih/radiosarajevo')
const voaParser = require('./feeds/bih/voa')

const cnetParser = require('./feeds/tech/cnet')
const enadgetParser = require('./feeds/tech/engadget')

class Parser {
  constructor () {
    this.uuid = uuidv4()
    this.lockFilePath = `${process.cwd()}/tmp`
    this.lockFileName = `${this.lockFilePath}/${process.env.LOCK_FILE_NAME}`
  }

  async run () {
    try {
      await this.createLockFile()
      await this.processFeeds()
    } catch (error) {
      console.log(chalk.red(`Parser error: ${error.message}`))
    } finally {
      await this.removeLockFile()
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
    const voa = voaParser.process()

    const cnet = cnetParser.process()
    const enadget = enadgetParser.process()

    const parserPromises = [
      // avaz,
      // cin,
      // aljazeera,
      // info24,
      // klix,
      // n1info,
      // radioSarajevo,
      // voa,
      cnet,
      enadget
    ]

    await Promise.all(parserPromises)

    const stop = moment().format('YYYY-MM-DD HH:mm:ss')
    console.log(chalk.green(`${stop} : parser finished`))
  }

  async createLockFile () {
    lockFile.lockSync(this.lockFileName, {})
    fs.writeFileSync(this.lockFileName, this.uuid)

    console.log(chalk.green(`Lock file ${this.uuid} created`))
  }

  async removeLockFile () {
    try {
      lockFile.unlockSync(this.lockFileName)
      console.log(chalk.green(`Lock file ${this.uuid} removed`))
    } catch (e) {
      console.log(chalk.red(`Failed to remove ${this.lockFileName}!`))
      throw e
    } finally {
      console.log()
    }
  }
}

module.exports = Parser
