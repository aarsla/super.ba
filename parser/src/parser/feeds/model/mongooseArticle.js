const db = require('../../db')
const articleSchema = require('./schema/articleSchema')

const ArticleModel = db.mongoose.model('articles', articleSchema)

ArticleModel.mongoose = db.mongoose

module.exports = ArticleModel
