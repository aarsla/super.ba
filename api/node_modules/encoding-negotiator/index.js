'use strict'

function negotiate (header, supported) {
  if (!header) {
    return undefined
  }
  const supportedEncodings = createMap(supported)
  const acceptedEncodings = parse(header || '')
    .sort(comparator)
    .filter(isNonZeroQuality)
  return determinePreffered(acceptedEncodings, supportedEncodings)
}

function determinePreffered (acceptedEncodings, supportedEncodings) {
  for (const encoding of acceptedEncodings) {
    const selected = supportedEncodings[encoding.name]
    if (selected) {
      return selected
    }
  }
  return null
}

function createMap (supported) {
  const supportedEncodings = {}
  if (supported.length > 0) {
    supportedEncodings['*'] = supported[0]
  }
  for (const encoding of supported) {
    supportedEncodings[encoding] = encoding
  }
  return supportedEncodings
}

function parse (header) {
  const split = header.split(',')
  return split.map(parseEncoding)
}

function isNonZeroQuality (encoding) {
  return encoding.quality !== 0
}

function parseEncoding (encoding) {
  const [name, second] = encoding.trim().split(';')
  const quality = getQuality(second)
  return {
    name,
    quality
  }
}

function getQuality (second) {
  if (!second) {
    return 1
  }
  const [, quality] = second.trim().split('=')
  return parseFloat(quality)
}

function comparator (a, b) {
  return b.quality - a.quality
}

module.exports = {
  negotiate
}
