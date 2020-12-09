import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import App from './App';
import { ApolloProvider } from '@apollo/client';


 const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

export default (<ApolloProvider client={client}><App/></ApolloProvider>)
