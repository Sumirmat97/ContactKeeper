import React, { useState, useEffect, useContext } from 'react'
import AlertContext from '../../context/alerts/AlertsContext';
import AuthContext from '../../context/auth/AuthContext';
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();
    const { setAlert } = useContext(AlertContext);
    const { login, error, clearErrors, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if(isAuthenticated) {
            navigate("/");
        }

        if(error === "Invalid Credentials") {
            setAlert(error, "danger");
            clearErrors();
        }
        // eslint-disable-next-line 
    }, [error, isAuthenticated]);


    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    } 

    const onSubmit = async (e) => {
        e.preventDefault();
        if(email === '' || password === '') {
            setAlert("Please enter value for all fields", "danger");
        } else {
            await login({email, password});
        }
    }


  return (
    <div className="form-container">
        <h1> 
            Account <span className='text-primary'> Login </span>
        </h1>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor='email'> Email </label>
                <input name="email" type='email' value={email} onChange={onChange} required/>
            </div>
            <div className='form-group'>
                <label htmlFor='password'> Password </label>
                <input name="password" type='password' value={password} onChange={onChange} required/>
            </div>
            <input type="submit" value="Login" className='btn btn-block btn-primary'/>
        </form>
    </div>
  )
}

export default Login;