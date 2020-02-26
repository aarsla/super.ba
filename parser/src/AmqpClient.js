const amqp = require('amqplib')
const amqpUrl = process.env.AMQP_URL
const exchangeName = 'news'

const instance = (async () => {
  this.exchangeName = exchangeName

  try {
    this.connection = await amqp.connect(amqpUrl)
    this.channel = await this.connection.createChannel()

    await this.channel.assertExchange(exchangeName, 'direct')

    this.disconnect = async () => {
      await this.channel.close()
      await this.connection.close()
    }

    this.sendMessage = async (article) => {
      try {
        const qName = article.source.title
        const routingKey = article.source.title
        const message = JSON.stringify(article)

        await this.channel.assertQueue(qName, { durable: true, exclusive: false })
        // this.channel.bindQueue(qName, this.exchangeName, routingKey)

        await this.channel.publish(this.exchangeName, routingKey, Buffer.from(message))
      } catch (error) {
        console.log(error.message)
      }
    }

    return this
  } catch (error) {
    console.log(error.message)
    return undefined
  }
})()

class Producer {
  constructor () {
    this.instance = instance
  }
}

module.exports = Producer
