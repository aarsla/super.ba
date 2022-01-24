const chalk = require('chalk')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const fs = require('fs')
const lockFile = require('lockfile')

const avazParser = require('./feeds/bih/avaz')
const cinParser = require('./feeds/bih/cin')
const klixParser = require('./feeds/bih/klix')
const n1infoParser = require('./feeds/bih/n1info')
const raportParser = require('./feeds/bih/raport')
const radioSarajevoParser = require('./feeds/bih/radiosarajevo')
const voaParser = require('./feeds/bih/voa')

const cnetParser = require('./feeds/tech/cnet')
const enadgetParser = require('./feeds/tech/engadget')
const mashableParser = require('./feeds/tech/mashable')
const techCrunchParser = require('./feeds/tech/techCrunch')
const techRadarParser = require('./feeds/tech/techRadar')
const theNextWebParser = require('./feeds/tech/theNextWeb')
const theVergeParser = require('./feeds/tech/theVerge')
const wiredParser = require('./feeds/tech/wired')

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
    const avaz = avazParser.process()
    const cin = cinParser.process()
    const klix = klixParser.process()
    const n1info = n1infoParser.process()
    const raport = raportParser.process()
    const radioSarajevo = radioSarajevoParser.process()
    const voa = voaParser.process()

    const bihPromises = [
      avaz,
      cin,
      klix,
      n1info,
      raport,
      radioSarajevo,
      voa,
    ]

    const cnet = cnetParser.process()
    const enadget = enadgetParser.process()
    const mashable = mashableParser.process()
    const techCrunch = techCrunchParser.process()
    const techRadar = techRadarParser.process()
    const theNextWeb = theNextWebParser.process()
    const theVerge = theVergeParser.process()
    const wired = wiredParser.process()

    const techPromises = [
      cnet,
      enadget,
      mashable,
      techCrunch,
      techRadar,
      theNextWeb,
      theVerge,
      wired
    ]

    await this.processCategory([...bihPromises, ...techPromises])
  }

  async processCategory (parserPromises) {
    const start = moment().format('YYYY-MM-DD HH:mm:ss')
    console.log(chalk.green(`${start} : parser processing feeds`))

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
