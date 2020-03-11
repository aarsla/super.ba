const chalk = require('chalk')
const baseParser = require('../baseParser')
const Article = require('../model/article')

const feed = 'http://feeds2.feedburner.com/thenextweb'
const source = {
  title: 'The Next Web',
  url: 'https://thenextweb.com/',
  logo: 'https://cdn2.tnwcdn.com/wp-content/themes/cyberdelia/assets/img/tnw-red.svg'
}

class TheNextWeb {
  constructor () {
    this.items = []
  }

  async process () {
    try {
      this.items = await baseParser(feed)

      for (const item of this.items) {
        const article = await new Article(item.title)
          .setDescription(item.description)
          .setPubDate(item.pubDate)
          .setLink(item.link)
          .setImage(item.enclosures[0].url || '')
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

module.exports = new TheNextWeb()
