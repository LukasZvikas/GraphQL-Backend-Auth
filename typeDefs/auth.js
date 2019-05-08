module.exports = `
  type User {
    _id: String!
    email: String!
    password: String!
    confirmed: Boolean
    createdAt: String
    updatedAt: String
  }

  type Query {
    user: [User]
  }

  type Mutation {
    signUp(email: String!, password: String!): User
  }
`;
