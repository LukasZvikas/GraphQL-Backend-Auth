const Auth = require('../models/auth');
const { verifyJwt } = require('../utilities/jwt');
const { EMAIL_JWT_SECRET } = require('../config/keys');
const { RESET_LINK_ERROR } = require('../utilities/errorTypes');


module.exports = (app) => {
  app.get('/confirmation/:token', async (req, res) => {
    const { token } = req.params;
    try {
      const { id } = await verifyJwt(token, EMAIL_JWT_SECRET);
      const user = await Auth.findById(id);
      if (user && user.confirmed) throw new Error('This user has been verified already');
      else if (user) {
        user.confirmed = true;
        await user.save();
        res.send({ user_verification: 'User has been verified successfully' });
      }
    } catch (err) {
      throw err;
    }
  });

  app.get('/reset_pass/:token', async (req, res) => {
    const { token } = req.params;
    try {
      const { id } = await verifyJwt(token, EMAIL_JWT_SECRET);
      const user = await Auth.findById(id);
      if (!user) throw new Error(RESET_LINK_ERROR);
      else if (user) {
        res.send({ reset_pass_link: true });
      }
    } catch (err) {
      throw err;
    }
  });
};
