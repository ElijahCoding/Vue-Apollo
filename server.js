const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config({
    path: 'variables.env'
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
        .then(() => console.log('DB connected'))
        .catch(e => console.log(e));

const todos = [
  { task: "Wash car", completed: false },
  { task: "Clean room", completed: true }
];

const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }

  type Query {
    todos: [Todo]
  }
`;


const server = new ApolloServer({
    typeDefs
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
