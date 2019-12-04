import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Popup from "reactjs-popup";
import Calendar from "../Pages/Calandar";

export default class CourseList extends React.Component {
  // const [courses,setCourse]=useState([]);
  // const [searchQuery] = useState("");

  state = {
    courses: [],
    setCourse: [],
    searchQuery: "",
    showCalendar: true
  };

  componentDidMount() {
    this.query();
  }

  query = function() {
    axios
      .get("http://localhost:5000/database/fetchData")
      .then(res => {
        console.log(res.data);
        this.setState({ courses: res.data });

        return res;
      })
      .catch(err => console.log(err));
  };

  // useEffect(()=>{
  //     query();
  // }, query)

  /**
     *  <Popup trigger={<button> Calandar</button>}>
            <Calendar classes={{ 
                root: 'stylised-calendar'
            }}/>
        </Popup>
     */

  search = event => {
    this.setState({ searchQuery: event.target.value });
    // console.log(this.state.searchQuery);
    this.render();
  };

  addToCalender = nameTimeObj => {
    // nameTimeObj is an object with course name and course time
    console.log(nameTimeObj);
    alert(JSON.stringify(nameTimeObj));
  };

  render() {
    const { showCalendar } = this.state;

    return (
      <>
        <div className="course-page">
          <button
            onClick={() => this.setState({ showCalendar: !showCalendar })}
            className="showButton"
          >
            {showCalendar ? "Hide Calendar" : "Show Calendar"}
          </button>
          <div className="contain">
            <div className="searchComp">
              <form>
                <label>
                  Search:
                  <input
                    type="text"
                    name=""
                    value={this.state.searchQuery}
                    onChange={this.search}
                  ></input>
                </label>
              </form>
              {this.state.courses.map((i, key) => {
                if (
                  this.state.searchQuery.length > 3 &&
                  i.name.includes(this.state.searchQuery)
                ) {
                  return (
                    <Card
                      name={i.name}
                      time={i.time}
                      location={i.location}
                      department={i.department}
                      description={i.description}
                      clickComponent={this.addToCalender}
                    ></Card>
                  );
                }
              })}
            </div>

            <div className="calenderComp">
              {showCalendar ? (
                <Calendar
                  classes={{
                    root: "stylised-calendar"
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}
