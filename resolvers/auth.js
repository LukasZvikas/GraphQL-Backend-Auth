const Auth = require('../models/auth');

module.exports = {
  signUp: async (_, { email, password }) => {
    const result = await Auth.findOne({ email }, async (err, user) => {
      if (err) throw new Error('An error occured fetching a user');
      else if (user) {
        throw new Error('A user already exists');
      } else {
        const newUser = new Auth({
          email, password,
        });
        const savedUser = await newUser.save({
          email, password,
        }, (saveErr, res) => {
          if (saveErr) throw new Error('An error occured saving a user');
          if (res) return res;
          return null;
        });

        return savedUser;
      }
    });
    console.log('result', result);
    return result;
  },
};
