const userService = require('../../services/user')
const documentation = require('../documentation/user')

const routes = [
  {
    method: 'GET',
    url: '/api/me',
    handler: userService.getMe,
    schema: documentation.getMeSchema
  }]

module.exports = routes
