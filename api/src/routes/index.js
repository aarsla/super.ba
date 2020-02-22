const userRoutes = require('./user')
const articleRoutes = require('./articles')
const sourceRoutes = require('./sources')

const routes = userRoutes.concat(sourceRoutes).concat(articleRoutes)

module.exports = routes
