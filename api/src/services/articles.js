const boom = require('@hapi/boom')
const Article = require('../models/Article')
const aqp = require('api-query-params')
const paginatorOptions = require('../helpers/paginator')
const moment = require('moment')

function prepareFilter (filter) {
  if (filter.pubDate) {
    const fromDate = filter.pubDate
    const toDate = moment(fromDate).add(1, 'day').format(('YYYY-MM-DD'))
    filter.pubDate = { $gte: fromDate, $lt: toDate }
  }
}

exports.getArticles = async (req, reply) => {
  const { filter, skip, limit, sort, projection } = aqp(req.query)

  prepareFilter(filter)

  try {
    const query = Article
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort || '-pubDate')
      .select(projection)

    const results = await Article.paginate(query, paginatorOptions(req))
    reply.send(results)
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getArticle = async (req, reply) => {
  try {
    const id = req.params.id
    const query = Article.findById(id)
    const results = await Article.paginate(query, paginatorOptions(req))
    reply.send(results)
  } catch (err) {
    throw boom.boomify(err)
  }
}
