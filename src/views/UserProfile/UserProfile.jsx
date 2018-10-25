import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Input from "@material-ui/core/Input";
// core components

import Button from "components/CustomButtons/Button.jsx";

const styles = {};

function UserProfile(props) {
  const { classes } = props;
  return (
    <div>
      <Input placeholder="username" required />
      <Input placeholder="password" required />
      <Button variant="contained" color="primary">
        Login
      </Button>
      <Button color="secondary" variant="contained">
        Cancel
      </Button>
    </div>
  );
}

export default withStyles(styles)(UserProfile);
