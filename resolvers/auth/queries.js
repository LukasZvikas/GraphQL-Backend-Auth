const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { verifyJwt } = require('../../utilities/jwt');
const { JWT_SECRET, EMAIL_JWT_SECRET } = require('../../config/keys');
const { sendEmail } = require('../../utilities/sendEmail');
const {
  INVALID_CREDENTIALS_ERROR,
  FETCH_USER_ERROR,
  NO_TOKEN_ERROR,
  EXPIRED_TOKEN,
  INVALID_EMAIL_ERROR,
} = require('../../utilities/errorTypes');
const Auth = require('../../models/auth');
const resetPassTemplate = require('../../utilities/emailTemplates/resetPass');


module.exports = {
  getUser: async (_, __, { token }) => {
    if (!token) throw new Error(NO_TOKEN_ERROR);

    const userDetails = await verifyJwt(token, JWT_SECRET);

    if (!userDetails) throw new Error(EXPIRED_TOKEN);

    try {
      const user = await Auth.findById(userDetails.id);
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
          { id: user._id, email: user.email }, JWT_SECRET,
        );
        return { userId: user._id, token, email: user.email };
      }

      throw new Error(INVALID_CREDENTIALS_ERROR);
    } catch (err) {
      throw err;
    }
  },
  sendResetPassLink: async (_, { email }) => {
    try {
      const user = await Auth.findOne({ email });

      if (!user) throw new Error(INVALID_EMAIL_ERROR);

      const resetPassToken = await jwt.sign(
        { id: user._id, email: user.email }, EMAIL_JWT_SECRET,
      );

      const { subject, body } = resetPassTemplate(`http://localhost:4000/reset_pass/${resetPassToken}`);

      sendEmail({ subject, body, receiver: email });

      return { userId: user._id, token: resetPassToken, email };
    } catch (err) {
      throw err;
    }
  },
};
