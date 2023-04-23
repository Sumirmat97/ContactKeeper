import { useReducer } from "react";
import { v4 } from 'uuid';
import { REMOVE_ALERT, SET_ALERT } from "../types";
import AlertsContext from "./AlertsContext";
import AlertsReducer from "./AlertsReducer";

const AlertsState = props => {

    const initialState = [];

    const [state, dispatch] = useReducer(AlertsReducer, initialState);

    //Set alert
    const setAlert = (msg, type, timeout = 5000) => {
        const id = v4();
        dispatch({
            type: SET_ALERT,
            payload: {id, msg, type}
        });

        setTimeout(()=>{
            dispatch({
                type: REMOVE_ALERT,
                payload: id
            })
        }, timeout);
    }

    return <AlertsContext.Provider
        value={{
            alerts: state,
            setAlert
        }}>
        {props.children}
    </AlertsContext.Provider>


}

export default AlertsState;