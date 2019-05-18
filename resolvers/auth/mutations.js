const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Auth = require('../../models/auth');
const { EMAIL_JWT_SECRET } = require('../../config/keys');
const { EXISTING_USER_ERROR } = require('../../utilities/errorTypes');
const { sendEmail } = require('../../utilities/sendEmail');
const { verifyJwt } = require('../../utilities/jwt');
const confirmEmailTemplate = require('../../utilities/emailTemplates/confirmEmail');

module.exports = {
  signUp: async (_, { email, password }) => {
    try {
      const user = await Auth.findOne({ email });
      if (user) {
        throw new Error(EXISTING_USER_ERROR);
      } else {
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new Auth({
          email, password: hashedPassword,
        });
        const savedUser = await newUser.save();

        const emailToken = jwt.sign(
          { id: newUser._id, email }, EMAIL_JWT_SECRET,
        );

        const { subject, body } = confirmEmailTemplate(`http://localhost:4000/confirmation/${emailToken}`);

        sendEmail({ subject, body, receiver: email });

        return savedUser;
      }
    } catch (err) {
      throw err;
    }
  },
  resetPass: async (_, { token, newPassword }) => {
    try {
      const { id } = await verifyJwt(token, EMAIL_JWT_SECRET);

      if (!id) throw new Error('Reset email link is invalid');

      const user = await Auth.findById(id);

      if (!user) throw new Error('This is user does not exist. Please try a different link');

      const hashedPassword = await bcrypt.hash(newPassword, 12);

      user.password = hashedPassword;

      const updatedUser = await user.save();

      return updatedUser;
    } catch (err) {
      throw err;
    }
  },
};
