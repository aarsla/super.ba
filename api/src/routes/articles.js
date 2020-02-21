const articleService = require('../services/articles')
const documentation = require('./documentation/articleApi')

const routes = [
  {
    method: 'GET',
    url: '/api/articles',
    handler: articleService.getArticles,
    schema: documentation.getArticlesSchema
  },
  {
    method: 'GET',
    url: '/api/articles/:id',
    handler: articleService.getArticle
  }]

module.exports = routes
