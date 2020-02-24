const chalk = require('chalk')
const WebSocket = require('ws')

const wsUrl = process.env.WS_URL

class WsClient {
  constructor () {
    this.connection = new WebSocket(wsUrl)

    this.connection.onopen = () => {
      console.log(chalk.green(`Ws client connected to ${wsUrl}`))

      const msg = { msg: 'hey' }
      const payload = JSON.stringify(msg)

      this.connection.send(payload)
    }

    this.connection.onmessage = (payload) => {
      try {
        const message = JSON.parse(payload.data)

        console.log('Received message => ', message)
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}

module.exports = WsClient
