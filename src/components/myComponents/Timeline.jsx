import React from "react";
import { Button } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import Event from "components/myComponents/Event.jsx";
import Task from "components/myComponents/Task.jsx";
import Milestone from "components/myComponents/Milestone.jsx";

export default class Timeline extends React.Component {
  state = {
    //arrayul de events se va tine in state
    item: "",
    counter: 0
  };

  //separa functiile pentru ca fiecare functie sa faca doar un lucru
  displayItem = () => {
    let items = [];
    for (let i = 0; i < this.state.counter; i++) {
      if (this.state.item === "task") {
        items.push(
          <div key={i}>
            <Task />
          </div>
        );
      } else {
        items.push(
          <div key={i}>
            <Event />
          </div>
        );
      }
    }
    return items || null;
  };

  // sa fie doar o functie care adauga un event (task, meeting sau milestone)
  addTask = () => {
    this.setState(prevState => {
      return {
        item: "task",
        counter: prevState.counter + 1
      };
    });
  };

  addEvent = () => {
    this.setState(prevState => {
      return {
        item: "event",
        counter: prevState.counter + 1
      };
    });
  };

  addMilestone = () => {
    this.setState(prevState => {
      return {
        item: "milestone",
        counter: prevState.counter + 1
      };
    });
  };

  //adauga un modal de unde sa selectezi ce fel de event vrei adaugi
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
          <Button onClick={this.addTask} variant="raised">
            <Add />
          </Button>
          <Button onClick={this.addEvent} variant="raised">
            <Add />
          </Button>
          <Button onClick={this.addMilestone} variant="raised">
            <Add />
          </Button>
          <hr />
        </div>
        <div>{this.displayItem()}</div>
      </div>
    );
  }
}
