import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contacts/ContactContext'

const ContactFilter = () => {

    const text = useRef('');
    const contactContext = useContext(ContactContext);
    const { filterContacts, clearFilter, filtered } = contactContext;

    useEffect(() => {
        if(filtered === null) {
            text.current.value = '';
        }
    });
    
    const onChange = e => {
        if(text.current.value !== '') {
            filterContacts(text.current.value);
        } else {
            clearFilter();
        }
    } 

  return (
    <form>
        <input type="text" ref={text} placeholder="Filter Contacts..." name="filter" onChange={onChange}/>
    </form>
  )
}

export default ContactFilter;