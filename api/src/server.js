const config = require('config')
const publicRoutes = require('./routes/public')
const privateRoutes = require('./routes/private')
const wsRoutes = require('./routes/ws')
const swagger = require('./config/swagger')

function fastifyServer () {
  const fastify = require('fastify')({ logger: config.server.logger })

  fastify.register(require('fastify-compress'))
  fastify.register(require('fastify-helmet'))
  fastify.register(require('fastify-cors'))
  fastify.register(require('./plugins/fastify-mongoose'), config.mongodb)
  fastify.register(require('fastify-swagger'), swagger.options)
  fastify.register(require('fastify-jwt'), { secret: config.jwt.secret })

  fastify.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  publicRoutes.forEach((route, index) => {
    fastify.route(route)
  })

  fastify.register(privateRoutes)
  fastify.register(wsRoutes)

  fastify.ready(err => {
    if (err) throw err
    fastify.swagger()
  })

  return fastify
}

module.exports = fastifyServer
