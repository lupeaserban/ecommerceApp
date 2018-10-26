import React from "react";
import PropTypes from "prop-types";
import { Link, Route } from "react-router-dom";
import Client from "views/Clients/Client.jsx";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
//core components
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const clients = [
  {
    name: "client name",
    id: "client1"
  },
  {
    name: "client name2",
    id: "client2"
  }
];

class Projects extends React.Component {
  state = {
    value: 0
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ul>
          {clients.map(({ name, id }) => (
            <li key={id}>
              <Link to={`/projects/${id}`}>{name}</Link>
            </li>
          ))}
        </ul>
        <hr />

        <Route path={`/projects/:clientsId`} component={Client} />
      </div>
    );
  }
}

Projects.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Projects);
