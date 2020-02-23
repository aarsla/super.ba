const db = require('./db')
const Article = db.model('Article')

async function runParser () {
  try {
    const article = await Article.findOne({ _id: '5e3b3a930afe75049310f66b' })
    console.log(article.title)
  } catch (error) {

  } finally {
    db.close()
  }
}

runParser()
