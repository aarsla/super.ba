const db = require('./feeds/model/db')
const Parser = require('./parser')

async function runParser () {
  const parser = new Parser()
  try {
    await parser.run()
  } catch (error) {

  } finally {
    db.close()
  }
}

runParser()
