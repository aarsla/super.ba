const FeedParser = require('feedparser')
const fs = require('fs')
const path = require('path')
const feed = path.join(__dirname, './xml/klix.xml')

fs.createReadStream(feed)
  .on('error', function (error) {
    console.error(error)
  })
  .pipe(new FeedParser())
  .on('error', function (error) {
    console.error(error)
  })
  .on('meta', function (meta) {
    console.log('===== %s =====', meta.title)
  })
  .on('readable', function () {
    var stream = this; var item
    while (item = stream.read()) {
      console.log('Got article: %s', item.title || item.description)
    }
  })
