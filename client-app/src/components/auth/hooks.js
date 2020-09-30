import React, {useState, useEffect, useContext, createContext} from 'react';
import { UserManager } from 'oidc-client';

const config = {
    authority: "http://localhost:5000",
    client_id: "client-app",
    redirect_uri: "http://localhost:5001/callback",
    response_type: "code",
    scope:"openid profile api",
    post_logout_redirect_uri : "http://localhost:5001",
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
        // mgr.getUser()
        //     .then(u => {
        //         // debugger;
        //         console.log('grabbing user from store');
        //         // console.log(u);
        //         setUser(u);
        //     });

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
