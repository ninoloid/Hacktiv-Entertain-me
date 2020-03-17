import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import Home from './views/Home'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Movie from './views/Movie';
import Series from './views/Series'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
})

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className="App">
          <Switch>
            <Route exact path="/movies">
              <Movie />
            </Route>
            <Route exact path="/series">
              <Series />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
