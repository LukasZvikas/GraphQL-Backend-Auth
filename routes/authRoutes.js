const Auth = require('../models/auth');
const { verifyJwt } = require('../utilities/jwt');
const { EMAIL_JWT_SECRET } = require('../config/keys');


module.exports = (app) => {
  app.get('/confirmation/:token', async (req) => {
    const { token } = req.params;
    try {
      const { id } = await verifyJwt(token, EMAIL_JWT_SECRET);
      const user = await Auth.findById(id);
      if (user && user.confirmed) throw new Error('This user has been verified already');
      else if (user) {
        user.confirmed = true;
        const confirmedUser = await user.save();
        return confirmedUser;
      }
    } catch (err) {
      throw err;
    }
  });
};
