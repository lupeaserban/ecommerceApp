import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components

const styles = {};

function Client(props) {
  return <div>I am {props.id}</div>;
}

Client.propTypes = {
  id: PropTypes.string.isRequired
};

export default withStyles(styles)(Client);
