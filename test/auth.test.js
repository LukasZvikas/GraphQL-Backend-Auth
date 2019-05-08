const assert = require('assert');
const Auth = require('../models/auth');


describe('Create user', () => {
  it('saves a user', async () => {
    const newUser = new Auth({ email: 'test@gmail.com', password: 'password' });

    const result = await newUser.save();

    assert(!result.isNew);
  });
});
