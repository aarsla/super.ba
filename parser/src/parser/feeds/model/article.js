const ArticleModel = require('./mongooseArticle')
const Producer = require('../../../producer')

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
    const existingArticle = await ArticleModel.findOne(
      {
        title: this.title,
        'source.title': this.source.title
      }
    )

    if (!existingArticle) {
      const article = await new ArticleModel(this)
      await article.save()
      await this.notify()
    }

    return this
  }

  async notify () {
    const producer = await new Producer().instance
    if (producer && producer.channel) {
      await producer.sendMessage(this)
    }
  }
}

module.exports = Article
