// src/graphql/resolvers.js
import book from './database.js';

const resolvers = {
  Query: {
    book: (_, { title }) => {    //title로 책 찾기
      return book.filter(book => book.title === title)[0];
    },
    books:()=>book    //select all
},
  Mutation: {
    addBook: (_, {title, author})=>{  //book 추가
        //책 제목 중복 검사
        if (book.find(book => book.title === title)) return null;

        //데이터 추가
        const newBook = {
            id: book.length + 1,
            title,
            author
        };
        book.push(newBook);
        return newBook;
    }
  }
};

export default resolvers;