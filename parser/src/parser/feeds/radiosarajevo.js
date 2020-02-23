const chalk = require('chalk')
const baseParser = require('./baseParser')
const Article = require('./model/article')
const db = require('./model/db')
const ArticleModel = db.model('Article')

const feed = 'https://www.radiosarajevo.ba/rss'
const source = {
  title: 'Radio Sarajevo',
  url: 'http://radiosarajevo.ba',
  logo: 'http://www.radiosarajevo.ba//build/img/logo-s.png'
}

const imageRegex = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/

class RadioSarajevo {
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

        await new Article(item.title)
          .setDescription(item.description)
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

module.exports = new RadioSarajevo()
