import React, { useEffect, useState } from 'react'

import { useAuth } from './hooks';
import { Redirect } from 'react-router-dom';

const Callback = () => {
    const { signinCallback } = useAuth();
    const [ done, setDone ] = useState(false);

    useEffect(() => {
        if(!done){
            signinCallback().then(user => {
                setDone(true);
            });
        }
    });
    

    return (
        done && <Redirect to="/" /> 
    )
}

export default Callback;