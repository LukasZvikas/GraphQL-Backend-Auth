const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');

exports.isAuth = async (token) => {
  try {
    const decodedToken = await jwt.verify(token, JWT_SECRET);
    if (!decodedToken) {
      return false;
    }
    return decodedToken.userId;
  } catch (err) {
    return false;
  }
};
