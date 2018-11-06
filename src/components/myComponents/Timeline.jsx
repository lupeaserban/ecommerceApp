import React from "react";
import { Button } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import Meeting from "components/myComponents/Meeting.jsx";
import Task from "components/myComponents/Task.jsx";
import SimpleDialog from "components/myComponents/Dialog.jsx";
import Milestone from "components/myComponents/Milestone.jsx";

const eventType = ["TASK", "MEETING", "MILESTONE"];

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedValue: "",
      events: [],
      apiEvents: []
    };
  }

  componentDidMount() {
    fetch("https://im-project-manager.appspot.com/api/projects")
      .then(function(response) {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          apiEvents: myJson[0].events
        });
      });
  }

  //display the events coming from the API

  displayApiEvents = () => {
    //loop through the array and identify the type
    //based on the type render a component passing down props
    return (
      <div>
        <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
          {this.state.apiEvents.map(item => {
            if (item.type === "task") {
              return (
                <li key={item}>
                  {" "}
                  <Task
                    name={item.title}
                    priority={item.priority}
                    dueDate={item.dueDate}
                  />
                </li>
              );
            } else if (item.type === "meeting") {
              return (
                <li key={item}>
                  {" "}
                  <Meeting name={item.title} dueDate={item.dueDate} />{" "}
                </li>
              );
            } else if (item.type === "milestone") {
              return (
                <li key={item}>
                  {" "}
                  <Milestone name={item.title} dueDate={item.dueDate} />{" "}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    );
  };

  //handle adding new events
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
    this.addItem();
  };

  //separa functiile pentru ca fiecare functie sa faca doar un lucru
  displayEvent = () => {
    return (
      <div>
        <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
          {this.state.events.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  // sa fie doar o functie care adauga un event (task, meeting sau milestone)
  addItem = () => {
    this.setState(prevState => {
      let events = [];
      if (prevState.selectedValue === "TASK") {
        events = prevState.events.concat(<Task />);
      } else if (prevState.selectedValue === "MEETING") {
        events = prevState.events.concat(<Meeting />);
      } else if (prevState.selectedValue === "MILESTONE") {
        events = prevState.events.concat(<Milestone />);
      }
      return {
        events,
        counter: prevState.counter + 1
      };
    });
  };

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <b>Timeline</b>
          <hr />

          <hr />
          <Button onClick={this.handleClickOpen}>
            <Add />
          </Button>
          <SimpleDialog
            events={eventType}
            selectedValue={this.state.selectedValue}
            open={this.state.open}
            onClose={this.handleClose}
          />
        </div>
        <div>{this.displayEvent()}</div>
        <div>{this.displayApiEvents()}</div>
      </div>
    );
  }
}
