import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

export default class Task extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          borderStyle: "solid",
          borderColor: "white",
          borderWidth: "1px",
          height: "40px",
          width: "auto",
          background: "salmon",
          textAlign: "center"
        }}
      >
        <div>
          <Checkbox color="primary" />
          <b>Task name to be handled </b>
        </div>
      </div>
    );
  }
}
