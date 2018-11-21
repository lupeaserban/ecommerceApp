import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export default class Meeting extends React.Component {
  render() {
    return (
      <Grid
        container
        style={{
          paddingLeft: "25px",
          borderStyle: "solid",
          borderWidth: "0px 0px 0px 5px",
          marginTop: "5px",
          marginBottom: "5px",
          borderColor: "salmon"
        }}
      >
        <Grid item xs={12}>
          {this.props.name}
        </Grid>
        <Grid item xs={12}>
          {this.props.dueDate}
        </Grid>
        <IconButton variant="text" size="medium">
          <Edit />
        </IconButton>
        <IconButton variant="text" size="small">
          <DeleteIcon />
        </IconButton>
      </Grid>
    );
  }
}
