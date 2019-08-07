const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");

require('dotenv').config({
    path: 'variables.env'
});

const User = require('./models/User');
const Post = require('./models/Post');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
        .then(() => console.log('DB connected'))
        .catch(e => console.log(e));

const getUser = (token) => {
    if (token) {
        try {

        } catch (e) {

        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const token = req.headers["authorization"];
         return { User, Post, currentUser: await getUser(token) };
    }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
