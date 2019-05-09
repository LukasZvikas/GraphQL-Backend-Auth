const Auth = require('../../models/auth');

module.exports = {
  getUser: async (_, { email }) => {
    try {
      const user = await Auth.findOne({ email });
      if (!user) {
        throw new Error('User was not found');
      } else {
        return user;
      }
    } catch (err) {
      throw new Error('An error occured while fetching user details');
    }
  },
};
