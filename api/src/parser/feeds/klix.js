const baseParser = require('./baseParser')
const Article = require('./model/article')
const db = require('./model/db')
const ArticleModel = db.model('Article')

const feed = 'https://www.klix.ba/rss/svevijesti'
const source = {
  title: 'Klix',
  url: 'https://klix.ba/',
  logo: 'https://www.klix.ba/images/logo.png'
}

class Klix {
  constructor () {
    this.items = []
  }

  async process () {
    try {
      this.items = await baseParser(feed)

      for (const item of this.items) {
        if (await this.articleExists(item)) { return }

        await new Article(item.title)
          .setDescription(item.description)
          .setPubDate(item.pubDate)
          .setLink(item.link)
          .setImage(item.enclosures ? item.enclosures[0].url : '')
          .setCategory({ title: 'BiH' })
          .setSource(source)
          .save()
      }
    } catch (error) {
      console.log(`${this.constructor.name}: ${error.message}`)
    } finally {
      db.close()
    }
  }

  async articleExists (item) {
    return ArticleModel.findOne({ title: item.title })
  }
}

module.exports = new Klix()
