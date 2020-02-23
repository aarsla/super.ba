require('dotenv').config()
const config = require('config')
const chalk = require('chalk')
const fastifyServer = require('./src/server')
const server = fastifyServer()

const start = async () => {
  try {
    server.listen(config.server.port, config.server.address)
    console.log(chalk.green(`Server started at http://${config.server.address}:${config.server.port}`))
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
