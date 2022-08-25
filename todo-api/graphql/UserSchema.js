var { buildSchema } = require('graphql');
var User = require('../models/user');

const schema = buildSchema(`
  input UserInput {
    email: String!
    password: String
    name: String!
    address: String
  }
  type User {
    _id: ID!
    email: String!
    password: String!
    name: String!
    address: String
  }
  type Query {
    getUsers: [User]
  }
  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): User
  }
`);


const root = {
    getUsers: () => {
        try {
            const users = User.find({})
            return users;
        } catch (err) {
            throw err
        }
    },
    createUser: ({ input }) => {
        try {
            const user = User.create(input)
            return user
        } catch (err) {
            throw err
        }
    },
    updateUser: ({ id, input }) => {
        try {
            const user = User.findByIdAndUpdate(id, input, { new: true })
            return user
        } catch (err) {
            throw err
        }
    },
    deleteUser: ({ id }) => {
        try {
            const user = User.findByIdAndRemove(id)
            return user
        } catch (err) {
            throw err
        }
    }
};

/*
{
  getUsers{
    _id
    name
    address
  }
}
mutation {
  createUser(input: {
    email: "hilmi@gmail.com", 
    password: "12", 
    name: "hilmi", 
    address: "Kopo"}) {
    _id
    email
    name
    address
  }
}

mutation {
  updateUser(id: "6305a82f348a5237a12e03ef", input: {
    email: "hilmi@gmail.com", 
    name: "hilmi s", 
    address: "Kota Kopo"}) {
    _id
    email
    name
    address
  }
}


mutation deleteUser($id: ID!){
  deleteUser(id: $id) {
    _id
    email
    name
    address
  }
}

-- query variables delete
{"id": "6305a82f348a5237a12e03ef"}
*/

module.exports = { schema, root }