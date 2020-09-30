import React from 'react'
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from './hooks';

function PrivateRoute({children, ...rest}) {
    const { isAuthenticated } = useAuth();
    const authed = isAuthenticated();
    console.log(authed);


    return authed
        ? <Route {...rest} >{children}</Route>
        : <Redirect to='/' />
}

export default PrivateRoute
