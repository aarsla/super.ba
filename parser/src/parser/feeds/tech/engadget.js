const chalk = require('chalk')
const baseParser = require('../baseParser')
const Article = require('../model/article')
const querystring = require('querystring')

const feed = 'https://www.engadget.com/rss.xml'
const source = {
  title: 'Engadget',
  url: 'https://www.engadget.com/',
  logo: 'https://s.blogcdn.com/www.engadget.com/media/2013/11/engadget-icon-big.png'
}

const imageRegex = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/

class Engadget {
  constructor () {
    this.items = []
  }

  async process () {
    try {
      this.items = await baseParser(feed)

      for (const item of this.items) {
        const regexResults = imageRegex.exec(item.summary)
        const imageLink = regexResults ? regexResults[1] : null

        const image = this.parseImage(imageLink)

        const article = await new Article(item.title)
          .setDescription(item.description)
          .setPubDate(item.pubDate)
          .setLink(item.link)
          .setImage(image)
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

  parseImage (imageLink) {
    try {
      const query = querystring.decode(imageLink)
      return query['amp;image_uri']
    } catch (err) {
      return ''
    }
  }
}

module.exports = new Engadget()
