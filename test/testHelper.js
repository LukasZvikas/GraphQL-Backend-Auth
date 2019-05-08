const mongoose = require('mongoose');
const { MONGO_KEY_TEST } = require('../config/keys');

mongoose.connect(MONGO_KEY_TEST, { useNewUrlParser: true });

mongoose.connection.once('open', () => console.log('Connected to the database'))
  .on('error', () => console.log('Could not connect to the databse'));

beforeEach((done) => {
  mongoose.connection.collections.authentications.drop(() => {
    done();
  });
});
