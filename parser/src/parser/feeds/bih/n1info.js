const chalk = require('chalk')
const baseParser = require('../baseParser')
const Article = require('../model/article')

const feed = 'https://ba.n1info.com/feed/'
const source = {
  title: 'N1 Info',
  url: 'https://ba.n1info.com/',
  logo: 'https://ba.n1info.com/wp-content/themes/ucnewsportal-n1/dist/assets/images/logo-header.svg'
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
          .setDescription(item.summary)
          .setPubDate(item.pubDate)
          .setLink(item.link)
          .setImage(item['content:encoded']['img']['#'])
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

module.exports = new N1info()
