import React, { useContext, useEffect } from 'react'
import Contact from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/AuthContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
      console.log("in home")
      authContext.loadUser();
    // eslint-disable-next-line
  }, [])

  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contact />
      </div>
    </div>
  )
}

export default Home;