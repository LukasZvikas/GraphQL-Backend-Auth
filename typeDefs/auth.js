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
    getUser(email: String!): User!
  }

  type Mutation {
    signUp(email: String!, password: String!): User
  }
`;
