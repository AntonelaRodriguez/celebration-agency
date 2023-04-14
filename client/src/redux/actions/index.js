import axios from 'axios';

export const getAllEvents = () => {
    return async function(dispatch){
        let json = await axios.get('http://localhost:8080/product')
            return dispatch({type: "GET_ALL_EVENTS", payload: json.data})
    };
};

export const postEvent = (newEvent) => {
    return async function(dispatch) {
        try{
            let pokemon = await axios.post('http://localhost:8080/product', newEvent)
            return pokemon;
        } catch(e) {
            console.log(e);
        };
    };
};

export const getEventDetail = (id) => {
    return async function(dispatch) {
        try{
            let json = await axios.get(`http://localhost:8080/product/${id}`);
            return dispatch({type:"GET_EVENT_DETAIL", payload: json.data})
        } catch(e) {
            console.log(e);
        };
    };
};

export const updateEvent = (id, updatedEvent) => {
    return async function(dispatch){
        try{
            let pokemon = await axios.put(`http://localhost:8080/product/${id}`, updatedEvent);
            return pokemon;
        } catch(e) {
            console.log(e);
        };
    };
};

export const deleteEvent = (id) => {
    return async function(dispatch){
        try{
            let event = await axios.delete(`http://localhost:8080/product/${id}`);
            return event;
        } catch(e) {
            console.log(e);
        };
    };
};