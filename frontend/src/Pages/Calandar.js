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

const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

export default class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      classes: props.classes,
      currentDate: new Date(),
      appointmentChanges: {},
      editingAppointmentId: undefined
    };
    this.commitChanges = this.commitChanges.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointmentId = this.changeEditingAppointmentId.bind(
      this
    );
  }

  commitChanges({ added, changed, deleted }) {
    console.log("added, changed, deleted", added, changed, deleted);
    this.setState(state => {
      let { data } = state;
      console.log("data in state", data);
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
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
  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointmentId(editingAppointmentId) {
    this.setState({ editingAppointmentId });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }
  render() {
    const {
      currentDate,
      data,
      classes,
      appointmentChanges,
      editingAppointmentId
    } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <Paper classes={{ classes }}>
          <Scheduler data={data} onAppointmentClick={this.handleEvent}>
            <ViewState defaultCurrentDate={currentDate} />
            <EditingState onCommitChanges={this.commitChanges} />
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
