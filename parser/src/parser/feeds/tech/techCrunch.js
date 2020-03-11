const chalk = require('chalk')
const baseParser = require('../baseParser')
const Article = require('../model/article')

const feed = 'https://techcrunch.com/feed/'
const source = {
  title: 'TechCrunch',
  url: 'https://techcrunch.com/',
  logo: 'https://s0.wp.com/wp-content/themes/vip/techcrunch-2013/assets/images/logo.svg'
}

const imageRegex = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/

class TechCrunch {
  constructor () {
    this.items = []
  }

  async process () {
    try {
      this.items = await baseParser(feed)

      for (const item of this.items) {
        const regexResults = imageRegex.exec(item.description)
        const image = regexResults ? regexResults[1] : null

        const article = await new Article(item.title)
          .setDescription(item.description)
          .setPubDate(item.pubDate)
          .setLink(item.link)
          .setImage(image || '')
          .setCategory({ title: 'Tech' })
          .setSource(source)

        await article.save()
      }
    } catch (error) {
      console.log(chalk.bold.red(`${this.constructor.name}: ${error.message}`))
    } finally {
      console.log(chalk.gray(`${this.constructor.name} done`))
    }
  }
}

module.exports = new TechCrunch()
