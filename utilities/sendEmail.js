const { GMAIL_EMAIL } = require('../config/keys');
const transporter = require('./emailConfig');

module.exports = {
  sendEmail: ({
    receiver, subject, from = GMAIL_EMAIL, body,
  }) => {
    const mailOptions = {
      from, // sender address
      to: receiver, // list of receivers
      subject, // Subject line
      html: body, // plain text body
    };

    if (process.env.NODE_ENV !== 'test') {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err);
        else console.log(info);
      });
    }
  },
};
