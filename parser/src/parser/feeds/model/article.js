const ArticleModel = require('./mongooseArticle')
const producer = require('../../../producer')

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

  fromModel (model) {
    this.title = model.title
    this.description = model.description
    this.pubDate = model.pubDate
    this.link = model.link
    this.image = model.image

    this.category = {
      title: model.category.title
    }

    this.source = {
      title: model.source.title,
      url: model.source.url,
      logo: model.source.logo
    }

    return this
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
    try {
      await producer.sendMessage(this)
    } catch (error) {
      console.log(`Notify: ${error.message}`)
    }
  }
}

module.exports = Article
