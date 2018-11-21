import React from "react";
import PropTypes from "prop-types";
import { Link, Route } from "react-router-dom";

import Active from "@material-ui/icons/CheckCircle";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper,
  Tooltip
} from "@material-ui/core";
//core components
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Client from "./Client";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  getUsers = () => {
    fetch("https://im-project-manager.appspot.com/api/users", {
      cors: "no-cors"
    })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          users: myJson
        });
      });
  };

  getStatus = status => {
    return status === "active";
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const users = this.state.users;
    const { classes } = this.props;
    const tableHead = ["Name", "jobTitle", "Company", "Status", "Email"];

    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>
                    <Link to={`/Users/${user.id}`}>{user.name}</Link>
                    <Route
                      path={`/Users/${user.id}`}
                      render={props => <Client {...props} test={"hi"} />}
                    />
                  </TableCell>
                  <TableCell>{user.jobTitle}</TableCell>
                  <TableCell>{user.company.name}</TableCell>
                  <TableCell>
                    {this.getStatus(user.status) ? (
                      <Tooltip title="online" placement="right">
                        <Active style={{ color: "green" }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="offline" placement="right">
                        <Active style={{ color: "red" }} />
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>

                  <TableCell>
                    {/* <IconButton
                        value={row}
                      >
                     Add IConbutton
                      </IconButton> */}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Users);
