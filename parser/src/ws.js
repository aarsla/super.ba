const WebSocket = require('ws')

const wsUrl = process.env.WS_URL

class WsClient {
  constructor (channel) {
    this.channel = channel
    this.wssChannel = `${wsUrl}/${channel}`
    this.connection = new WebSocket(this.wssChannel)
    console.log(this.wssChannel)
  }

  sendMessage (msg) {
    this.connection.onopen = () => {
      const payload = JSON.stringify(msg)
      this.connection.send(payload)
    }
  }
}

module.exports = WsClient
