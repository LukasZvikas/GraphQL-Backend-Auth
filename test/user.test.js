const assert = require('assert');
const Auth = require('../models/auth');
const AuthQueries = require('../resolvers/auth/queries');

describe('Get User', () => {
  const userDetails = { email: 'test@gmail.com', password: '$2b$12$t.iokVMNUbHTODiMUEqfoOhRYmM6lSk2w.pcHiSflHZqlKIkXUTHW' };

  let authToken;

  const incorrectToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZGM4MjBjZjVkMzUzOWYyNWM4YzRmZCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE1NTgxMjM0Nzd9.CmXk438Aw9_fvV8KIUoxyfdP597xneRfZMSy47J83';


  beforeEach((done) => {
    const newUser = new Auth({
      _id: '5cdc820cf5d3539f25c8c4fd', email: userDetails.email, password: userDetails.password,
    });

    newUser.save().then(() => {
      AuthQueries.loginUser(null, { email: userDetails.email, password: 'password' }).then(({ token }) => {
        authToken = token;
        done();
      });
    });
  });

  it('if auth token is correct, token decryption works correctly for getting details of the user', (done) => {
    AuthQueries.getUser(null, null, ({ token: authToken })).then(({ email }) => {
      assert(userDetails.email === email);
      done();
    });
  });

  it('if auth token is incorrect, invalid signature error gets thrown out', (done) => {
    AuthQueries.getUser(null, null, ({ token: incorrectToken })).then(() => {
      done();
    }).catch((err) => {
      assert(err.message === 'invalid signature');
      done();
    });
  });
});
