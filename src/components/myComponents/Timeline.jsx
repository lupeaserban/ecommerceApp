import React from "react";
import { Button } from "@material-ui/core";
import Event from "components/myComponents/Event.jsx";
import Task from "components/myComponents/Task.jsx";

export default class Timeline extends React.Component {
  addTask = () => {};

  addMilestone = () => {};

  addEvents = () => {};

  render() {
    return (
      <div>
        <b>Timeline</b>
        <hr />
        <Button>Add Task</Button>
        <Button>Add Milestone</Button>
        <Button>Add Event</Button>

        <div
          style={{
            height: "50px",
            width: "auto",
            background: "#F8DE7E"
          }}
        >
          Milestone
          <Button variant="text" size="small">
            EDIT
          </Button>
          <Button variant="text" size="small">
            DELETE
          </Button>
        </div>
        <Event />
        <Task />
      </div>
    );
  }
}
