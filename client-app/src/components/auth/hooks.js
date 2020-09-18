import React, {useState, useEffect, useContext, createContext} from 'react';
import { UserManager } from 'oidc-client';

const config = {
    authority: "http://localhost:5000",
    client_id: "client-app",
    redirect_uri: "http://localhost:5001/callback",
    response_type: "code",
    scope:"openid profile",
    post_logout_redirect_uri : "http://localhost:5001",
};

const authContext = createContext();

export function ProvideAuth({ children }){
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext);


function useProvideAuth(){
    const [user, setUser] = useState(null);
    const mgr = new UserManager(config);

      // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        const fn = async () => {
            const mgr = new UserManager(config);
            const u = await mgr.getUser()
            setUser(u);
            console.log('getting user...')
        }

        fn();
    }, [])
    

    const login = () => mgr.signinRedirect();

    const logout = () => mgr.signoutRedirect();

    const signinCallback = async () => {
       return new UserManager({ response_mode: 'query' })
            .signinRedirectCallback()
            .then(user => {
                console.log(user);
                setUser(user);
                return user;
            })
            .catch(e => {
                console.log(e);
            });
    }

    const isAuthenticated = () => user == null;

    return {
        user, 
        login,
        logout,
        signinCallback,
        isAuthenticated
    }
}
