import { CREATE_CONTACT, GET_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, FILTER_CONTACT, SET_CURRENT, CLEAR_CURRENT, CLEAR_FILTER, CONTACT_ERROR, CLEAR_CONTACT } from  '../types';

const ContactReducer = (state, action) => {
    switch(action.type) {
        case GET_CONTACT: 
            return { 
                ...state, 
                contacts: action.payload,
                loading: false
            };
        case CREATE_CONTACT: 
            return { 
                ...state, 
                contacts: [action.payload, ...state.contacts],
                loading: false
            };
        case DELETE_CONTACT: 
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload),
                filtered: state.filtered && state.filtered.filter(contact => contact._id !== action.payload),
                loading: false
            };
        case CLEAR_CONTACT: 
            return {
                ...state,
                contacts: null,
                filtered: null,
                errors: null,
                current: null,
                loading: false
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => (contact._id !== action.payload._id ? contact : action.payload)),
                filtered: state.filtered && state.filtered.map(contact => (contact._id !== action.payload._id ? contact : action.payload)),
                loading: false
            }
        case SET_CURRENT: 
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT: 
            return {
                ...state,
                current: null
            };
        case FILTER_CONTACT: 
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            };
        case CLEAR_FILTER: 
            return {
                ...state,
                filtered: null
            };
        case CONTACT_ERROR: 
            return {
                ...state,
                erros: action.payload,
                loading: false
            }
        default:
            return state;
    }
}


export default ContactReducer;