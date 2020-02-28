exports.getRootSchema = {
  description: 'API root',
  tags: ['default'],
  summary: 'Retrieves api version',
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        api: { type: 'string' },
        version: { type: 'number' }
      }
    }
  }
}
