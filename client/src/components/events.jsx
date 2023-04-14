import React from "react";
import { 
    getAllEvents,
    deleteEvent
} from "../redux/actions/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Events = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const events = useSelector((state) => state.allEvents);

    useEffect(() => {
        dispatch(getAllEvents());
    },[]);

    console.log(events)

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
    }

    const handleDelete = (id) => {
        dispatch(deleteEvent(id));
        alert("Your pokemon has been succesfully deleted.")
        navigate(`/`)
    }

    return(
        <div>
            <h1>Events</h1>
            <table>
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Date</th>
                        <th>Hour</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event.id}>
                            <td>{event.address}</td>
                            <td>{event.date}</td>
                            <td>{event.hour}</td>
                            <td><button onClick={() => handleDelete(event.id)}>X</button></td>
                            <td><button onClick={() => handleUpdate(event.id)}>Update Event</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Events;