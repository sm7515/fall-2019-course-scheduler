import React from "react";
import { render } from "react-dom";
import Paper from "@material-ui/core/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog
} from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { CalendarData } from "../Pages/CalendarDatasource";

const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

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
  commitChanges({ added, changed, deleted }) {
    this.setState(state => {
      let { data } = state;
      if (added) {
        let newdata = [...data, ...added];
        const idPositions = newdata.map(el => el.id);
        data = newdata.filter((item, pos, arr) => {
          return idPositions.indexOf(item.id) == pos;
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
      addedData.push(nextProps.addedData);

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
            <WeekView startDayHour={9} endDayHour={19} />
            <ConfirmationDialog />
            <Appointments />
            <AppointmentTooltip showOpenButton showDeleteButton />
            <AppointmentForm />
          </Scheduler>
        </Paper>
      </MuiThemeProvider>
    );
  }
}
