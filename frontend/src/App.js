import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/register"
import Login from "./components/login"
import CourseList from "./components/courselist"
import './App.css';
import Calendar from './Pages/Calandar';

function App() {

  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={CourseList} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/calender" component={Calendar} />
      </div>
    </Router>
  );
}



export default App;
