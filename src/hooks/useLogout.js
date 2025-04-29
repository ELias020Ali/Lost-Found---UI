import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const navigate = useNavigate();
    const logout = () => {

        // remove user from storage
        localStorage.removeItem('user');
        navigate('/');
        
        localStorage.removeItem('admin');
        navigate('/');
        //dispatch logout action
        dispatch({ type: 'LOGOUT' });
    }

    return {logout}
}