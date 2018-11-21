import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

export default class Task extends React.Component {
  render() {
    return (
      <div
        style={{
          paddingLeft: "25px",
          borderStyle: "solid",
          borderWidth: "0px 0px 0px 5px",
          marginTop: "5px",
          marginBottom: "5px",
          height: "40px",
          width: "auto",
          borderColor: "#D0F0C0"
        }}
      >
        <div>
          <b>{this.props.name}</b>
          {this.props.priority}
          {this.props.dueDate}
          <Checkbox color="primary" />
        </div>
      </div>
    );
  }
}
