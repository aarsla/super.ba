exports.getSourcesSchema = {
  description: 'Get sources',
  tags: ['sources'],
  summary: 'Retrieves news sources',
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        results: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              url: { type: 'string' },
              logo: { type: 'string' }
            }
          }
        }
      }
    }
  }
}
