const documentation = require('../routes/documentation/root')

const root = [
  {
    method: 'GET',
    url: '/api',
    handler: function (request, reply) {
      reply.send({ api: 'super.ba', version: 1.0 })
    },
    schema: documentation.getRootSchema
  },
  {
    method: 'GET',
    url: '/ws',
    handler: function (request, reply) {
      reply.send({ api: 'super.ba ws', version: 1.0 })
    },
    schema: documentation.getRootSchema
  }
]

const routes = [...root]

module.exports = routes
