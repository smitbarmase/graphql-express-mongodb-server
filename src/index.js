/* eslint-disable no-console */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';

import { typeDefs, resolvers } from './schema';

import User from './models/user';

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ User }),
});

const app = express();

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () => console.log(
  `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`,
));
