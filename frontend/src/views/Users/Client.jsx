import React from "react";
import Active from "@material-ui/icons/CheckCircle";
import { Tooltip } from "@material-ui/core";

export default class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: [],
      client: []
    };
  }

  getClient = id => {
    fetch("https://im-project-manager.appspot.com/api/users/" + id, {
      cors: "no-cors"
    })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          client: myJson,
          company: myJson.company
        });
      });
  };

  getStatus = () => {
    return this.state.client.status === "active";
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.getClient(id);
  }

  render() {
    const { name, email, photo, jobTitle, telephone } = this.state.client; //looking for test prop sent from Users, the parent component
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
        <div>{this.state.company.name}</div>
        <div>{jobTitle}</div>
        <div>{email}</div>
        <div>{telephone}</div>
        {this.getStatus() ? (
          <Tooltip title="online">
            <Active style={{ color: "green" }} />
          </Tooltip>
        ) : (
          <Tooltip title="offline">
            <Active style={{ color: "green" }} />
          </Tooltip>
        )}
      </div>
    );
  }
}
