import React from 'react'

import { useAuth } from './auth/hooks';

function Home() {
    const { user } = useAuth();
    return (
        <div>
        {
            user ? `Hello ${user.profile.name}!` : 'Hello!'
        }
        </div>
    )
}

export default Home
