const chalk = require('chalk')
const baseParser = require('../baseParser')
const Article = require('../model/article')

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
        const regexResults = imageRegex.exec(item.summary)
        const image = regexResults ? regexResults[1] : null

        const pResults = pRegex.exec(item.summary)
        const pContent = pResults ? pResults[0] : null

        const article = await new Article(item.title)
          .setDescription(pContent || null)
          .setPubDate(item.pubDate)
          .setLink(item.link)
          .setImage(image || '')
          .setCategory({ title: 'BiH' })
          .setSource(source)

        await article.save()
      }
    } catch (error) {
      console.log(chalk.bold.red(`${this.constructor.name}: ${error.message}`))
    } finally {
      // console.log(chalk.gray(`${this.constructor.name} done`))
    }
  }
}

module.exports = new AlJazeera()
