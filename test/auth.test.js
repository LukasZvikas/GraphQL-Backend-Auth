const assert = require('assert');
const Auth = require('../models/auth');
const AuthMutations = require('../resolvers/auth/mutations');
const AuthQueries = require('../resolvers/auth/queries');


describe('SignUp', () => {
  it('saves a user', (done) => {
    AuthMutations.signUp(null, { email: 'test@gmail.com', password: 'password' }).then((result) => {
      assert(!result.isNew);
      done();
    });
  });
});

describe('Get User', () => {
  let user;
  beforeEach((done) => {
    user = new Auth({ email: 'test@gmail.com', password: 'password' });
    user.save().then(() => {
      done();
    });
  });
  it('finds a user', (done) => {
    AuthQueries.getUser(null, { email: 'test@gmail.com' }).then((result) => {
      // eslint-disable-next-line no-underscore-dangle
      assert(result._id !== user._id);
      done();
    });
  });
});
