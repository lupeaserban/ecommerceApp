import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components

const styles = {};

function Project() {
  return <div>I am Project</div>;
}

// Project.propTypes = {
//   id: PropTypes.string.isRequired
// };

export default withRouter(Project);
