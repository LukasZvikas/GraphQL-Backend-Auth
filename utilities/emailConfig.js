const nodemailer = require('nodemailer');
const { EMAIL_USERNAME, EMAIL_PASSWORD } = require('../config/keys');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

module.exports = transporter;
