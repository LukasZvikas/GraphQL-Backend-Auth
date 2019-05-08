const express = require('express');
const mongoose = require('mongoose');
const { makeExecutableSchema } = require('graphql-tools');
const { ApolloServer } = require('apollo-server-express');
const { MONGO_KEY_DEV } = require('./config/keys');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

mongoose.connect(MONGO_KEY_DEV, { useNewUrlParser: true });
console.log('TYPE', typeDefs);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({ schema });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
