import React from "react";
import { render } from "react-dom";
import Paper from "@material-ui/core/Paper";
import { ViewState, EditingState,IntegratedEditing} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments
} from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { appointments } from "../data/data";

const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

export default class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      classes: props.classes
    };
    this.onCommitChanges=this.onCommitChanges.bind(this);
  }

  onCommitChanges({added,changed,deleted}){
    this.setState((state)=>{
      let {data}=state;
      if(added){
        
      }
    })
  }
  
  render() {
    const { data, classes } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <Paper classes={{classes}}>
          <Scheduler data={data}>
            <ViewState currentDate="2018-06-28" />
            <EditingState onCommitChanges={this.onCommitChanges}/>
            <IntegratedEditing />
            <WeekView startDayHour={9} endDayHour={19} />
            <Appointments />
          </Scheduler>
        </Paper>
      </MuiThemeProvider>
    );
  }
}
