import React from "react";
import SignUp from "./SignUp.jsx";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
// core components
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

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

class Login extends React.Component {
  goHome = () => {
    this.props.history.push("/account");
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <OutlinedInput className={classes.input} placeholder="email" required labelWidth={2}/>
        <OutlinedInput
          labelWidth={2}
          className={classes.input}
          placeholder="password"
          required
        />

        <Button>Login</Button>
        <SignUp />
        <Button onClick={this.goHome}>SKIP</Button>
      </Card>
    );
  }
}

export default withStyles(styles)(Login);
