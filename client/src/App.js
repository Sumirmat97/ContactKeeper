import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Alerts from './components/layouts/Alerts';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ContactState from './context/contacts/ContactState';
import AuthState from './context/auth/AuthState';
import AlertsState from './context/alerts/AlertsState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertsState>
          <Router>
            <Fragment>
              <Navbar/>
                <div className='container'>
                  <Alerts/>
                  <Routes>
                    <Route path="/" 
                      element={ 
                        <PrivateRoute> 
                          <Home/> 
                        </PrivateRoute> }>
                      </Route>
                    <Route path="/about" element={ <About/> }></Route>
                    <Route path="/login" element={ <Login/> }></Route>
                    <Route path="/register" element={ <Register/> }></Route>
                  </Routes>
                </div>
            </Fragment>
          </Router>
        </AlertsState>
      </ContactState>
    </AuthState>
  );
}

export default App;
