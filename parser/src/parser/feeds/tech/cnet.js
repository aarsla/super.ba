const chalk = require('chalk')
const baseParser = require('../baseParser')
const Article = require('../model/article')

const feed = 'https://www.cnet.com/rss/all/'
const source = {
  title: 'CNet',
  url: 'https://www.cnet.com/',
  logo: 'https://2.bp.blogspot.com/-2PeQj-9BqUU/TqWT9Mcu2MI/AAAAAAAACe8/KBU_6AkuyaQ/s1600/Cnet+logo.png'
}

class Cnet {
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
          .setImage(item['media:thumbnail'] ? item['media:thumbnail']['@'].url : '')
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

module.exports = new Cnet()
