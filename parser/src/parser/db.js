require('dotenv').config()

const chalk = require('chalk')
const mongoose = require('mongoose')
const config = require('config')
const uri = config.mongodb.uri
const options = { useMongoClient: true }

mongoose.Promise = global.Promise

mongoose.connection.on('connected', function () {
  console.log(chalk.green('Mongoose connection open'))
})

mongoose.connection.on('error', function () {
  console.log(chalk.red('Mongoose connection error'))
})

mongoose.connection.on('disconnected', function () {
  console.log(chalk.yellow('Mongoose connection closed'))
  console.log('\n')
})

mongoose.connect(uri, options)

exports.uri = uri
exports.options = options
exports.mongoose = mongoose
