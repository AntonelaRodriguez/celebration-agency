import React from "react";
import { 
    postEvent
} from "../redux/actions/index";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateEvent = () => {

  const dispatch = useDispatch();
  const [input, setInput] = useState({
    address: "",
    date: "",
    hour: "",
  });

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
    dispatch(postEvent(created));
    alert("Event successfully created!");
    setInput({
      address: "",
      date: "",
      hour: "",
    });
  };


    return(
        <div>
          <h2>Create Event</h2>
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
        </div>
    )
}
export default CreateEvent;