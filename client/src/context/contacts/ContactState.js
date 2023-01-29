import { useReducer } from 'react';
// import {uuid} from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from  './ContactReducer';
import { CREATE_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, FILTER_CONTACT, SET_CURRENT, CLEAR_CURRENT, CLEAR_FILTER } from  '../types';

const ContactState = props => {

    const initialState = {
        contacts: [
            {
                id:1,
                name: "ABC",
                email: "abc@gmail.com",
                phone: "111-222-3333",
                type: "personal"
            },
            {
                id:2,
                name: "BCD",
                email: "bcd@gmail.com",
                phone: "112-222-3333",
                type: "professional"
            }
        ],
        current: null,
        filtered: null
    }
     
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add contact
    const addContact = contact => {
        // contact.id = uuid.v4();
        dispatch({type: CREATE_CONTACT, payload: contact});
    }
    // Delete contact
    const deleteContact = id => {
        dispatch({type: DELETE_CONTACT, payload: id});
    }
    // Update contact
    const updateContact = contact => {
        dispatch({type:UPDATE_CONTACT, payload: contact});
    }
    // Set current contact
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact});
    }
    // Clear current contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
    }
    // Filter contact
    const filterContacts = text => {
        dispatch({type: FILTER_CONTACT, payload: text});
    }
    // Clear filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER});
    }

    return <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current, 
            filtered: state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}>
        { props.children }
    </ContactContext.Provider>
}

export default ContactState;