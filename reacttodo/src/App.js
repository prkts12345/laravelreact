import './App.css';
import AddTask from './pages/AddTask';
import AddThoughts from './pages/AddThoughts';
import Navbar from './pages/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import ViewTask from './pages/ViewTask';
import ViewThoughts from './pages/ViewThoughts';
import EditTask from './pages/EditTask';
import EditThoughts from './pages/EditThoughts';
import Home from './pages/Home';
axios.defaults.baseURL = "http://localhost:8000/"

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Routes>
        <Route exact path ="/tasks" element={<ViewTask/>}></Route>
        <Route exact path ="/addtask" element={<AddTask/>}></Route>
        <Route exact path ="/tasks/edittask/:id" element={<EditTask/>}></Route>
        <Route exact path ="/thoughts" element={<ViewThoughts/>}></Route>
        <Route exact path ="/addthoughts" element={<AddThoughts/>}></Route>
        <Route exact path ="/thoughts/editthoughts/:id" element={<EditThoughts/>}></Route>
        <Route exact path ="/home" element={<Home/>}></Route>
      </Routes>
      </Router>
      
    </div>
  );
}


export default App;