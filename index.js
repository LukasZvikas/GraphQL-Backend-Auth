const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { MONGO_KEY_DEV } = require('./config/keys');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

mongoose.connect(MONGO_KEY_DEV, { useNewUrlParser: true });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    token: req.headers.authorization || null,
  }),
});

const app = express();

require('./routes/authRoutes')(app);

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
