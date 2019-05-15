const jwt = require('jsonwebtoken');

module.exports = {
  verifyJwt: async (token, secret) => {
    try {
      const details = await jwt.verify(token, secret);
      return details;
    } catch (err) {
      throw err;
    }
  },

};
