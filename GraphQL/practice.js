const {ApolloServer, gql} = require('apollo-server')
//Apollo GraphQL - GraphQL Library중 가장 많이 사용됨

const typeDefs = gql`
    type Query{
        books: [Book],
        ping : String
    }
    type Book{
        title : String
        author : String
    }
`

const book = [
    {
        title : "Little Women",
        author : "Louisa May Alcott"
    },
    {
        title : "Before You",
        author : "Jojo Moyes"
    }
]

const resolvers = {
    Query :{
        ping:()=>"pong",
        //ping으로 호출 시 pong나옴
        books:()=>book
        //ping으로 호출 시 pong나옴
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({url})=>{
    console.log(`Listening at ${url}`)
})

