import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)

const typeDefs = `
    type Query {
        me: User!
        post: Post!
        greeting(name: String!, position: String!): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
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
            if (args.numbers == 0) {
                return 0
            } 
            return args.numbers.reduce((acc, currentVal) => {
                return acc + currentVal
            })
        },
        greeting(parent, args, ctx, info) {
            if (args.name && args.position) {
                return `Hello ${args.name}, you're my favorite ${args.position}!`
            }
            return `Hello!`  
        },
        grades(parent, args, ctx, info) {
            return [99, 80, 93]
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