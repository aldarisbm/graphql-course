import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data: 
const users = [
    {
        id: 131,
        name: "Jose",
        email: "jose@example.com"
    },
    {
        id: 111,
        name: "Dummy",
        email: "dummy@example.com"
    },
    {
        id: 333,
        name: "notDummy",
        email: "notdummy@example.com",
        age: 33
    }
]

// Type definitions (schema)

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }
    
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`
// Resolvers

const resolvers = {
    Query: {
        me() {
            return {
                id: 123,
                name: "Mike",
                email: "mike@example.com"
            }
        },
        post() {
            return {
                id: 321,
                title: "GraphQL rocks",
                body: "I love working on GraphQL",
                published: false
            }
        },
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        }
    } 
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.start(() => {
    console.log("server is up")
})