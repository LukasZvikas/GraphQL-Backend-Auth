const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../../config/keys');
const { INVALID_CREDENTIALS_ERROR, FETCH_USER_ERROR, NO_TOKEN_ERROR } = require('../../errorTypes');
const Auth = require('../../models/auth');

module.exports = {
  getUser: async (_, { email }, { token }) => {
    if (!token) throw new Error(NO_TOKEN_ERROR);
    try {
      const user = await Auth.findOne({ email });
      if (!user) {
        throw new Error(INVALID_CREDENTIALS_ERROR);
      } else {
        return user;
      }
    } catch (err) {
      throw new Error(FETCH_USER_ERROR);
    }
  },
  loginUser: async (_, { email, password }) => {
    try {
      const user = await Auth.findOne({ email });
      if (user) {
        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) throw new Error(INVALID_CREDENTIALS_ERROR);

        const token = jwt.sign(
          // eslint-disable-next-line no-underscore-dangle
          { id: user._id, email: user.email, password: user.password }, JWT_SECRET,
        );
        console.log('TOKEN', token);
        // eslint-disable-next-line no-underscore-dangle
        return { userId: user._id, token };
      }

      throw new Error(INVALID_CREDENTIALS_ERROR);
    } catch (err) {
      throw err;
    }
  },
};
