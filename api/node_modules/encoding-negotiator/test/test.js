'use strict'

const test = require('ava')
const enodingNegotiator = require('..')

test('should return identity', (t) => {
  const header = 'identity;q=1'
  const supported = ['gzip', 'identity']

  const result = enodingNegotiator.negotiate(header, supported)

  t.is(result, 'identity')
})

test('should return gzip', (t) => {
  const header = 'gzip;q=1, identity;q=0.5'
  const supported = ['gzip', 'deflate']

  const result = enodingNegotiator.negotiate(header, supported)

  t.is(result, 'gzip')
})

test('should return deflate', (t) => {
  const header = 'deflate;q=0.5,identity; q=0.5'
  const supported = ['gzip', 'deflate']

  const result = enodingNegotiator.negotiate(header, supported)

  t.is(result, 'deflate')
})

test('"*" and ["gzip", "deflate"]', (t) => {
  const header = '*'
  const supported = ['gzip', 'deflate']

  const result = enodingNegotiator.negotiate(header, supported)

  t.is(result, 'gzip')
})

test('"deflate;q=1.0, *" and ["gzip"]', (t) => {
  const header = 'deflate;q=1.0, *'
  const supported = ['gzip']

  const result = enodingNegotiator.negotiate(header, supported)

  t.is(result, 'gzip')
})

test('should ignore invalid encoding if another valid encoding', (t) => {
  const header = 'test,br'
  const supported = ['br']

  const result = enodingNegotiator.negotiate(header, supported)

  t.is(result, 'br')
})

test('"gzip;q=0" and ["gzip"]', (t) => {
  const header = 'gzip;q=0'
  const supported = ['gzip', 'identity']

  const result = enodingNegotiator.negotiate(header, supported)

  t.is(result, null)
})

test('unknown encoding', (t) => {
  const header = 'white rabbit'
  const supported = ['gzip', 'identity']

  const result = enodingNegotiator.negotiate(header, supported)

  t.is(result, null)
})

test('return undefined if no header', (t) => {
  const supported = ['gzip', 'identity']

  const result = enodingNegotiator.negotiate(undefined, supported)

  t.is(result, undefined)
})

test('compress;q=0.5, gzip;q=1.0 and ["gzip", compress"]', (t) => {
  const header = 'compress;q=0.5, gzip;q=1.0'
  const supported = ['gzip', 'compress']

  const result = enodingNegotiator.negotiate(header, supported)

  t.is(result, 'gzip')
})

test('compress;q=0.5, gzip;q=1.0 and ["compress"]', (t) => {
  const header = 'compress;q=0.5, gzip;q=1.0'
  const supported = ['compress']

  const result = enodingNegotiator.negotiate(header, supported)

  t.is(result, 'compress')
})
