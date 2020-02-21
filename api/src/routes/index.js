const articleRoutes = require('./articles')
const sourceRoutes = require('./sources')

const routes = sourceRoutes.concat(articleRoutes)

module.exports = routes
