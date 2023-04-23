import { AUTH_ERROR, CLEAR_ERRORS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCES, USER_LOADED } from "../types";

const AuthReducer = (state, action) => {
    switch(action.type) {

        case USER_LOADED: 
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case REGISTER_SUCCES:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                error: action.payload,
                isAuthenticated: false,
                user: null,
                token: null,
                loading: false
            };
        case CLEAR_ERRORS: 
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export default AuthReducer;