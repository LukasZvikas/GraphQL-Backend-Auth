const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    _id: String!
    email: String!
    password: String!
    confirmed: Boolean
    createdAt: String
    updatedAt: String
  }

  type AuthType {
    userId: String! 
    token: String!
  }

  type Query {
    getUser(email: String!): User!
    loginUser(email: String!, password: String!): AuthType
  }

  type Mutation {
    signUp(email: String!, password: String!): User
  }
`;
