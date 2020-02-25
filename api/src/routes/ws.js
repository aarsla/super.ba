module.exports = async (fastify, opts, done) => {
  fastify.register(require('fastify-websocket'))

  fastify.get('/ws', { websocket: true }, (connection, req) => {
    connection.socket.on('message', message => {
      console.log('Incoming message', message)

      send(connection.socket, message)
    })
  })

  fastify.get('/ws/:channel', { websocket: true }, (connection, req, channel) => {
    connection.socket.on('message', message => {
      console.log('Incoming message', message)

      broadcast(fastify, message)
    })
  })
}

const send = (socket, data) => {
  try {
    socket.send(data)
  } catch (error) {
    console.log(error.message)
  }
}

const broadcast = (fastify, data) => {
  try {
    fastify.websocketServer.clients.forEach(function each (client) {
      if (client.readyState === 1) {
        client.send(data)
      }
    })
  } catch (error) {
    console.log(error.message)
  }
}
