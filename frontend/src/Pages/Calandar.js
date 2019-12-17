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
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CalendarData } from "../Pages/CalendarDatasource";
import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';
import "../Calendar.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#e86c00',
      main: '#57068c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#e86c00',
      main: '#57068c',
      contrastText: '#fff',
    },
    typography:{
      fontFamily: "Montserrat,sans-serif"
    },
    text:{
      fontFamily: "Montserrat,sans-serif"
    }
  }
  });

const Appointment = ({
  children, style, ...restProps
}) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: '#e86c00',
        borderRadius: '0',
        fontFamily: "Montserrat, sans-serif",
        width:"112px",
        overflow:"visible",
        textOverflow:"unset "
      }}
    >
      {children}
    </Appointments.Appointment>
  );

const style = ({ palette }) => ({
  icon: {
    color: palette.primary.main,
  },
  textCenter: {
    textAlign: 'center',
    fontFamily:"Montserrat, sans-serif",
  },
  todayCell: {
    borderBottom:"1px solid rgba(224, 224, 224, 1) !important",
    borderRight:"1px solid rgba(224, 224, 224, 1)",
    "&:hover":{
      backgroundColor: "rgba(137, 0, 225,0.3) !important",
    },
    "&:focus":{
      backgroundColor: "rgba(232, 108, 0,0.7) !important",
    }
  }
});

const Content = withStyles(style, { name: 'Content' })(({
  children, appointmentData, classes, ...restProps
}) => (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData} >
      <Grid container alignItems="center">
        <Grid item xs={2} className={classes.textCenter}>
          <Room className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <span>{appointmentData.location}</span>
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  ));


const TimeTableCellBase = ({ classes, ...restProps }) => {
  const { startDate } = restProps;
  return <WeekView.TimeTableCell {...restProps} className={classes.todayCell} />;
};
const TimeTableCell = withStyles(style, { name: 'TimeTableCell' })(TimeTableCellBase);

export default class Calendar extends React.PureComponent {
  list = new CalendarData();

  constructor(props) {
    super(props);
    let rows = this.list.getAll();

    this.state = {
      data: rows,
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
  componentDidMount() {
    let rows = this.list.getAll();

    this.setState({ data: rows });
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
    this.setState(state => {
      let { data } = state;
      if (added) {
        let newdata = [...data, ...added];
        const duplicatePositions = newdata.map(el => el.startDate);
        console.log("duplicatePositions= ", duplicatePositions);
        let idPositions = new Set();
        idPositions = this.filterUniqueDates(duplicatePositions);

        // let idPositions = [...new Set(duplicatePositions)];
        console.log("idPositions= ", idPositions);

        data = newdata.filter((item, pos, arr) => {
          console.log("item = ", item);
          console.log("pos = ", pos);
          console.log("arr = ", arr);
          console.log("indexOf = ", idPositions.indexOf(item.startDate));

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
            <WeekView startDayHour={8} endDayHour={22} excludedDays={[0, 6]} cellDuration={30}
              timeTableCellComponent={TimeTableCell}/>
            <Appointments
              appointmentComponent={Appointment}
            />
            <AppointmentTooltip showDeleteButton contentComponent={Content} />
            <AppointmentForm />
          </Scheduler>
        </Paper>
      </MuiThemeProvider>
    );
  }
}
