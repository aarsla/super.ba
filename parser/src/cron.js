const chalk = require('chalk')
const CronJob = require('cron').CronJob
const Parser = require('./parser/parser')

class Cron {
  constructor (schedule, startJob) {
    console.log(chalk.green(`Cron scheduled to ${schedule}`))

    this.job = new CronJob(schedule, async () => {
      await this.processFeeds()
    }, null, false, 'Europe/Sarajevo')

    if (startJob) {
      this.job.start()
      console.log(chalk.green('Cron started'))
    }

    this.processFeeds = async () => {
      try {
        const parser = new Parser()
        await parser.run()
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}

module.exports = Cron
