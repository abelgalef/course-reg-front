import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
// import {}

export function PrivateRoute({ comp, redirect }) {
    const { authenticated, loading } = useSelector(state => state.auth)
    
    if (authenticated) {
        return comp
    } else if (loading) {
        return <h1>Loading....</h1>
    } else {
        return <Navigate to={redirect} />
    } 
}

export function PublicRoute({ comp, redirect }) {
    const { authenticated, loading } = useSelector(state => state.auth)
    
    if (!authenticated) {
        return comp
    } else if (loading) {
        return <h1>Loading....</h1>
    } else {
        return <Navigate to={redirect} />
    } 
}


