import { gql } from 'apollo-server-express';

// TypeDefs
const typeDefs = gql`
  type User {
    _id: String!
    name: String!
  }

  type Query {
    allUsers: [User!]!
  }

  type Mutation {
    createUser(name: String!): User!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    allUsers: async (parent, args, { User }) => {
      const users = User.find();
      return users;
    },
  },
  Mutation: {
    createUser: async (parent, args, { User }) => {
      const user = await new User(args).save();
      return user;
    },
  },
};

export { typeDefs, resolvers };
