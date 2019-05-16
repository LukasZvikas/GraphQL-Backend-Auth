const jwt = require('jsonwebtoken');

exports.verifyJwt = async (token, secret) => {
  try {
    const details = await jwt.verify(token, secret);
    return details;
  } catch (err) {
    throw err;
  }
};
