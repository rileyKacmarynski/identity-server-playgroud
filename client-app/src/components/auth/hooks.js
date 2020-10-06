import React, {useState, useEffect, useContext, createContext} from 'react';
import { UserManager } from 'oidc-client';

const config = {
    authority: process.env.REACT_APP_IDP_URL,
    client_id: "client-app",
    redirect_uri: `${process.env.REACT_APP_SPA_URL}/callback`,
    response_type: "code",
    scope:"openid profile api",
    post_logout_redirect_uri : process.env.REACT_APP_SPA_URL,
    response_mode: 'query'
};
const mgr = new UserManager(config);
console.log('creating UserManager');


const authContext = createContext({user: null});

export function ProvideAuth({ children }){
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext);


function useProvideAuth(){
    console.log('setting user to null...');
    const [user, setUser] = useState(null);

      // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        const fn = async () => {
            const u = await mgr.getUser();
            setUser(u);
            console.log('getting user...');
            console.log(user);
        }
 
        fn();
        console.log('in use effect...');
        // eslint-disable-next-line
    }, [])

    const login = () => mgr.signinRedirect();

    const logout = () => mgr.signoutRedirect();

    const signinCallback = async () => {

        try {
            // debugger;
            const user = await mgr.signinRedirectCallback();
            // debugger;
            setUser(user);
            console.log('put user in store.');
        } catch(e){
            console.log(e);
        }
    }

    const isAuthenticated = () => {
        // console.log(user);
        return user !== null && !user.expired
    }

    const getAuthHeader = () => `${user.token_type} ${user.access_token}`;    

    return {
        user, 
        login,
        logout,
        signinCallback,
        isAuthenticated,
        getAuthHeader
    }
}
