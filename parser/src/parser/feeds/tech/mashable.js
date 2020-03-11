const chalk = require('chalk')
const baseParser = require('../baseParser')
const Article = require('../model/article')

const feed = 'http://feeds.mashable.com/Mashable'
const source = {
  title: 'Mashable',
  url: 'https://mashable.com/',
  logo: 'https://a.amz.mshcdn.com/assets/header_logo.v2.us.dark-dd0a18bfb3d211980944b582cfc03c24db96b9069f2a3234fb6cf064c72f58aa.png'
}

class Mashable {
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
          .setImage(item.image ? item.image.url : '')
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

module.exports = new Mashable()
