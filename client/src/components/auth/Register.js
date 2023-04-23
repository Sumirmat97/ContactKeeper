import React, { useContext, useEffect, useState } from 'react'
import AlertContext from '../../context/alerts/AlertsContext';
import AuthContext from '../../context/auth/AuthContext';
import { useNavigate } from "react-router-dom";

const Register = props => {

    const navigate = useNavigate();
    const { setAlert } = useContext(AlertContext);
    const { register, error, clearErrors, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if(isAuthenticated) {
            navigate("/");
        }

        if(error === "User already exists.") {
            setAlert(error, "danger");
            clearErrors();
        }
        // eslint-disable-next-line 
    }, [error, isAuthenticated, props.history])


    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = user;


    const onChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    } 

    const onSubmit = e => {
        e.preventDefault();
        if(name === '' || email === '' || password === '') {
            setAlert("Please enter all fields", "danger");
        } else if(password !== password2) {
            setAlert("Passwords should match", "danger");
        } else {
            register({name, email, password});
        }
    }


  return (
    <div className="form-container">
        <h1> 
            Account <span className='text-primary'> Register </span>
        </h1>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor='name'> Name </label>
                <input name="name" type='text' value={name} onChange={onChange} required/>
            </div>
            <div className='form-group'>
                <label htmlFor='email'> Email </label>
                <input name="email" type='email' value={email} onChange={onChange} required/>
            </div>
            <div className='form-group'>
                <label htmlFor='password'> Password </label>
                <input name="password" type='password' value={password} onChange={onChange} minLength={6} required/>
            </div>
            <div className='form-group'>
                <label htmlFor='password2'> Password </label>
                <input name="password2" type='password' value={password2} onChange={onChange}  minLength={6} required/>
            </div>
            <input type="submit" value="Register" className='btn btn-block btn-primary'/>
        </form>
    </div>
  )
}

export default Register;
