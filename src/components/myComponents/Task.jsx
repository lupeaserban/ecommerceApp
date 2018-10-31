import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

export default class Task extends React.Component {
  render() {
    return (
      <div
        style={{
          borderStyle: "solid",
          borderColor: "white",
          borderWidth: "1px",
          display: "flex",
          height: "40px",
          width: "auto",
          background: "indianred",
          textAlign: "center"
        }}
      >
        <div>
          <b>Task </b>
          <Checkbox />
        </div>
      </div>
    );
  }
}
