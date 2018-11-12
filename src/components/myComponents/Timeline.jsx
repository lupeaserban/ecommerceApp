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
    console.log(this.props.details);
    fetch(
      "https://im-project-manager.appspot.com/api/projects/" +
        this.props.details.id
    )
      .then(function(response) {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          apiEvents: myJson.events
        });
        console.log(myJson.events);
      });
  }

  //display the events coming from the API
  displayApiEvents = () => {
    //loop through the array and identify the type
    //based on the type render a component passing down props
    return (
      <div>
        <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
          {this.state.apiEvents.map((item, i) => {
            if (item.type === "task") {
              return (
                <li key={i}>
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
                <li key={i}>
                  {" "}
                  <Meeting name={item.title} dueDate={item.dueDate} />{" "}
                </li>
              );
            } else if (item.type === "milestone") {
              return (
                <li key={i}>
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
          {this.state.events.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  addItem = () => {
    this.setState(prevState => {
      let events = [];
      if (prevState.selectedValue === "TASK") {
        this.doPost({
          id: 1,
          type: "task",
          createdById: 1,
          dueDate: "2018-11-05",
          priority: "medium",
          title: "new task",
          pmFeedback: null,
          created_at: null,
          updated_at: null,
          projectId: this.props.details.id,
          statuses: []
        });
        events = prevState.events.concat(<Task />);
      } else if (prevState.selectedValue === "MEETING") {
        this.doPost({
          id: 2,
          type: "meeting",
          createdById: 1,
          dueDate: "2018-11-05",
          priority: "medium",
          title: "new meeting",
          pmFeedback: null,
          created_at: null,
          updated_at: null,
          projectId: this.props.details.id,
          statuses: []
        });
        events = prevState.events.concat(<Meeting />);
      } else if (prevState.selectedValue === "MILESTONE") {
        this.doPost({
          id: 3,
          type: "milestone",
          createdById: 1,
          dueDate: "2018-11-05",
          priority: "medium",
          title: "new task",
          pmFeedback: null,
          created_at: null,
          updated_at: null,
          projectId: this.props.details.id,
          statuses: []
        });
        events = prevState.events.concat(<Milestone />);
      }
      return {
        events,
        counter: prevState.counter + 1
      };
    });
  };

  doPost = event => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(event)
    };

    const request = new Request(
      "https://im-project-manager.appspot.com/api/events",
      options
    );
    const response = fetch(request);
    console.log(request);
    console.log(response);
    const status = response.status;
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
