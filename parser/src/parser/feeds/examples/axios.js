const FeedParser = require('feedparser')
const axios = require('axios')
const stringToStream = require('string-to-stream')

module.exports = async function feedParse (url) {
  const feedparser = new FeedParser()

  return axios({ method: 'get', url: url, timeout: 3000 })
    .then(res => {
      // res.data.pipe(feedparser);
      stringToStream(res.data).pipe(feedparser)
    })
    .then(() => {
      var promise = new Promise((resolve, reject) => {
        const items = []
        feedparser.on('readable', function () {
          const stream = this
          let item
          while ((item = stream.read())) {
            items.push(item)
          }
        })

        feedparser.on('end', () => {
          resolve(items)
        })

        feedparser.on('error', err => {
          reject(err)
        })
      })

      return Promise.all([promise])
        .then(feed => {
          return feed[0]
        })
        .catch(err => {
          throw err
        })
    })
    .catch(e => {
      throw new Error()
    })
}
