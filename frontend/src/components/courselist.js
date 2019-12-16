import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Popup from "reactjs-popup";
import Calendar from "../Pages/Calandar";
import { appointments } from "../data/data";
import { CalendarData } from "../Pages/CalendarDatasource";
import moment from "moment";

import Cookies from 'js-cookie';

export default class CourseList extends React.Component {
  // const [courses,setCourse]=useState([]);
  // const [searchQuery] = useState("");
  list = new CalendarData();
  DaysEnum = { Mo: 1, Tu: 2, We: 3, Th: 4, Fr: 5, Sa: 6, Su: 7 };
  moment = moment();
  m = null;
  state = {
    courses: [],
    setCourse: [],
    searchQuery: "",
    showCalendar: true,
    data: [],
    addedData: {},
    auth: false,
    userInfo: {}
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
  }
  componentDidUpdate() {}
  query = function() {
    axios
      .get("http://localhost:5000/database/fetchData")
      .then(res => {
        console.log("db data", res.data);
        this.setState({ courses: res.data });
        return res;
      })
      .catch(err => console.log(err));
  };
  
  setLoggedIn = function(){
    // Determine if user is logged in

    if(Cookies.get("login") != undefined)
    {
      let obj = Cookies.get("login");
      this.setState({auth: true, userInfo: obj}, () => {
        console.log(this.state.userInfo);
      });

      // alert("logged in");
    }
  }
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
 clickLogout = () =>{

    //Delete session in backend, delete cookie, and redirect to / page.

    axios({
      method:"get",
      url:'http://localhost:5000/logout',
      withCredentials :true,
    })
        .then(res => {
            // alert("Sucessful Logout")
            localStorage.setItem('userID', null);
            Cookies.remove("login");
            window.location = '/';
        console.log(res.data)
            return res;
        })
        .catch(err => console.log(err));
  }

  search = event => {
    this.setState({ searchQuery: event.target.value });
    // console.log(this.state.searchQuery);
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
            {this.state.auth ? <a onClick={this.clickLogout} href ="#">Log Out</a> : <a href="/login">Log In</a>}
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
                //console.log("index", i);
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
