import React, { useContext, useEffect, useState } from 'react'
import ContactContext from '../../context/contacts/ContactContext';

const ContactForm = () => {
  
    const contactContext = useContext(ContactContext);
    const { addContact, updateContact, current, clearCurrent } = contactContext; 

    useEffect(() => {
        if(current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [current, contactContext]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const {name, email, phone, type} = contact;

    const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if(current !== null) {
            updateContact(contact);
        } else {
            addContact(contact);
        }
        clearAll();
    }

    const clearAll = () => {
        clearCurrent();
    }

    return (
    <form onSubmit={onSubmit}>
        <h2 className='text-primary'> {current ? 'Edit Contact' : 'Add Contact'} </h2>
        <input type="text" placeholder="Name" value={name} name="name" onChange={onChange} />
        <input type="email" placeholder="Email" value={email} name="email" onChange={onChange} />
        <input type="text" placeholder="Phone No." value={phone} name="phone" onChange={onChange} />
        <h4>Contact Type</h4>
        <input type="radio" value="personal" checked={type === "personal"}  name="type" onChange={onChange}/> Personal { ' ' }
        <input type="radio" value="professional" checked={type === "professional"}  name="type" onChange={onChange}/> Professional
        <div><input type="submit" className='btn btn-sm btn-primary btn-block' value={current ? 'Update Contact' : 'Add Contact'} /> </div>
        { current && 
            <div><button className='btn btn-sm btn-light btn-block' onClick={clearAll}> Clear </button></div> }
    </form>
  )
}

export default ContactForm;