import React, { Fragment, useContext, useEffect } from 'react'
import ContactContext from '../../context/contacts/ContactContext'
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import ContactItem from './ContactItem';
import Spinner from '../layouts/Spinner';

const Contacts = () => {

    const contactContext = useContext(ContactContext);
    const { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
      const fetchData = async () => {
        await getContacts();
      } 
      fetchData();
      // eslint-disable-next-line
    }, [])

  if(!loading && contacts !==null && contacts.length === 0) {
    return  <h4>Please add a contact.</h4>
  }

  return (
    <Fragment>
      { contacts !== null && contacts.length >= 0 && !loading ? (     
        <TransitionGroup>
          {
            filtered !== null ? 
              filtered.map(contact => ( 
                <CSSTransition key={contact._id} timeout={500} classNames="item"> 
                  <ContactItem contact={contact}/> 
                </CSSTransition> ))
              : 
              contacts.map(contact => ( 
                <CSSTransition key={contact._id} timeout={500} classNames="item">
                  <ContactItem contact={contact}/>
                </CSSTransition>) )
          }
        </TransitionGroup>
        ) : <Spinner/>
      }

    </Fragment>
  )


}


export default Contacts;