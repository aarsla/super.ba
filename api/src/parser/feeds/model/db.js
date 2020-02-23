require('dotenv').config()
const mongoose = require('mongoose')
const config = require('config')
const articleSchema = require('../../../models/schema/article')
const uri = config.mongodb.test

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

mongoose.Promise = global.Promise

function connectToMongoDB (uri, options) {
  const connection = mongoose.createConnection(uri, options)
  connection.model('Article', articleSchema)

  connection.once('open', function () { })
  connection.on('error', console.error.bind(console, 'connection error:'))

  return connection
}

module.exports = exports = connectToMongoDB(uri, options)
