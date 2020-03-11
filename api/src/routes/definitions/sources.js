const sourcesService = require('../../services/sources')
const documentation = require('../documentation/sources')

const routes = [
  {
    method: 'GET',
    url: '/api/sources/:source',
    handler: sourcesService.getSources,
    schema: documentation.getSourcesSchema

  }
]

module.exports = routes
