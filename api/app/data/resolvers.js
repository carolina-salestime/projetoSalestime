"use strict";

const UserController = require("../Controllers/Http/UserController");

// Define resolvers
const resolver = {
  Query: {
    // Fetch all users
    async allUsers({ auth }) {
      if (auth) {
        const users = new UserController().index(auth);
        return users.toJSON();
      }
    },
  },

  Mutation: {
    // Handles user login
    async updateUser(_, { email, password }, { auth }) {
      const { token } = await auth.attempt(email, password);
      return token;
    },

    // Create new user
    async createUser(_, { username, email, password }) {
      return await User.create({ username, email, password });
    },

    // Handles user login
    async login(_, { email, password }, { auth }) {
      const { token } = await auth.attempt(email, password);
      return token;
    },

    // Add a new post
  },
};

module.exports = resolver;
