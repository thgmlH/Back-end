// src/graphql/typeDefs.js
import { gql } from 'apollo-server';

const typeDefs = gql`
    type Book{
        title : String
        author : String
    }

    type Query {
        books: [Book],
        book(title: String!): Book
    }

    type Mutation {
        addBook(title: String!, author: String!): Book!  
    }
`;

export default typeDefs;