import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components

const styles = {};

function Client(props) {
  const { classes } = props;
  return <div>I am client</div>;
}

export default withStyles(styles)(Client);
