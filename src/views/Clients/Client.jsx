import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components

const styles = {};

class Client extends React.Component {
  render() {
    console.log(this.props);
    return <div>i am {this.props.match.params.name}</div>;
  }
}

export default withStyles(styles)(Client);
