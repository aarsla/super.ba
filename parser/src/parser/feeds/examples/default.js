const request = require('request')
const FeedParser = require('feedparser')

const req = request('https://www.klix.ba/rss/svevijesti')
const feedparser = new FeedParser()

req.on('error', function (error) {
  // handle any request errors
})

req.on('response', function (res) {
  const stream = this

  if (res.statusCode !== 200) {
    this.emit('error', new Error('Bad status code'))
  } else {
    stream.pipe(feedparser)
  }
})

feedparser.on('error', function (error) {
  // always handle errors
})

feedparser.on('readable', function () {
  const stream = this
  const meta = this.meta

  while (item = stream.read()) {
    console.log(item)
  }
})
