module.exports = {
  DEFAULTS: {
    pagination: {
      responseLabels: {
        docs: 'results',
        totalDocs: 'totalResults',
        meta: 'meta'
      },
      defaultSort: { pubDate: -1 },
      defaultPage: 1,
      searchLimit: 20,
      meta: {
        type: 'object',
        properties: {
          totalResults: { type: 'integer' },
          limit: { type: 'integer' },
          hasPrevPage: { type: 'boolean' },
          hasNextPage: { type: 'boolean' },
          page: { type: 'integer' },
          totalPages: { type: 'integer' },
          pagingCounter: { type: 'integer' },
          prevPage: {
            anyOf: [
              { type: 'number' },
              { type: 'null' }
            ]
          },
          nextPage: {
            anyOf: [
              { type: 'number' },
              { type: 'null' }
            ]
          }
        }
      }
    }
  }
}
