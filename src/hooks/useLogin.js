import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    //hooks to manage the state of the login process
    const [error, setError] = useState(null) // for error handling
    const [isLoading, setIsLoading] = useState(null) // loading status
    const { dispatch } = useAuthContext() // access auth context dispatch
    
    const login = async (email, password) => { //function to handle authentication logic
        setIsLoading(true) //loading state is started
        setError(null) // previous error messages are cleared

        const response = await fetch('http://localhost:5000/api/user/login', { //api request
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})//send tcredentials
        })
        const json = await response.json() //parse the response to json

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)//empty the loading state
            
        }
    }
    return { login, isLoading, error }//export the login function, loading state and error message
}