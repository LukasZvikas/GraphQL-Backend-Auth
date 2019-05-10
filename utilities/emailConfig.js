const nodemailer = require('nodemailer');
const { GMAIL_EMAIL, GMAIL_PASSWORD } = require('../config/keys');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASSWORD,
  },
});

module.exports = transporter;
