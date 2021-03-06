import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// components
import BookList from './components/BookList'
import AddBook from './components/AddBook';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  )
}

export default App

