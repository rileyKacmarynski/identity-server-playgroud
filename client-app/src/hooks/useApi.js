import { useState, useEffect } from 'react'

import { useAuth } from '../components/auth/hooks';


export const useApi = (url, initialData) => useGenericApi(initialData, () => fetch(url))

export const useProtectedApi = (url, initialData) => {
    const { getAuthHeader } = useAuth();
    const options = {
        headers: {
            "Authorization": getAuthHeader()
        }
    };

    return useGenericApi(initialData, () => fetch(url, options));
}

const useGenericApi = (initialData, doFetch) => {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                console.log('calling api...')
                const response = await doFetch();
                // api returning development exception page and I'm too lazy to change that rn. 
                if(response.status < 200 || response.status >= 400) throw new Error(response.statusText);
                const data = await response.json();
                setData(data);
            } catch(e) {
                console.log(e);
                setIsError(true);
            }

            setIsLoading(false);
        }

        fetchData();
        // eslint-disable-next-line
    }, []);

    return {
        data, 
        isLoading,
        isError
    };
}