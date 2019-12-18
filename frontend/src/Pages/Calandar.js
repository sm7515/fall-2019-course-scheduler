import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip
} from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CalendarData } from "../Pages/CalendarDatasource";
import Grid from "@material-ui/core/Grid";
import Room from "@material-ui/icons/Room";
import "../Calendar.css";
import axios from "axios";
import moment from "moment";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#e86c00",
      main: "#e86c00",
      contrastText: "#fff"
    },
    secondary: {
      light: "#e86c00",
      main: "#57068c",
      contrastText: "#fff"
    },
    typography: {
      fontFamily: "Montserrat,sans-serif"
    },
    text: {
      fontFamily: "Montserrat,sans-serif"
    }
  }
});

const Appointment = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: "#e86c00",
      borderRadius: "0",
      fontFamily: "Montserrat, sans-serif",
      width: "112px",
      overflow: "visible",
      textOverflow: "unset "
    }}
  >
    {children}
  </Appointments.Appointment>
);

const style = ({ palette }) => ({
  icon: {
    color: palette.primary.main
  },
  textCenter: {
    textAlign: "center",
    fontFamily: "Montserrat, sans-serif"
  },
  todayCell: {
    borderBottom: "1px solid rgba(224, 224, 224, 1) !important",
    borderRight: "1px solid rgba(224, 224, 224, 1)",
    "&:hover": {
      backgroundColor: "rgba(137, 0, 225,0.3) !important"
    },
    "&:focus": {
      backgroundColor: "rgba(232, 108, 0,0.7) !important"
    }
  },
  today: {
    color: "rgba(232, 108, 0,0.7) !important"
  }
});

const Content = withStyles(style, { name: "Content" })(
  ({ children, appointmentData, classes, ...restProps }) => (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
      <Grid container alignItems="center">
        <Grid item xs={2} className={classes.textCenter}>
          <Room className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <span>{appointmentData.location}</span>
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  )
);

const DayScaleCellBase = ({ classes, ...restProps }) => {
  const { today } = restProps;
  if (today) {
    return <WeekView.DayScaleCell {...restProps} className={classes.today} />;
  }
  return <WeekView.DayScaleCell {...restProps} />;
};

const DayScaleCell = withStyles(style, { name: "DayScaleCell" })(
  DayScaleCellBase
);
const TimeTableCellBase = ({ classes, ...restProps }) => {
  return (
    <WeekView.TimeTableCell {...restProps} className={classes.todayCell} />
  );
};
const TimeTableCell = withStyles(style, { name: "TimeTableCell" })(
  TimeTableCellBase
);

export default class Calendar extends React.PureComponent {
  list = new CalendarData();
  DaysEnum = { Mo: 1, Tu: 2, We: 3, Th: 4, Fr: 5, Sa: 6, Su: 7 };
  moment = moment();
  m = null;
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      classes: props.classes,
      currentDate: new Date(),
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointmentId: undefined
    };
    this.commitChanges = this.commitChanges.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointmentId = this.changeEditingAppointmentId.bind(
      this
    );
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
  }
  query = function() {
    return axios({
      method: "get",
      url: "http://35.243.213.6/schedule/viewschedule/",
      withCredentials: true
    });
  };
  saveScheduler = function(body) {
    return axios.post("http://35.243.213.6/schedule/add", body, {
      withCredentials: true
    });
  };
  deleteScheduler = function(body) {
    // debugger;
    axios
      .delete("http://35.243.213.6/schedule/deleteCourse", {
        data: body,
        withCredentials: true
      })
      .then(res => {
        console.log("db data for scheduler", res.data);

        return res;
      })
      .catch(err => console.log(err));
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
      calData.id = nameTimeObj._id;
      calData.location = nameTimeObj.location;
      calData.allData = false;
      calDatas.push(calData);
    });

    console.log("final data", calDatas);

    return calDatas;
  };
  componentDidMount() {
    let rows = [];

    this.query()
      .then(res => {
        console.log("db data for scheduler", res.data);
        //this.setState({ data: res.data });
        //this.structureCourses();

        let result = res.data;
        console.log("result", result);

        result.map(item => {
          let res = this.addToCalender(item);
          rows = [].concat(rows, res);
        });
        console.log("kiran rows", rows);

        this.setState({ data: rows });
      })
      .catch(err => console.log(err));
  }
  filterUniqueDates(data) {
    const lookup = new Set();

    return data.filter(date => {
      const serialised = date.getTime();
      if (lookup.has(serialised)) {
        return false;
      } else {
        lookup.add(serialised);
        return true;
      }
    });
  }

  commitChanges({ added, changed, deleted }) {
    // console.log("added", added);
    // console.log("changed", changed);
    // console.log("deleted", deleted);

    this.setState(state => {
      let { data } = state;
      if (added) {
        let newdata = [...data, ...added];
        // added.map(item => {
        let item = added[0];
        this.saveScheduler({ course_id: item.id })
          .then(res => {
            console.log("db data for scheduler", res.data);
          })
          .catch(err => console.log(err));
        // });
        const duplicatePositions = newdata.map(el => el.startDate);
        console.log("duplicatePositions= ", duplicatePositions);
        let idPositions = new Set();
        idPositions = this.filterUniqueDates(duplicatePositions);

        // let idPositions = [...new Set(duplicatePositions)];
        console.log("idPositions= ", idPositions);

        data = newdata.filter((item, pos, arr) => {
          // console.log("item = ", item);
          // console.log("pos = ", pos);
          // console.log("arr = ", arr);
          // console.log("indexOf = ", idPositions.indexOf(item.startDate));

          return idPositions.indexOf(item.startDate) == pos;
        });
      }
      if (changed) {
        data = data.map(appointment =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        this.deleteScheduler({ course_id: deleted });
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data: data };
    });
  }
  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
    this.changeEditingAppointmentId(undefined);
  }
  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointmentId(editingAppointmentId) {
    this.setState({ editingAppointmentId });
  }
  componentWillReceiveProps(nextProps) {
    let addedAppointment = nextProps.addedData;
    if (Object.keys(addedAppointment).length !== 0) {
      let addedData = [];
      addedData = [...nextProps.addedData];

      this.commitChanges({ added: addedData });
    }
  }
  render() {
    const {
      currentDate,
      data,
      classes,
      appointmentChanges,
      addedAppointment,
      editingAppointmentId
    } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <Paper classes={{ classes }}>
          <Scheduler data={data} onAppointmentClick={this.handleEvent}>
            <ViewState defaultCurrentDate={currentDate} />
            <EditingState
              onCommitChanges={this.commitChanges}
              addedAppointment={addedAppointment}
              onAddedAppointmentChange={this.changeAddedAppointment}
              appointmentChanges={appointmentChanges}
              onAppointmentChangesChange={this.changeAppointmentChanges}
              editingAppointmentId={editingAppointmentId}
              onEditingAppointmentIdChange={this.changeEditingAppointmentId}
            />
            <IntegratedEditing />
            <WeekView
              startDayHour={8}
              endDayHour={22}
              excludedDays={[0, 6]}
              cellDuration={30}
              timeTableCellComponent={TimeTableCell}
              dayScaleCellComponent={DayScaleCell}
            />
            <Appointments appointmentComponent={Appointment} />
            <AppointmentTooltip showDeleteButton contentComponent={Content} />
            <AppointmentForm />
          </Scheduler>
        </Paper>
      </MuiThemeProvider>
    );
  }
}
