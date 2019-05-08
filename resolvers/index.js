const AuthMutations = require('./auth/mutations');
const AuthQueries = require('./auth/queries');

module.exports = {
  Query: {
    ...AuthQueries,
  },
  Mutation: {
    ...AuthMutations,
  },
};
