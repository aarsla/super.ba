const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const articleSchema = new mongoose.Schema({
  _msgid: String,
  title: String,
  description: String,
  pubDate: Date,
  link: String,
  image: String,
  source: {
    title: String,
    url: String,
    logo: String
  },
  category: {
    title: String
  }
})

articleSchema.plugin(mongoosePaginate)

module.exports = articleSchema
