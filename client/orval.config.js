
module.exports = {
    api: {
      input: 'http://localhost:5000/docs.json',
      output: {
        target: './api/generated-api.ts',
        client: 'react-query',
        schemas: './api/model',
      },
      client: 'react-query',
    },
  };