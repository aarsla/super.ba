const constants = require('./constants')

module.exports = (request, options) => {
  const page = request.query.page ? request.query.page : constants.DEFAULTS.pagination.defaultPage
  const sort = request.query.sort ? request.query.sort : constants.DEFAULTS.pagination.defaultSort
  const limit = request.query.limit ? request.query.limit : constants.DEFAULTS.pagination.searchLimit

  const paginator = {
    customLabels: constants.DEFAULTS.pagination.responseLabels,
    page: page,
    sort: sort,
    limit: limit
  }

  if (options) {
    return { ...paginator, ...options }
  }

  return paginator
}
