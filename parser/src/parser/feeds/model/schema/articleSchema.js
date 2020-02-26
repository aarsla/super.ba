const mongoose = require('mongoose')

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

module.exports = articleSchema
