import { useReducer } from 'react';
import ContactContext from './ContactContext';
import ContactReducer from  './ContactReducer';
import axios from 'axios';
import { CREATE_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, FILTER_CONTACT, SET_CURRENT, CLEAR_CURRENT, CLEAR_FILTER, CONTACT_ERROR, GET_CONTACT, CLEAR_CONTACT } from  '../types';

const ContactState = props => {

    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        errors: null,
        loading: true
    }
     
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Get contacts
    const getContacts = async () => {
        try {
            const res = await axios.get("/api/contacts");
            dispatch({
                type: GET_CONTACT, 
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR, 
                payload: error.response.data 
            });
        }
    }


    // Add contact
    const addContact = async contact => {
        const config = {
            "Content-Type": "application/json"
        }

        try {
            const res = await axios.post("/api/contacts", contact, config);
            dispatch({
                type: CREATE_CONTACT, 
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR, 
                payload: error.response.data 
            });
        }
    }

    // Delete contact
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({
                type: DELETE_CONTACT, 
                payload: id
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR, 
                payload: error.response.data 
            });
        }
    }

    // Update contact
    const updateContact = async contact => {
        const config = {
            "Content-Type": "application/json"
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({
                type:UPDATE_CONTACT, 
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR, 
                payload: error.response.data 
            });
        }
    }

    // clear contacts
    const clearContacts = () => {
        dispatch({type: CLEAR_CONTACT});
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
            errors: state.errors,
            loading: state.loading,
            getContacts,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            clearContacts
        }}>
        { props.children }
    </ContactContext.Provider>
}

export default ContactState;