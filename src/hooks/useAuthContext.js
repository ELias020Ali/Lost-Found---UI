import { AuthContext } from "../context/AuthContext" // context provider for authentication
import { useContext } from "react"

export const useAuthContext = () => {
  const context = useContext(AuthContext) //attempt to access the AuthContext

  if(!context) {// check if context is not available
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context //return the context if available
}