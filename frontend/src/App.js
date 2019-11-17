import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/register"
import Login from "./components/login"
import CourseList from "./components/courselist"
import './App.css';
import Calendar from './Pages/Calander';

function App() {

  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={Register} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/courses" component={CourseList} />
        <Route path="/calender" component={Calendar} />
      </div>
    </Router>
  );
}



export default App;
