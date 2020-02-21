module.exports = {
  server: {
    address: process.env.API_SERVER_ADDRESS,
    port: process.env.API_SERVER_PORT,
    logger: false
  },
  mongodb: {
    uri: process.env.MONGODB
  },
  redis: process.env.REDIS,
  domain: process.env.DOMAIN
}
