exports.getMeSchema = {
  description: 'Whoami',
  tags: ['auth'],
  summary: 'Retrieves token info',
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        sub: { type: 'string' },
        iat: { type: 'number' },
        exp: { type: 'number' }
      }
    }
  }
}
