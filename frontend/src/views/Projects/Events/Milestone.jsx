import React from "react";
import { Grid } from "@material-ui/core";

export default class Milestone extends React.Component {
  render() {
    return (
      <Grid
        container
        style={{
          marginTop: "5px",
          marginBottom: "5px",
          backgroundColor: "#F8DE7E"
        }}
      >
        {" "}
        <b style={{ textAlign: "center" }}>
          MILESTONE {this.props.name} WAS REACHED ON {this.props.dueDate}{" "}
        </b>
      </Grid>
    );
  }
}
