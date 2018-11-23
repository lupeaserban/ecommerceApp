import React from "react";
// @material-ui/core components
import EditAccountModal from "views/Account/EditAccountModal.jsx";
import Active from "@material-ui/icons/CheckCircle";
import { Tooltip } from "@material-ui/core";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      account: {}
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
          account: myJson[1] // show account of the person whos logged in
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

  openEditModal = () => {
    this.setState({ open: true });
  };

  render() {
    const { name, email, photo, jobTitle, telephone } = this.state.account;
    return (
      <div>
        <img
          alt=""
          style={{
            width: "20%"
          }}
          src={photo}
        />

        <div>{name}</div>

        <div>{jobTitle}</div>
        <div>{email}</div>
        <div>{telephone}</div>
        {this.getStatus() ? (
          <Tooltip title="online" placement="right">
            <Active style={{ color: "green" }} />
          </Tooltip>
        ) : (
          <Tooltip title="offline" placement="right">
            <Active style={{ color: "green" }} />
          </Tooltip>
        )}
        <EditAccountModal accountInfo={this.state.account} />
      </div>
    );
  }
}

export default Account;
