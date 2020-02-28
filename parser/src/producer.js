const config = require('config')
const amqp = require('amqp-connection-manager')
const EXCHANGE_NAME = 'news'

const connection = amqp.connect([config.amqp])
connection.on('connect', () => console.log('Ampq Connected!'))
connection.on('disconnect', err => console.log('Ampq Disconnected.', err))

let channelWrapper

async function sendMessage (article) {
  const QUEUE_NAME = article.source.title
  const ROUTING_KEY = article.source.title

  channelWrapper = connection.createChannel({
    json: true,
    setup: channel => {
      return Promise.all([
        channel.assertQueue(QUEUE_NAME, { durable: true, exclusive: false }),
        channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY),
        channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true })
      ])
    }
  })

  // console.log(`Sending ${article.source.title} - ${article.title}`)

  return channelWrapper.publish(EXCHANGE_NAME, QUEUE_NAME, article)
}

async function disconnect () {
  channelWrapper.close()
  connection.close()
}

module.exports = { connection, sendMessage, disconnect }
