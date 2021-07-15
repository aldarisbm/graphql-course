import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)

const typeDefs = `
    type Query {
        me: User!
        post: Post!
        greeting(name: String!, position: String!): String!
        add(a: Float!, b: Float!): Float!
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
        add(parents, args, ctx, info) {
            return args.a + args.b
        },
        greeting(parent, args, ctx, info) {
            if (args.name && args.position) {
                return `Hello ${args.name}, you're my favorite ${args.position}!`
            }
            return `Hello!`  
        },
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