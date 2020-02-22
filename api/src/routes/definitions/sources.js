const sourcesService = require('../../services/sources')
const documentation = require('../documentation/sourceApi')

const routes = [
  {
    method: 'GET',
    url: '/api/sources',
    handler: sourcesService.getSources,
    schema: documentation.getSourcesSchema

  }
]

module.exports = routes
