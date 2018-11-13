import React from "react";
// @material-ui/core components
import Active from "@material-ui/icons/CheckCircle";

const style = {
  img: {
    width: "20%"
  }
};

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: []
    };
  }

  getAccount = () => {
    return fetch("https://im-project-manager.appspot.com/api/users", {
      cors: "no-cors"
    })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          account: myJson[1]
        });
        console.log(this.state.account);
      });
  };

  componentDidMount() {
    this.getAccount();
  }

  getStatus = () => {
    return this.state.account.status === "active";
  };

  render() {
    const { classes } = this.props;
    const { name, email, photo, jobTitle, telephone } = this.state.account;
    return (
      <div>
        <img
          style={{
            width: "20%"
          }}
          src={photo}
        />
        <div>{name}</div>
        <div>{jobTitle}</div>
        <div>{email}</div>
        <div>{telephone}</div>
        <div>
          {this.getStatus() ? <Active style={{ color: "green" }} /> : <div />}`
        </div>
      </div>
    );
  }
}
