//Apollo GraphQL - GraphQL Library중 가장 많이 사용됨
import resolvers from './resolvers.js';
import typeDefs from './typeDefs.js';
//import {ApolloServer} from 'apollo-server';
//import { ApolloClient} from '@apollo/client/core/ApolloClient.js';
//import {ApolloClient, gql, useMutation, useQuery, InMemoryCache} from '@apollo/client';
//import React from 'react'
import fetch from 'cross-fetch';
import pkg from '@apollo/client';
const {ApolloClient, gql, useMutation, useQuery, InMemoryCache, HttpLink} = pkg;
/*const server = new ApolloServer({
    typeDefs,
    resolvers
});*/

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

function execute(){
  const client = new ApolloClient({
      link : new HttpLink({ uri: 'http://localhost:4000/', fetch }),
      //uri : 'http://localhost:4000/',
      cache: new InMemoryCache()
  });

  const [addBook, { data, loading, error }] = useMutation(ADD_BOOK);
  const Book = useQuery(BOOK)
  addBook({variables : {'title' : "기억1", 'author' : '베르나르 베르베르'}})
}
execute()
/*client.mutate({
  mutation: gql `mutation AddBook($title: String, $author: String){
    addBook(title: $title, author: $author) {
      title
      author
    }
  }`,
  variables: {
      title: "기억1",
      author: "베르베르",
  }
}).then((res) => {
  console.log(res)
}).catch((error) => {
  console.log(error)
})
*/

/*client
  .query({
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  })
  .then((result) => console.log(result));*/


/*server.listen().then(async function ({ port }){
    console.log(`Server started on port: ${port}`)
    const result = await server.executeOperation({
        //query: 'mutation AddBook($title: String!, $author: String!){ addBook (title : $title, author : $author) {title, author}}',
        //variables: { title : '기억1', author : '베르나르 베르베르'}
        query: 'query all{books {title, author}}',
    });
    console.log(result)
    //in client it's being done 
})*/
