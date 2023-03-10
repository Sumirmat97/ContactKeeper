import React, { Fragment, useContext } from 'react'
import ContactContext from '../../context/contacts/ContactContext'
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import ContactItem from './ContactItem';

const Contacts = () => {

    const contactContext = useContext(ContactContext);
    const { contacts, filtered } = contactContext;

  if(!contacts) {
    return  <h4>Please add a contact.</h4>
  }

  return (
    <Fragment>
      <TransitionGroup>
        {
          filtered !== null ? 
            filtered.map(contact => ( 
              <CSSTransition key={contact.id} timeout={500} classNames="item"> 
                <ContactItem contact={contact}/> 
              </CSSTransition> ))
            : 
            contacts.map(contact => ( 
              <CSSTransition key={contact.id} timeout={500} classNames="item">
                <ContactItem contact={contact}/>
              </CSSTransition>) )
        }
      </TransitionGroup>
    </Fragment>
  )


}


export default Contacts;