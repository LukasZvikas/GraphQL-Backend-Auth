module.exports = url => ({
  subject: 'Password Reset',
  body: `In order to reset your password, please click on this link: ${url}`,
});
