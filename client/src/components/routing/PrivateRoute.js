import React, {  useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext'

const PrivateRoute = () => {

    const authContext = useContext(AuthContext);
    const {isAuthenticated, loading, loadUser} = authContext;

    useEffect(() => {
        const fetchData = async () => {
            await loadUser();
        };
        if(!isAuthenticated) {
            fetchData(); 
        }
    }, 
    // eslint-disable-next-line
    []);

    return (isAuthenticated && !loading ? <Outlet/> : <Navigate to="login" />);
}

export default PrivateRoute;