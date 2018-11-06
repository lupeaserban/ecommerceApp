import React from "react";

export default class Milestone extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderStyle: "solid",
          borderColor: "white",
          borderWidth: "1px",
          height: "50px",
          width: "auto",
          background: "#F8DE7E"
        }}
      >
        <b>MILESTONE X REACHED! </b>
        {this.props.name}
        {this.props.dueDate}
      </div>
    );
  }
}
