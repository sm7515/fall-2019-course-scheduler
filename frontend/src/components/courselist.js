import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Popup from "reactjs-popup";
import Calendar from "../Pages/Calandar";
import { appointments } from "../data/data";
import { CalendarData } from "../Pages/CalendarDatasource";
import moment from "moment";

export default class CourseList extends React.Component {
  // const [courses,setCourse]=useState([]);
  // const [searchQuery] = useState("");
  list = new CalendarData();
  DaysEnum = { Mo: 1, Tu: 2, Wed: 3, Th: 4, Fr: 5, Sa: 6, Su: 7 };
  moment = moment();
  m = null;
  state = {
    courses: [],
    setCourse: [],
    searchQuery: "",
    showCalendar: true,
    data: [],
    addedData: {}
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.query();
    let rows = this.list.getAll();

    this.setState(prevState => {
      var joined = this.state.data.concat(rows);
      return { data: joined };
    });
  }
  componentDidUpdate() {}
  query = function() {
    axios
      .get("http://"+process.env.BACKEND_URL+"/database/fetchData")
      .then(res => {
        console.log("db data", res.data);
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
    console.log("addTocalendar", nameTimeObj);
    let calData = {};

    var res = nameTimeObj.time.split("-");
    let weekName = res[0].substr(0, 2);
    console.log( weekName);
    console.log(this.DaysEnum[weekName]);
    let startTime = res[0].substr(2, res[0].length);
    let endTime = res[1];

    calData.title = nameTimeObj.name;

    let startDateMoment = moment().day(this.DaysEnum[weekName]);
    var seconds = startTime.split(":")[1];
    var minutes = startTime.split(":")[0];
    let startDate1 = moment(startTime.trim(), ["h:mm A"]);

    startDateMoment.hour(startDate1.get("hour"));
    startDateMoment.minute(startDate1.get("minute"));
    let startDate = startDateMoment.toDate();

    calData.startDate = startDate;
    //let endDate = moment(endTime, "HH:mm");
    let endDateMoment = moment().day(this.DaysEnum[weekName]);
    let endDate1 = moment(endTime.trim(), ["h:mm A"]);

    endDateMoment.hour(endDate1.get("hour"));
    endDateMoment.minute(endDate1.get("minute"));
    let endDate = endDateMoment.toDate();

    calData.endDate = endDate; //.toDate();
    calData.id = nameTimeObj.id;
    calData.location = nameTimeObj.location;
    calData.allData = false;

    this.setState({ addedData: calData });
  };

  onAddElement = calData => {
    let newData = this.list.addElement(calData);
    this.setState({ data: newData });
  };
  exports = { CourseList };
  render() {
    const { showCalendar, data } = this.state;

    return (
      <>
        <div className="course-page">
          <button
            onClick={() => this.setState({ showCalendar: !showCalendar })}
            className="showButton"
          >
            {showCalendar ? "Hide Calendar" : "Show Calendar"}
          </button>
          <div className="form-container-logout">
            <a href="/login">Log In</a>
          </div>
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
                console.log( i);
                if (
                  this.state.searchQuery.length > 3 &&
                  i.name.includes(this.state.searchQuery)
                ) {
                  return (
                    <Card
                      key
                      name={i.name}
                      time={i.time}
                      id={i._id}
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
                <Calendar addedData={this.state.addedData} />
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}
