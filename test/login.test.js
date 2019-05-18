const assert = require('assert');
const Auth = require('../models/auth');
const AuthQueries = require('../resolvers/auth/queries');
const { INVALID_CREDENTIALS_ERROR } = require('../utilities/errorTypes');

describe('Login', () => {
  const userDetails = { email: 'test@gmail.com', password: '$2b$12$t.iokVMNUbHTODiMUEqfoOhRYmM6lSk2w.pcHiSflHZqlKIkXUTHW' };

  let user;

  beforeEach(async () => {
    const newUser = new Auth({
      email: userDetails.email, password: userDetails.password,
    });

    user = await newUser.save();
  });

  it('does not let user login with incorrect password', (done) => {
    AuthQueries.loginUser(null, { email: 'test@gmail.com', password: 'password1' }).then(() => {
      done();
    }).catch((err) => {
      assert(err.message === INVALID_CREDENTIALS_ERROR);
      done();
    });
  });

  it('does not let user login with an email that does not exist', (done) => {
    AuthQueries.loginUser(null, { email: 'test1@gmail.com', password: 'password' }).then(() => {
      done();
    }).catch((err) => {
      assert(err.message === INVALID_CREDENTIALS_ERROR);
      done();
    });
  });

  it('signs user in with correct credentials', (done) => {
    AuthQueries.loginUser(null, { email: user.email, password: 'password' }).then(({ token }) => {
      assert(token !== null);
      done();
    });
  });
});
