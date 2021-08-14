const chalk = require('chalk')
const baseParser = require('../baseParser')
const Article = require('../model/article')

const feed = 'https://www.techradar.com/rss'
const source = {
  title: 'TechRadar',
  url: 'https://www.techradar.com/',
  logo: 'https://s3.amazonaws.com/lytesparkblog/wp-content/uploads/2016/11/18105057/techradar-logo-eps-vector-image.png'
}

class TechRadar {
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
      // console.log(chalk.gray(`${this.constructor.name} done`))
    }
  }
}

module.exports = new TechRadar()
