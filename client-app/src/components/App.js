import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './ui/Header';
import Login from './auth/Login';
import Callback from './auth/Callback';
import Logout from './auth/Logout'
import Home from './Home';
import { ProvideAuth } from './auth/hooks';

function App() {

  // const mgr = new UserManager(config);
  // useEffect(() => {
  //   const fn = async () => {
  //     const user = await mgr.getUser();
  //     console.log(user)
  //     if(user){
  //     }
  //   };

  //   fn();
  // }, [mgr])


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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </ProvideAuth>
    </Router>
  );
}

export default App;
