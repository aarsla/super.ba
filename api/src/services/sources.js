const bihSources = require('./fixtures/bih')
const techSources = require('./fixtures/tech')
const boom = require('@hapi/boom')

exports.getSources = async (req, reply) => {
  try {
    const source = req && req.params ? req.params.source : null

    if (!source) {
      return bihSources
    }

    switch (source) {
      case 'Tech':
        return techSources

      default:
        return bihSources
    }
  } catch (err) {
    throw boom.boomify(err)
  }
}
