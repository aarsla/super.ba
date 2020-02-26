const db = require('./db')
const Parser = require('./parser')
// const Producer = require('../AmqpClient')

async function runParser () {
  const parser = new Parser()
  // const producer = await new Producer().instance

  try {
    await parser.run()
  } catch (error) {
    console.log(error.message)
  } finally {
    // if (producer) {
    //   await producer.disconnect()
    // }

    db.mongoose.connection.close()
  }

  // process.exit(1)
}

runParser()
