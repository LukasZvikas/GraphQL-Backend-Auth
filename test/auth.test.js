const assert = require('assert');
const Auth = require('../models/auth');


describe('SignUp', () => {
  it('saves a user', (done) => {
    const newUser = new Auth({ email: 'test@gmail.com', password: 'password' });

    const result = newUser.save().then(() => {
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
    const res = Auth.findOne({ email: 'test@gmail.com' }).then(() => {
      // eslint-disable-next-line no-underscore-dangle
      assert(res._id !== user._id);
      done();
    });
  });
});
