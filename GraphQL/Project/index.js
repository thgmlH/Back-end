//Apollo GraphQL - GraphQL Library중 가장 많이 사용됨
import resolvers from './resolvers.js';
import typeDefs from './typeDefs.js';
import {ApolloServer} from 'apollo-server';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

/*server.listen().then(({url})=>{
    console.log(`Listening at ${url}`)
})*/

const result = await server.executeOperation({
    query: 'query Testquery ($title: String){book (title : $title) {author}}',
    variables: { title : "Before You" }
});

console.log(result)
