import React from "react";
import { Button } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import Add from "@material-ui/icons/Add";
import Input from "@material-ui/core/Input";
import Event from "components/myComponents/Event.jsx";
import Task from "components/myComponents/Task.jsx";
import Milestone from "components/myComponents/Milestone.jsx";

export default class Timeline extends React.Component {
  state = {
    value: "",
    items: []
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value === "task") {
      console.log("task");
    }
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

          <form onSubmit={this.handleSubmit}>
            <Input
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="add an item to this timeline"
            />
            <Button variant="raised" type="submit" color="primary">
              <Add />
            </Button>
          </form>

          <hr />
        </div>
        <div>{this.state.value === "task" ? <Task /> : <Event />}</div>
        <Event />
        <Task />
        <Event />
        <Task />
        <Task />
        <Milestone />
        <Event />
        <Task />
        <Task />
      </div>
    );
  }
}
