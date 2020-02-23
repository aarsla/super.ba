const chalk = require('chalk')
const CronJob = require('cron').CronJob
const Parser = require('./parser/parser')

class Cron {
  constructor (schedule, start) {
    console.log(chalk.green(`Cron scheduled to ${schedule}`))

    this.job = new CronJob(schedule, async () => {
      await this.processFeeds()
    }, null, true, 'Europe/Sarajevo')

    if (start) {
      this.job.start()
      console.log(chalk.green('Cron started'))
    }
  }

  async processFeeds () {
    console.log(chalk.yellow('--- cron starting parser ---'))
    const parser = new Parser()
    await parser.run()
  }
}

module.exports = Cron
