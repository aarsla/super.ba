const chalk = require('chalk')
const baseParser = require('./baseParser')
const Article = require('./model/article')
const db = require('./model/db')
const ArticleModel = db.model('Article')

const feed = 'http://balkans.aljazeera.net/mobile/articles'
const source = {
  title: 'Al Jazeera Balkans',
  url: 'http://balkans.aljazeera.net/',
  logo: 'http://balkans.aljazeera.net/sites/default/themes/custom/ajbalkans/logo.png'
}

const imageRegex = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/
const pRegex = /(?!>)([^><]+)(?=<\/p>)/

class AlJazeera {
  constructor () {
    this.items = []
  }

  async process () {
    try {
      this.items = await baseParser(feed)

      for (const item of this.items) {
        if (await this.articleExists(item)) { return }

        const regexResults = imageRegex.exec(item.summary)
        const image = regexResults ? regexResults[1] : null

        const pResults = pRegex.exec(item.summary)
        const pContent = pResults ? pResults[0] : null

        await new Article(item.title)
          .setDescription(pContent || null)
          .setPubDate(item.pubDate)
          .setLink(item.link)
          .setImage(image || '')
          .setCategory({ title: 'BiH' })
          .setSource(source)
          .save()
      }
    } catch (error) {
      console.log(chalk.bold.red(`${this.constructor.name}: ${error.message}`))
    } finally {
      console.log(chalk.gray(`${this.constructor.name} done`))
    }
  }

  async articleExists (item) {
    return ArticleModel.findOne(
      {
        title: item.title,
        'source.title': source.title
      }
    )
  }
}

module.exports = new AlJazeera()
