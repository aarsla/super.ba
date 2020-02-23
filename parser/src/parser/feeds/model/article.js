const db = require('./db')
const ArticleModel = db.model('Article')

class Article {
  constructor (title) {
    this.title = title
    this.description = undefined
    this.pubDate = undefined
    this.link = undefined
    this.image = undefined
    this.category = {}
    this.source = {}
  }

  setDescription (value) {
    this.description = value
    return this
  }

  setPubDate (value) {
    this.pubDate = value
    return this
  }

  setLink (value) {
    this.link = value
    return this
  }

  setImage (value) {
    this.image = value
    return this
  }

  setCategory (value) {
    this.category = value
    return this
  }

  setSource (value) {
    this.source = value
    return this
  }

  async save () {
    const article = new ArticleModel(this)
    await article.save()
  }
}

module.exports = Article
