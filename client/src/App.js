import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Events from "./components/events";
import CreateEvent from './components/createEvent';
import UpdateEvent from './components/updateEvent';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path={'/'} element={<Events/>}/>
        <Route exact path={'/create'} element={<CreateEvent/>}/>
        <Route exact path={'/update/:id'} element={<UpdateEvent/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
