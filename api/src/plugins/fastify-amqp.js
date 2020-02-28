'use strict'

const fastifyPlugin = require('fastify-plugin')
const amqp = require('amqp-connection-manager')
const moment = require('moment')
const sourcesService = require('../services/sources')
const EXCHANGE_NAME = 'news'

async function amqpConnector (fastify, options, next) {
  const sources = await sourcesService.getSources()
  const queues = sources.results.map((source) => source.title)

  const connection = amqp.connect([options.uri])
  connection.on('connect', () => console.log('Amqp Connected!'))
  connection.on('disconnect', err => console.log('Amqp Disconnected.', err))

  queues.forEach((queue) => {
    const QUEUE_NAME = queue
    const ROUTING_KEY = queue

    const channelWrapper = connection.createChannel({
      setup: channel => {
        return Promise.all([
          channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true }),
          channel.assertQueue(QUEUE_NAME, { durable: true, exclusive: false }),
          channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY),
          channel.prefetch(1),
          channel.consume(QUEUE_NAME, function (data) {
            const stringMessage = data.content.toString()
            const message = JSON.parse(stringMessage)
            console.log(`Subscriber: ${moment(message.pubDate).format('DD MMM YYYY hh:mm')}: ${message.source.title} - ${message.title}`)

            broadcast(fastify, message)
            channel.ack(data)
          })
        ])
      }
    })

    channelWrapper.waitForConnect()
  })

  fastify.decorate('amqpConn', connection)
    .addHook('onClose', (done) => connection.close(done))

  const broadcast = (fastify, data) => {
    try {
      fastify.websocketServer.clients.forEach(function each (client) {
        if (client.readyState === 1) {
          if (data._id === 'super.ba') {
            return
          }

          const message = JSON.stringify(data)
          client.send(message)
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  fastify.get('/ws/:channel', { websocket: true }, (connection, req, channel) => {
    connection.socket.on('message', message => {
      console.log('Incoming message', message)

      const article = JSON.parse(message)
      if (article.source.title === channel) {
        broadcast(fastify, message)
      }
    })
  })

  next()
}

module.exports = fastifyPlugin(amqpConnector)
