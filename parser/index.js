require('dotenv').config()
const Cron = require('./src/cron')

// const cronSchedule = '*/15 * * * * *'
const cronSchedule = '0 */5 * * * *'

const start = async () => {
  try {
    const cron = new Cron(cronSchedule, false)
    cron.job.start()
    cron.processFeeds()
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

start()
