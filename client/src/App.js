import React from 'react';

import './spinner.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import reduxStore
import { Provider } from 'react-redux';
import store from './utils/store';

// import components
import Header from './components/Header';
import Home from './Pages/Home';
import Footer from './components/Footer';

// import pages
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import BookDetail from './Pages/BookDetail';
import Donate from './Pages/Donate';
import Success from './Pages/Success';
import Browse from './Pages/Browse'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {


  return (
  <ApolloProvider client={client}>
    <Router>
      <div className="App">
        <Provider store={store}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/dashboard"component={Dashboard} />
            <Route exact path="/books/:id" render={(props) => <BookDetail {...props} key={Math.random()} /> } />
            <Route exact path="/donate" component={Donate} />
            <Route exact path="/success" component={Success} />
            <Route exact path="/browse" component={Browse} />
          </Switch>
          <Footer />
        </Provider>
      </div>
    </Router>
  </ApolloProvider>
  );
}

export default App;
