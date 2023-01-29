import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar'
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/contacts/ContactState';

const App = () => {
  return (
    <ContactState>
      <Router>
        <Fragment>
          <Navbar/>
            <div className='container'>
              <Routes>
                <Route path="/" element={ <Home/> }></Route>
                <Route path="/about" element={ <About/> }></Route>
              </Routes>
            </div>
        </Fragment>
      </Router>
    </ContactState>
  );
}

export default App;
