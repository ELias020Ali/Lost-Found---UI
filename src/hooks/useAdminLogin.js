import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useAdminLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    
    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:5000/api/user/loginadmin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            // save user to local storage
            localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));

            // update auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
            
        }
    }
    return { login, isLoading, error }
}