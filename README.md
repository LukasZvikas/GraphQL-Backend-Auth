# Authentication backend starter with GraphQL (Apollo)

## Project description

A backend authentication starter that currently includes features such as Sign up, Verify user, Login, Get user and Reset password. Technologies used are apollo-server-express, MongoDB, mongoose, graphql, nodemailer, jsonwebtoken. For testing, Mocha framework is used.

## Project setup
```
npm install
```

### Compile for development
```
node index.js
```

### Development database setup

Requires two different database environments. In config/dev.js, set MONGO_KEY_DEV to development database URL. (MLab suggested)

### Testing database setup

In order for tests to work, a testing database URL has to be provided for MONGO_KEY_TEST in config/dev.js file.

### Run tests
```
npm run test
```

### Emails

For account verification and reset password features to work, additional setup needs to be done as well. In config/dev.js, EMAIL_USERNAME and EMAIL_PASSWORD have to be set with real credentials of your email provider.

### JWT

For key encryption/decryption and password hashing to work, JWT_SECRET and EMAIL_JWT_SECRET have to be set to different random strings.

### Basic setup should look like this: 

```
// config/dev.js

module.exports = {
  MONGO_KEY_DEV: 'mongodb://<user>:<password>@ds151066.mlab.com:51066/graphql-dev',
  MONGO_KEY_TEST: 'mongodb://<user>:<password>@ds153566.mlab.com:53566/graphql-test',
  JWT_SECRET: 'asdfsdafasdfsda123123123123asdasdasdasdfsaf',
  EMAIL_JWT_SECRET: '212312312asdasdasdasdasd123123cxvcxvjlxckjv',
  EMAIL_USERNAME: 'test@gmail.com',
  EMAIL_PASSWORD: 'test123',
};
```
