module.exports = {
  server: {
    address: process.env.API_SERVER_ADDRESS,
    port: process.env.API_SERVER_PORT,
    logger: false
  },
  mongodb: {
    uri: process.env.MONGODB
  },
  amqp: process.env.AMQP,
  domain: process.env.DOMAIN,
  jwt: {
    secret: process.env.APP_SECRET
  }
}
