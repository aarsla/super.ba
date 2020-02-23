module.exports = {
  server: {
    address: '0.0.0.0',
    port: 3355,
    logger: {
      level: 'info',
      prettyPrint: true
    }
  },
  mongodb: {
    uri: 'mongodb://mongodb:27017/news',
    test: 'mongodb://mongodb:27017/test'
  },
  redis: 'redis://redis:6379',
  domain: 'http://web:3366',
  jwt: {
    secret: process.env.APP_SECRET
  }
}
