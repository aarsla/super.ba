require('dotenv').config()
const Cron = require('./src/cron')

const cronSchedule = '0 */5 * * * *'

const start = async () => {
  try {
    const cron = new Cron(cronSchedule, false)
    // await cron.processFeeds()
    // cron.job.start()
  } catch (err) {
    console.log.error(err)
    process.exit(1)
  }
}

start()
