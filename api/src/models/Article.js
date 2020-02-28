const mongoose = require('mongoose')
const articleSchema = require('./schema/article')

module.exports = mongoose.model('Article', articleSchema)
