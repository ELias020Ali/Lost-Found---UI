import { createContext, useReducer, useState, useEffect } from 'react';

export const AuthContext = createContext()// create a context for authentication

export const authReducer = (state, action) => {// this function handles the authentication state changes
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload } // sets the authenticated user
        case 'LOGOUT':
            return { user: null }       //clears the user
        default:
            return state     //returns the current state if no action is taken
    }
}
export const AuthContextProvider = ({ children }) => {// context provider component for authentication
    const [state, dispatch] = useReducer(authReducer, {  //initialises the reducer with the authReducer function and sets the initial state to null
        user: null    }) //initial state is set to null
        const [loading, setLoading] = useState(true);  //loading state for initialisation


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) // checks for saved session

        if (user) {//auto login if valid session is found
            dispatch({ type: 'LOGIN', payload: user}) //auto-login if valid session is found
        }
        setLoading(false); //mark initialisation as complete

    }, []) //runs once on component mount
    if (loading) {
        return null;// wait until local storage check is complete
      }
    
    console.log('AuthContext state: ', state)

    return ( // providses the context to the children components
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}