const assert = require('assert');
const Auth = require('../models/auth');
const AuthMutations = require('../resolvers/auth/mutations');
const AuthQueries = require('../resolvers/auth/queries');
const { INVALID_EMAIL_ERROR } = require('../utilities/errorTypes');

describe('Reset pass', () => {
  const userDetails = { email: 'test@gmail.com', password: 'password' };

  let passToken;

  const incorrectToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZGM4MjBjZjVkMzUzOWYyNWM4YzRmZCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE1NTgxMjM0Nzd9.CmXk438Aw9_fvV8KIUoxyfdP597xneRfZMSy47J83';

  const incorrectEmail = 'test1@gmail.com';

  beforeEach(async () => {
    const newUser = new Auth({
      _id: '5cdc820cf5d3539f25c8c4fd', email: userDetails.email, password: userDetails.password,
    });

    await newUser.save();
  });

  it('if a user exists, sends an password reset link with token', (done) => {
    AuthQueries.sendResetPassLink(null, { email: userDetails.email }).then(({ token }) => {
      assert(token);
      passToken = token;
      done();
    });
  });

  it('if a user does not exist, throws an error', (done) => {
    AuthQueries.sendResetPassLink(null, { email: incorrectEmail }).then(() => {
      done();
    }).catch((err) => {
      assert(err.message === INVALID_EMAIL_ERROR);
      done();
    });
  });

  it('resets password if correct token is provided in a link', (done) => {
    AuthMutations.resetPass(null, { token: passToken, newPassword: 'password1' }).then((passResetObj) => {
      assert(passResetObj.password !== userDetails.password && passResetObj.password.length === 60);
      done();
    });
  });

  it('throws an error if incorrect token is provided in a link', (done) => {
    AuthMutations.resetPass(null, { token: incorrectToken, newPassword: 'password1' }).then(() => {
      done();
    }).catch((err) => {
      assert(err.message === 'invalid signature');
      done();
    });
  });
});
