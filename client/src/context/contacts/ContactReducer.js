import { CREATE_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, FILTER_CONTACT, SET_CURRENT, CLEAR_CURRENT, CLEAR_FILTER } from  '../types';

const ContactReducer = (state, action) => {
    switch(action.type) {
        case CREATE_CONTACT: 
            return { 
                ...state, 
                contacts: [...state.contacts, action.payload]
            };
        case DELETE_CONTACT: 
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload),
                filtered: state.filtered && state.filtered.filter(contact => contact.id !== action.payload)
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => (contact.id !== action.payload.id ? contact : action.payload)),
                filtered: state.filtered && state.filtered.map(contact => (contact.id !== action.payload.id ? contact : action.payload))
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
        default:
            return state;
    }
}


export default ContactReducer;