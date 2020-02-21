const config = require('config')
const routes = require('./routes/index')
const swagger = require('./config/swagger')

function fastifyServer () {
  const fastify = require('fastify')({ logger: config.server.logger })

  fastify.register(require('fastify-compress'))
  fastify.register(require('fastify-helmet'))
  fastify.register(require('fastify-cors'))
  fastify.register(require('./plugins/fastify-mongoose'), config.mongodb)
  fastify.register(require('fastify-swagger'), swagger.options)

  routes.forEach((route, index) => {
    fastify.route(route)
  })

  return fastify
}

module.exports = fastifyServer
