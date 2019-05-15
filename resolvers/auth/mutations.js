const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Auth = require('../../models/auth');
const { EMAIL_JWT_SECRET } = require('../../config/keys');
const { EXISTING_USER_ERROR } = require('../../errorTypes');
const { sendEmail } = require('../../utilities/sendEmail');
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
          // eslint-disable-next-line no-underscore-dangle
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
};
