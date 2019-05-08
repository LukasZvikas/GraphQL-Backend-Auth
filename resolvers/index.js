const Auth = require('./auth');

module.exports = {
  Query: {
    user: (_, args, params) => {
      console.log('args', args, 'params', params);
    },
  },
  Mutation: {
    ...Auth,
  },
};
