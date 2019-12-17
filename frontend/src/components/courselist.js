import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Popup from "reactjs-popup";
import Calendar from "../Pages/Calandar";
import { appointments } from "../data/data";
import { CalendarData } from "../Pages/CalendarDatasource";
import moment from "moment";
import DropdownCollege from "./DropdownCollege";
import DropdownDepartment from "./DropdownDepartment";
import { departmentList } from "../data/departmentList";

import Cookies from "js-cookie";

export default class CourseList extends React.Component {
  // const [courses,setCourse]=useState([]);
  // const [searchQuery] = useState("");
  list = new CalendarData();
  DaysEnum = { Mo: 1, Tu: 2, We: 3, Th: 4, Fr: 5, Sa: 6, Su: 7 };
  moment = moment();
  m = null;
  state = {
    courses: [],
    structuredCourses: [],
    selectedCourses: [],
    setCourse: [],
    searchQuery: "",
    showCalendar: true,
    data: [],
    addedData: {},
    auth: false,
    userInfo: {},
    college: "Enter College",
    department: "Enter Department"
  };
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    this.query();
    this.setLoggedIn();
    let rows = this.list.getAll();

    this.setState(prevState => {
      var joined = this.state.data.concat(rows);
      return { data: joined };
    });
  };
  componentDidUpdate() {}
  query = function() {
    axios
      .get("http://localhost:5000/database/fetchData")
      .then(res => {
        console.log("db data", res.data);
        this.setState({ courses: res.data });
        this.structureCourses();
        return res;
      })
      .catch(err => console.log(err));
  };

  setLoggedIn = function() {
    // Determine if user is logged in

    if (Cookies.get("login") != undefined) {
      let obj = Cookies.get("login");
      this.setState({ auth: true, userInfo: obj }, () => {
        console.log(this.state.userInfo);
      });

      // alert("logged in");
    }
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
  clickLogout = () => {
    //Delete session in backend, delete cookie, and redirect to / page.

    axios({
      method: "get",
      url: "http://localhost:5000/logout",
      withCredentials: true
    })
      .then(res => {
        // alert("Sucessful Logout")
        localStorage.setItem("userID", null);
        Cookies.remove("login");
        window.location = "/";
        console.log(res.data);
        return res;
      })
      .catch(err => console.log(err));
  };

  search = event => {
    this.setState({ searchQuery: event.currentTarget.value });
    console.log(this.state.searchQuery);
    this.render();
  };

  addToCalender = nameTimeObj => {
    console.log("addTocalendar", nameTimeObj);
    let calDatas = [];

    var res = nameTimeObj.time.split("-");
    let weekTime = res[0].split(" ");

    let weekName = weekTime[0];
    let weekNames = weekName.match(/.{2}/g);
    console.log("weekarray", weekName);
    console.log("weekarray1 =", weekNames);
    weekNames.map(name => {
      let calData = {};

      console.log("week name is  =", name);
      let startTime = weekTime[1].trim();
      let endTime = res[1];
      calData.title = nameTimeObj.name;

      let startDateMoment = moment().day(this.DaysEnum[name]);

      let startDate1 = moment(startTime.trim(), ["h:mm A"]);

      startDateMoment.hour(startDate1.get("hour"));
      startDateMoment.minute(startDate1.get("minute"));
      startDateMoment.second(0);
      startDateMoment.millisecond(0);
      let startDate = startDateMoment.toDate();

      calData.startDate = startDate;
      //let endDate = moment(endTime, "HH:mm");
      let endDateMoment = moment().day(this.DaysEnum[name]);
      let endDate1 = moment(endTime.trim(), ["h:mm A"]);

      endDateMoment.hour(endDate1.get("hour"));
      endDateMoment.minute(endDate1.get("minute"));
      endDateMoment.second(0);
      endDateMoment.millisecond(0);
      let endDate = endDateMoment.toDate();

      calData.endDate = endDate; //.toDate();
      calData.id = nameTimeObj.id;
      calData.location = nameTimeObj.location;
      calData.allData = false;
      calDatas.push(calData);
    });

    console.log("final data", calDatas);

    this.setState({ addedData: calDatas });
  };

  onAddElement = calData => {
    let newData = this.list.addElement(calData);
    this.setState({ data: newData });
  };

  selectCollege = data => {
    console.log(data.college);

    this.setState({ college: data.college }, () => {
      this.forceUpdate();
    });
  };

  selectDepartment = data => {
    console.log("this.state.structuredCourses", this.state.structuredCourses);
    this.setState({ department: data.department }, () => {
      let selectedCourses = [];
      // console.log(this.state.college);
      for (
        var i = 0;
        i <
        this.state.structuredCourses[this.state.college][this.state.department]
          .length;
        i++
      ) {
        selectedCourses.push(
          this.state.structuredCourses[this.state.college][
            this.state.department
          ][i]
        );
      }

      this.setState({ selectedCourses: selectedCourses });
    });
  };

  structureCourses = () => {
    let courses = this.state.courses;
    var collegeObj = {};

    for (var i = 0; i < departmentList.length; i++) {
      var collegeName = departmentList[i].college;

      collegeObj[collegeName] = [];
      for (var j = 1; j < departmentList[i].department.length; j++) {
        var departmentName = departmentList[i].department[j];

        collegeObj[collegeName][departmentName] = [];
      }
    }

    for (var i = 0; i < courses.length; i++) {
      courses[i].department = this.removeDepartmentError(courses[i].department);
      // console.log(collegeObj[courses[i].school][courses[i].department]);
      // debugger;
      if (
        collegeObj[courses[i].school] != undefined &&
        collegeObj[courses[i].school][courses[i].department] != undefined
      ) {
        collegeObj[courses[i].school][courses[i].department].push(courses[i]);
      }
    }

    console.log(collegeObj);

    this.setState({ courses: courses });
    this.setState({ structuredCourses: collegeObj });
  };

  removeDepartmentError = str => {
    str = str.replace("(", "");
    str = str.replace(")", "");
    str = str.replace("[object Promise]", "");
    return str.replace(" ", "");
  };

  exports = { CourseList };
  render() {
    const { showCalendar, data } = this.state;

    return (
      <>
        <div className="course-page">
          <div className="form-container-logout">
            {this.state.auth ? (
              <a onClick={this.clickLogout} href="#">
                Log Out
              </a>
            ) : (
              <a href="/login">Log In</a>
            )}
          </div>
          <div className="contain">
            <div className="searchComp">
              <DropdownCollege
                clickComp={this.selectCollege}
                college={this.state.college}
              ></DropdownCollege>
              <DropdownDepartment
                clickComp={this.selectDepartment}
                department={this.state.department}
                college={this.state.college}
              ></DropdownDepartment>
              <div className="form-group">
                <input
                  type="text"
                  value={this.state.searchQuery}
                  onChange={this.search}
                  className="form-control"
                  placeholder="search ..."
                ></input>
                <span className="highlight"></span>
                <span className="bar"></span>
              </div>
              {this.state.courses.map((i, key) => {
                console.log("index", i);
                //if (this.state.courses.length > 0) {
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
              {
                // <button
                //   onClick={() => this.setState({ showCalendar: !showCalendar })}
                //   className="showButton"
                // >
                //   {showCalendar ? "Hide Calendar" : "Show Calendar"}
                // </button>
              }
              {showCalendar ? (
                <Calendar addedData={this.state.addedData} />
              ) : null}
            </div>
          </div>
          <footer>&copy; 2019. NYU course scheduler.</footer>
        </div>
      </>
    );
  }
}
