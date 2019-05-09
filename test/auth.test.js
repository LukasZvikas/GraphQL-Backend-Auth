const assert = require('assert');
const Auth = require('../models/auth');
const AuthMutations = require('../resolvers/auth/mutations');
const AuthQueries = require('../resolvers/auth/queries');
const { INVALID_CREDENTIALS_ERROR } = require('../errorTypes');


describe('SignUp', () => {
  const userDetails = { email: 'test@gmail.com', password: 'password' };


  it('signs user up', (done) => {
    AuthMutations.signUp(null, userDetails).then((result) => {
      assert(!result.isNew);
      done();
    });
  });

  it('signs user in with correct credentials', (done) => {
    AuthMutations.signUp(null, userDetails).then(() => {
      AuthQueries.loginUser(null, { email: 'test@gmail.com', password: 'password' }).then((authObj) => {
        assert(authObj.token !== null);
        done();
      });
    });
  });

  it('does not let user sign in with incorrect password', (done) => {
    AuthMutations.signUp(null, userDetails).then(() => {
      AuthQueries.loginUser(null, { email: 'test@gmail.com', password: 'password1' }).then(() => {
        done();
      }).catch((err) => { assert(err.message === INVALID_CREDENTIALS_ERROR); done(); });
    });
  });
});


describe('Get User', () => {
  let user;
  const userDetails = { email: 'test@gmail.com', password: 'password' };
  beforeEach((done) => {
    user = new Auth(userDetails);
    user.save().then(() => {
      done();
    });
  });
  it('finds a user', (done) => {
    AuthQueries.getUser(null, { email: userDetails.email }).then((result) => {
      // eslint-disable-next-line no-underscore-dangle
      assert(result._id !== user._id);
      done();
    });
  });
});
