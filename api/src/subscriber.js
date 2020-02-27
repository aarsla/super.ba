const amqp = require('amqp-connection-manager')
const amqpUrl = process.env.AMQP_URL
const EXCHANGE_NAME = 'news'
const sourcesService = require('./services/sources')

const connection = amqp.connect([amqpUrl])
connection.on('connect', () => console.log('Amqp Connected!'))
connection.on('disconnect', err => console.log('Amqp Disconnected.', err.message))

async function subscriber () {
  const sources = await sourcesService.getSources()
  const queues = sources.results.map((source) => source.title)

  queues.forEach((queue) => {
    const QUEUE_NAME = queue
    const ROUTING_KEY = queue

    const channelWrapper = connection.createChannel({
      setup: channel => {
        // `channel` here is a regular amqplib `ConfirmChannel`.
        return Promise.all([
          channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true }),
          //   channel.assertQueue(QUEUE_NAME, { durable: true, exclusive: false, autoDelete: true }),
          channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY),
          channel.prefetch(1),
          channel.consume(QUEUE_NAME, function (data) {
            const message = JSON.parse(data.content.toString())
            console.log('subscriber: got message', message)
            channel.ack(data)
          })
        ])
      }
    })

    channelWrapper.waitForConnect()
  })
}

module.exports = subscriber()
