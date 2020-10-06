import React from 'react'

import { useAuth } from './auth/hooks';
import { useApi } from '../hooks/useApi';

function Home() {
    const { user } = useAuth();
    const url = `${process.env.REACT_APP_API_URL}/WeatherForecast`;
    const { isLoading, isError, data } = useApi(url, []);

    const weatherSummary = data.length > 0 && <p>The weather today is {data[0].summary}.</p>

    console.log('rendering home...')

    return (
        <div>
            <p>{user ? `Hello ${user.profile.name}!` : 'Hello!'}</p>
            {isLoading
                ? <p>loading...</p>
                : weatherSummary}
            {isError && <p>Error loading data.</p>}
        </div>
    )
}

export default Home
