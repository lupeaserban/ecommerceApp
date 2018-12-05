import React from "react";
import Active from "@material-ui/icons/CheckCircle";
import { Tooltip} from "@material-ui/core";

class User extends React.Component {
  getStatus = status => {
    return status === "true";
  };

  render() {
    const { user } = this.props.location.state;
    console.log(user); //looking for test prop sent from Users, the parent component
    return (
      <div>
        <img
          alt=""
          style={{
            width: "20%"
          }}
          src={user.image}
        />
        <div>{user.name}</div>
        <div>{user.jobTitle}</div>
        <div>{user.email}</div>
        <div>{user.telephone}</div>
        {this.getStatus() ? (
          <Tooltip title="online">
            <Active style={{ color: "green" }} />
          </Tooltip>
        ) : (
          <Tooltip title="offline">
            <Active style={{ color: "red" }} />
          </Tooltip>
        )}
      </div>
    );
  }
}

export default User
