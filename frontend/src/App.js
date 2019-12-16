import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Register from "./components/register"
import Login from "./components/login"
import CourseList from "./components/courselist"
import './App.css';
import Calendar from './Pages/Calandar';

import Cookies from 'js-cookie'
function App() {

  return (
    <Router>
      <div className="container">
        {/* Routers for authenticated users */}
        <Route path="/courses">
          {authenticate() ? <CourseList></CourseList> : <Redirect to = "/" > </Redirect>}
        </Route>
        {/* Un authneticated uesrs */}

        <Route path="/" exact component={CourseList} />
        <Route path="/register" component={Register}>
          {authenticate() ? <Redirect to = "/courses"></Redirect> : <Register></Register>}
        </Route>
        <Route path="/login" component={Register}>
          {authenticate() ? <Redirect to = "/courses"></Redirect> : <Login></Login>}
        </Route>
        <Route path="/calender" component={Calendar} />
      </div>
    </Router>
  );
}

function authenticate()
{
  let obj = {};
  console.log(Cookies.get("login"));
  if(Cookies.get("login") == undefined)
  {
    // alert("Not logged in")
    return false;
  }
  else
  {
    // alert("Logged in")
    return true;
  }
}

export default App;
