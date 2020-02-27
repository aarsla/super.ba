const amqp = require('amqp-connection-manager')
const amqpUrl = process.env.AMQP_URL
const EXCHANGE_NAME = 'news'

const connection = amqp.connect([amqpUrl])
connection.on('connect', () => console.log('Ampq Connected!'))
connection.on('disconnect', err => console.log('Ampq Disconnected.', err.stack))

let channelWrapper

async function sendMessage (article) {
  const QUEUE_NAME = article.source.title
  const ROUTING_KEY = article.source.title

  channelWrapper = connection.createChannel({
    json: true,
    setup: channel => {
      channel.assertQueue(QUEUE_NAME, { durable: true, exclusive: false })
      channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY)
      return channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true })
    }
  })

  console.log(`Sending ${article.source.title} - ${article.title}`)

  const message = JSON.stringify(article)
  return channelWrapper.publish(EXCHANGE_NAME, QUEUE_NAME, message)
}

async function disconnect () {
  channelWrapper.close()
  connection.close()
}

module.exports = { connection, sendMessage, disconnect }
