const constants = require('../../helpers/constants')

const articleSchema = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    _msgid: { type: 'string' },
    title: { type: 'string' },
    link: { type: 'string' },
    image: { type: 'string' },
    description: { type: 'string' },
    pubDate: { type: 'string' },
    category: {
      type: 'object',
      properties: {
        title: { type: 'string' }
      }
    },
    source: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        url: { type: 'string' },
        logo: { type: 'string' }
      }
    }
  }
}

const pagedResponseSchema = {
  description: 'Successful response',
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: articleSchema
    },
    meta: constants.DEFAULTS.pagination.meta
  }
}

exports.getArticlesSchema = {
  description: 'Fetch articles',
  tags: ['articles'],
  summary: 'Retrieves news articles',
  response: {
    200: pagedResponseSchema
  }
}

exports.getArticleSchema = {
  description: 'Fetch article',
  tags: ['articles'],
  summary: 'Retrieves news article',
  response: {
    200: pagedResponseSchema
  }
}
