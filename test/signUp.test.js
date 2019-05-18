const assert = require('assert');
const Auth = require('../models/auth');
const AuthMutations = require('../resolvers/auth/mutations');
const { EXISTING_USER_ERROR } = require('../utilities/errorTypes');

describe('Signup', () => {
  const userDetails = { email: 'test@gmail.com', password: 'password' };

  it('signs user up', (done) => {
    AuthMutations.signUp(null, userDetails).then((result) => {
      assert(!result.isNew);
      done();
    });
  });

  it('throws an error if user exists when signing up', (done) => {
    const newUser = new Auth({
      _id: '5cdc820cf5d3539f25c8c4fd', email: userDetails.email, password: userDetails.password,
    });

    newUser.save().then(() => {
      AuthMutations.signUp(null, userDetails).then(() => {
        done();
      }).catch((err) => {
        assert(err.message === EXISTING_USER_ERROR);
        done();
      });
    });
  });
});
