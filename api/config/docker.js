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
    uri: 'mongodb://mongodb:27017/news'
  },
  redis: 'redis://redis:6379',
  domain: 'http://web:3366',
  jwt: {
    secret: '7def4850f311ea9aaf50e54947e6c829e8606250f311ea8d5e'
  }
}
