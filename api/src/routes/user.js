const userService = require('../services/user')

const routes = [
  {
    method: 'GET',
    url: '/api/me',
    handler: userService.getMe
  }]

module.exports = routes
