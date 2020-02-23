const request = require('request')
const Iconv = require('iconv').Iconv
const FeedParser = require('feedparser')
const zlib = require('zlib')

function fetch (feed) {
  // Define our streams
  const req = request(feed, { timeout: 10000, pool: false })
  req.setMaxListeners(50)
  // Some feeds do not respond without user-agent and accept headers.
  req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
  req.setHeader('accept', 'text/html,application/xhtml+xml')

  var feedparser = new FeedParser()

  // Define our handlers
  req.on('error', done)
  req.on('response', function (res) {
    if (res.statusCode !== 200) return this.emit('error', new Error('Bad status code'))
    const charset = getParams(res.headers['content-type'] || '').charset
    const encoding = res.headers['content-encoding'] || 'identity'
    res = maybeDecompress(res, encoding)
    res = maybeTranslate(res, charset)
    // And boom goes the dynamite
    res.pipe(feedparser)
  })

  feedparser.on('error', done)
  feedparser.on('end', done)
  feedparser.on('readable', function () {
    var post
    while (post = this.read()) {
      console.log(JSON.stringify(post, ' ', 4))
    }
  })
}

function maybeDecompress (res, encoding) {
  var decompress
  if (encoding.match(/\bdeflate\b/)) {
    decompress = zlib.createInflate()
  } else if (encoding.match(/\bgzip\b/)) {
    decompress = zlib.createGunzip()
  }
  return decompress ? res.pipe(decompress) : res
}

function maybeTranslate (res, charset) {
  let iconv
  // Use iconv if its not utf8 already.
  if (!iconv && charset && !/utf-*8/i.test(charset)) {
    try {
      iconv = new Iconv(charset, 'utf-8')
      console.log('Converting from charset %s to utf-8', charset)
      iconv.on('error', done)
      // If we're using iconv, stream will be the output of iconv
      // otherwise it will remain the output of request
      res = res.pipe(iconv)
    } catch (err) {
      res.emit('error', err)
    }
  }
  return res
}

function getParams (str) {
  const params = str.split(';').reduce(function (params, param) {
    const parts = param.split('=').map(function (part) { return part.trim() })
    if (parts.length === 2) {
      params[parts[0]] = parts[1]
    }
    return params
  }, {})
  return params
}

function done (err) {
  if (err) {
    console.log(err, err.stack)
    return process.exit(1)
  }
}

fetch('https://www.klix.ba/rss/svevijesti')
