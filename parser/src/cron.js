const chalk = require('chalk')
const CronJob = require('cron').CronJob
const Parser = require('./parser/parser')

class Cron {
  constructor (schedule, start) {
    console.log(chalk.green(`Cron scheduled to ${schedule}`))

    this.job = new CronJob(schedule, async () => {
      await this.processFeeds()
    }, null, false, 'Europe/Sarajevo')

    if (start) {
      this.job.start()
      console.log(chalk.green('Cron started'))
    }
  }

  async processFeeds () {
    const parser = new Parser()
    await parser.run()
  }
}

module.exports = Cron
