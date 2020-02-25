const amqp = require('amqplib')
const amqpUrl = process.env.AMQP_URL
const exchangeName = 'news'
const qName = 'articles'

const instance = (async () => {
  this.exchangeName = exchangeName
  this.connection = await amqp.connect(amqpUrl)
  this.channel = await this.connection.createChannel()

  await this.channel.assertExchange(exchangeName, 'direct')
  await this.channel.assertQueue('articles', { exclusive: false })

  this.sendMessage = async (article) => {
    try {
      const routingKey = article.source.title
      const message = JSON.stringify(article)

      this.channel.bindQueue(qName, this.exchangeName, routingKey)

      await this.channel.publish(this.exchangeName, routingKey, Buffer.from(message))
    } catch (error) {
      console.log(error.message)
    }
  }
  return this
})()

class RabbitMqClient {
  constructor () {
    this.instance = instance
  }
}

module.exports = RabbitMqClient
