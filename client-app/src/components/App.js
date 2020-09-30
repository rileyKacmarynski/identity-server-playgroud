import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './ui/Header';
import Login from './auth/Login';
import Callback from './auth/Callback';
import Logout from './auth/Logout'
import Home from './Home';
import Claims from './Claims';
import { ProvideAuth } from './auth/hooks';
import PrivateRoute from './auth/PrivateRoute';

function App() {

  return (
    <Router>
      <ProvideAuth>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/callback">
            <Callback />
          </Route>
          <PrivateRoute path="/claims">
            <Claims />
          </PrivateRoute>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </ProvideAuth>
    </Router>
  );
}

export default App;
