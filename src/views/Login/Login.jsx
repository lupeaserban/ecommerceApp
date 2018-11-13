import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
// core components
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { Link, Route } from "react-router-dom";
import Account from "views/Account/Account.jsx";

const styles = {
  card: {
    marginLeft: "25%",
    width: "50%",
    paddingTop: "2%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "2%"
  },
  buttons: {
    margin: "0.5%",
    width: "20%"
  },
  input: {
    marginBottom: "2%",
    width: "40%"
  }
};

function Login(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <OutlinedInput className={classes.input} placeholder="email" required />
      <OutlinedInput
        className={classes.input}
        placeholder="password"
        required
      />

      <Button className={classes.buttons} variant="contained" color="primary">
        Login
        <Link to={"/account"} />
        <Route path={"/account"} component={Account} />
      </Button>

      <Button className={classes.buttons} color="primary" variant="contained">
        Sign Up
      </Button>

      <Button className={classes.buttons} color="primary" variant="contained">
        SKIP
      </Button>
    </Card>
  );
}

export default withStyles(styles)(Login);
