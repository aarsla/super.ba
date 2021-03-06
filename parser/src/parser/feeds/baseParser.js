const FeedParser = require('feedparser')
const axios = require('axios')
const stringToStream = require('string-to-stream')

module.exports = async function feedParse (url) {
  const feedparser = new FeedParser()

  return axios({
    method: 'get',
    url: url,
    timeout: 3000,
    headers: {
      accept: 'text/html,application/xhtml+xml',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36'
    }
  })
    .then(res => {
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
    //   throw e
      throw new Error(e.message)
    })
}
