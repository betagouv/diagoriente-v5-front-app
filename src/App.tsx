import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from 'requests/client';

import RootContainer from 'containers/RootContainer';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <RootContainer />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
