const Auth = require('../../models/auth');

module.exports = {
  getUser: async (_, { email }) => {
    try {
      const result = await Auth.findOne({ email }, (err, user) => {
        if (err) throw new Error('An error occured while signing up the user');
        else if (!user) {
          throw new Error('User was not found');
        } else {
          return user;
        }
      });

      return result;
    } catch (err) {
      throw new Error('An error occured while fetching user details');
    }
  },
};
