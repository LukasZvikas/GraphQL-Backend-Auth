const assert = require('assert');
const AuthMutations = require('../resolvers/auth/mutations');

describe('Signup', () => {
    const userDetails = { email: 'test@gmail.com', password: 'password' };
  
    it('signs user up', (done) => {
      AuthMutations.signUp(null, userDetails).then((result) => {
        assert(!result.isNew);
        done();
      });
    });
});

// describe('Get User', () => {
//   let user;
//   const userDetails = { email: 'test@gmail.com', password: 'password' };
//   beforeEach((done) => {
//     user = new Auth(userDetails);
//     user.save().then(() => {
//       done();
//     });
//   });
//   it('finds a user', (done) => {
//     AuthQueries.loginUser(null, { email: 'test@gmail.com', password: 'password' }).then((res) => {
//       console.log('RES', res);
//     });
//   });
// });