const db = require('./db')
const Parser = require('./parser')
const Producer = require('../producer')

async function runParser () {
  const parser = new Parser()

  try {
    await parser.run()
  } catch (error) {
    console.log(error.message)
  } finally {
    db.mongoose.connection.close()

    const producer = await new Producer().instance
    await producer.disconnect()
  }
}

runParser()
