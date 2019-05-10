const bcrypt = require('bcrypt');
const Auth = require('../../models/auth');
const { EXISTING_USER_ERROR } = require('../../errorTypes');
const { sendEmail } = require('../../utilities/sendEmail');
const confirmEmail = require('../../utilities/emailTemplates/confirmEmail');

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

        const { subject, body } = confirmEmail('gmail.com');

        sendEmail({ subject, body, receiver: email });

        return savedUser;
      }
    } catch (err) {
      throw err;
    }
  },
};
