import React from 'react'

import { useProtectedApi } from '../hooks/useApi';

function Claims() {
    const url = "http://localhost:5002/identity";
    const {isLoading, isError, data } = useProtectedApi(url, [])
    
    const claimItems = data.map(claim => <li key={claim.type + claim.value}>{claim.type}: {claim.value}</li>)

    return (
        <div>
                {isLoading
                    ? <p>loading...</p>
                    : <ul>{claimItems}</ul>}
                {isError && <p>Error loading claims.</p>}
        </div>
    )
}

export default Claims
