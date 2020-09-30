import React, { useEffect, useState } from 'react'

import { useAuth } from './hooks';
import { Redirect } from 'react-router-dom';

const Callback = () => {
    const { signinCallback } = useAuth();
    const [ done, setDone ] = useState(false);

    useEffect(() => {
        if(!done){
            signinCallback().then(() => {
                setDone(true);
            });
        }
    });
    

    if(done) {
        console.log('redirecting');
        return ( <Redirect to="/" /> )
    } else {
        return null;
    }
}

export default Callback;