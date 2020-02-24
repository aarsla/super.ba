const send = (socket, data) => {
  try {
    const payload = JSON.stringify({
      ...data
    })

    socket.send(payload)
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = (socket, req) => {
  console.log('WS client connected')

  socket.on('message', (message) => {
    console.log('Received message => ', message)

    try {
      const data = JSON.parse(message)
      send(socket, { response: data })
    } catch (error) {
      socket.send('Invalid JSON payload')
    }
  })

  socket.on('close', () => {
    console.log('Client disconnected.')
  })
}
