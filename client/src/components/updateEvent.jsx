import React from "react";
import { 
    updateEvent, getEventDetail
} from "../redux/actions/index";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UpdateEvent = () => {

    const dispatch = useDispatch();
    const eventD = useSelector((state) => state.eventDetail);
    const {id} = useParams();

  const [input, setInput] = useState({
    address: "",
    date: "",
    hour: "",
  });

  useEffect(() => {
    dispatch(getEventDetail(id))
}, [dispatch, id]);

  const handleChange = (event) => {
    setInput({
        ...input,
        [event.target.name] : event.target.value
    });
    console.log(input)
  };

  const created = {
    address: input.address,
    date: input.date,
    hour: input.hour,
  }

  const handleSubmit = (event) => {
    
    event.preventDefault();
    console.log(created)
    dispatch(updateEvent(id ,created));
    alert("Event successfully updated!");
    setInput({
      address: "",
      date: "",
      hour: "",
    });
  };


    return(
        <div>
            {Object.keys(eventD).length !== 0 ?
            <>
          <h2>Update Event</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
      
      <label>
        Address:
        <input
          type="text"
          value={input.address}
          name="address"
          placeholder="Type your address..."
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={input.date}
          name="date"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Hour:
        <input
          type="time"
          value={input.hour}
          name="hour"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <button type="submit">Create Event</button>
    </form>
    <button>Cancel</button>
    </>
    : <div><h1>Loading...</h1></div>}
        </div>
    )
}
export default UpdateEvent;