"use strict";

const { makeExecutableSchema } = require("graphql-tools");
const resolver = require("./resolvers");

// Define our schema using the GraphQL schema language
const typeDefs = `
    type User {
      password: String
      email: String!
    }
    type Query {
      allUsers: [User]
      fetchUser(id: Int!): User
    }
    type Mutation {
      login (email: String!, password: String!): String
      createUser (username: String!, email: String!, password: String!): User
    }
  `;

module.exports = makeExecutableSchema({ typeDefs, resolver });
