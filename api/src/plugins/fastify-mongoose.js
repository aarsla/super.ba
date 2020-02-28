'use strict'

const fastifyPlugin = require('fastify-plugin')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

async function mongooseConnector (fastify, options, next) {
  // Jest's connection to in-memory mongodb for tests
  const uri = process.env.NODE_ENV === 'test' ? process.env.MONGO_URL : options.uri

  const mongodbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  mongoose.Promise = global.Promise

  await mongoose.connect(uri, mongodbOptions)

  mongoose.connection.on('error', err => {
    console.log('Mongoose connection error', err)
  })

  const mongo = {
    db: mongoose.connection,
    ObjectId: ObjectId
  }

  fastify
    .decorate('mongo', mongo)
    .addHook('onClose', function (fastify, done) {
      fastify.mongo.db.close(done)
    })

  next()
}

module.exports = fastifyPlugin(mongooseConnector)
