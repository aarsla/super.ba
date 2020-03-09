const chalk = require('chalk')
const baseParser = require('./baseParser')
const Article = require('./model/article')

const feed = 'https://ba.voanews.com/api/zipvtejjvt'
const source = {
  title: 'Glas Amerike',
  url: 'https://ba.voanews.com/',
  logo: 'https://ba.voanews.com/Content/responsive/VOA/bs-Latn-BA/img/logo.png'
}

class Voa {
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
          .setImage(item.enclosures ? item.enclosures[0].url : '')
          .setCategory({ title: 'BiH' })
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

module.exports = new Voa()
