module.exports = async (fastify, opts, done) => {
  fastify.get('/ws', { websocket: true }, (connection, req) => {
    connection.socket.on('message', message => {
      console.log('Incoming message', message)

      send(connection.socket, message)
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
