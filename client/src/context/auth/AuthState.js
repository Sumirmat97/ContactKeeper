import { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from  './AuthReducer';
import { AUTH_ERROR, CLEAR_ERRORS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCES, USER_LOADED } from  '../types';
import setAuthToken from '../../utils/setAuthToken';


const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    }
     
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // load user
    const loadUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get("/api/auth");
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    // register user
    const register = async (formData) => {
        const config = {
            "Context-Type": "application/json"
        }
        
        try {
            const response = await axios.post('/api/users', formData, config);
            dispatch({
                type: REGISTER_SUCCES, 
                payload: response.data
            });
            loadUser();
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL, 
                payload: error.response.data.msg
            });
        }
    }

    //login user
    const login = async (formData) => {
        const config = {
            "Context-Type": "application/json"
        }
        
        try {
            const response = await axios.post('/api/auth', formData, config);
            dispatch({
                type: LOGIN_SUCCESS, 
                payload: response.data
            });
            loadUser();
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL, 
                payload: error.response.data.msg
            });
        }
    }
    //logout
    const logout = () => {
        dispatch({type: LOGOUT});
    }

    //clear errors
    const clearErrors = () => {
        dispatch({type: CLEAR_ERRORS});
    }


    return <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            clearErrors,
            loadUser,
            login,
            logout
        }}>
        { props.children }
    </AuthContext.Provider>
}

export default AuthState;