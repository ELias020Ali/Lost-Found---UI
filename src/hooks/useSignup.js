import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null) //stores the error message
    const [isLoading, setIsLoading] = useState(null) //tracks the loading state
    const { dispatch } = useAuthContext() //access to global authentication dispatch 
    
    const signup = async (firstname, lastname, email, password) => {
        //start the load in state and delete previous error messages
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:5000/api/user/signup', { //api request
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstname, lastname, email, password}) // send the form data to the backend
        })
        const json = await response.json() // parse the response to json

        if (!response.ok) {
            setIsLoading(false) //end the loading state
            setError(json.error)// // set the error message
        }
        if(response.ok){
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
            
        }
    }
    return { signup, isLoading, error } // export the signup function, loading state and error message
}