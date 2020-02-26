const chalk = require('chalk')
const baseParser = require('./baseParser')
const Article = require('./model/article')

const feed = 'https://ba.n1info.com/rss/249/Naslovna'
const source = {
  title: 'N1 Info',
  url: 'https://ba.n1info.com/',
  logo: 'https://ba.n1info.com/Static/Picture/n1v2logo.png'
}

class N1info {
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
          .setImage(item['rss:image']['#'])
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

module.exports = new N1info()
