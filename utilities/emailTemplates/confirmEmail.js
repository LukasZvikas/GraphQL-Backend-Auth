module.exports = url => ({
  subject: 'Please confirm your email',
  body: `To verify your account, please click on this link: ${url}`,
});
