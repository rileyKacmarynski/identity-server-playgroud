import React, { useState, useEffect } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { UserManager } from 'oidc-client';

function App() {  
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({});
  
  const config = {
    authority: "http://localhost:5000",
    client_id: "client-app",
    redirect_uri: "http://localhost:5001",
    response_type: "code",
    scope:"openid profile",
    post_logout_redirect_uri : "http://localhost:5001",
  };
  const mgr = new UserManager(config);

  useEffect(() => {
    const fn = async () => {
      const user = await mgr.getUser();
      setUser(user);
    };

    fn();
  }, [mgr])
  

  function login(){
    setMessage('login');
    mgr.signinRedirect();
  }

  function logout(){
    setMessage('logout');
    mgr.signoutRedirect();
  }

  function api(){
    setMessage('api');
  }

  return (
    <div className="App">
      <header className="App-header">
      <p>Client App</p>
      </header>
      <div className="main">
        <Button onClick={login} disabled={user != null} variant="contained" color="primary"> Login </Button>
        <Button onClick={logout} disabled={user == null} variant="contained" color="primary"> Logout </Button>
        <Button onClick={api} variant="contained" color="primary"> Call Api </Button>    
        <Paper className="logs">
          <pre>{message}</pre>
        </Paper>
      </div>

    </div>
  );
}

export default App;
