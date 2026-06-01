import React from 'react'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../api/axios'

const ProtectedRoutes = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        function checkAuth() {
            api.get('/auth/me')
                .then(res => {
                    if (res.data.success) {
                        setIsAuthenticated(true)
                    } else {
                        setIsAuthenticated(false)
                    }
                })
                .catch(err => {
                    setIsAuthenticated(false)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
        checkAuth()

    }, [])

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : isAuthenticated ? (
                children
            ) : (
                <Navigate to="/login" replace />
            )}
        </>
    )
}

export default ProtectedRoutes