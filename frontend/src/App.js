import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/register"
import CourseList from "./components/courselist"
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={Register} />
        <Route path="/register" component={Register} />
        <Route path="/courses" component={CourseList} />
      </div>
    </Router>
  );
}

export default App;
