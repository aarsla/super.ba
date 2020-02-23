const send = (socket, data) => {
  try {
    const d = JSON.stringify({
      ...data
    })

    socket.send(d)
  } catch (error) {
    socket.send(error.message)
  }
}

module.exports = (socket, req) => {
  console.log('WS client connected')

  socket.on('message', (msg) => {
    try {
      const data = JSON.parse(msg)
      send(socket, { response: data })
    } catch (error) {
      socket.send('Invalid JSON payload')
    }
  })

  socket.on('close', () => {
    console.log('Client disconnected.')
  })
}
