//Apollo GraphQL - GraphQL Library중 가장 많이 사용됨
import resolvers from './resolvers.js';
import typeDefs from './typeDefs.js';
import {ApolloServer} from 'apollo-server';
//import { ApolloClient} from '@apollo/client/core/ApolloClient.js';
//import {ApolloClient, gql, useMutation, useQuery, InMemoryCache} from '@apollo/client';
//import React from 'react'
import fetch from 'cross-fetch';
import pkg from '@apollo/client';
const { ApolloClient, gql, useMutation, useQuery, InMemoryCache, HttpLink } = pkg;

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

const ADD_BOOK = gql`
  mutation AddBook($title: String, $author: String){
    addBook(title: $title, author: $author) {
      title
      author
    }
  }
`;
const BOOK = gql`
  type Book{
    title : String
    author : String
  }
`
const client = new ApolloClient({
  link : new HttpLink({ uri: 'http://localhost:4000/', fetch }),
  cache: new InMemoryCache()    
});

client.mutate({
  variables: { title: "기억2", author: "베르나르 베르베르" },
  mutation: gql`
    mutation AddBook($title: String, $author: String){
      addBook(title: $title, author: $author) {
        title
        author
      }
    }
  `,
})
.then(result => { console.log(result) })
.catch(error => { console.log(error) });

const { loading, error, data } = await client.query({
  query: gql`
    query {
      books {
        title
        author
      }
    }
  `
});
console.log(data)
