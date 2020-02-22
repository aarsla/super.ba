const userRoutes = require('./definitions/user')
const articleRoutes = require('./definitions/articles')
const sourceRoutes = require('./definitions/sources')

const routes = [...userRoutes, ...sourceRoutes, ...articleRoutes]

module.exports = async (fastify, opts, done) => {
  fastify.register(async function (fastify, opts, done) {
    fastify.addHook('preHandler', async function (request, reply) {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply.send(err)
      }
    })

    routes.forEach((route, index) => {
      fastify.route(route)
    })
  })
}
