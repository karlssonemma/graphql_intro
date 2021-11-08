let express = require('express');
let { graphqlHTTP } = require('express-graphql');
let { GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLBoolean,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

    const authors = [
        { id: 1, name: 'J. K. Rowling' },
        { id: 2, name: 'J. R. R. Tolkien' },
        { id: 3, name: 'Brent Weeks' }
    ]
    
    const books = [
        { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
        { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
        { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
        { id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
        { id: 5, name: 'The Two Towers', authorId: 2 },
        { id: 6, name: 'The Return of the King', authorId: 2 },
        { id: 7, name: 'The Way of Shadows', authorId: 3 },
        { id: 8, name: 'Beyond the Shadows', authorId: 3 }
    ]


const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        books: {
            type: new GraphQLList(BookType),
            description: 'List of books',
            resolve: () => books
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})



var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000, console.log('Running a GraphQL API server at http://localhost:4000/graphql'));
;