import React from "react";
import PropTypes from "prop-types";
import { Link, Route } from "react-router-dom";

import Active from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import {
  IconButton,
  Card,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper,
  Tooltip
} from "@material-ui/core";
//core components
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import AddUserModal from "views/Users/AddUserModal.jsx";
import EditUserModal from "views/Users/EditUserModal.jsx";
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

  doDelete = () => {};

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const users = this.state.users;
    const { classes } = this.props;
    const tableHead = [
      "Name",
      "jobTitle",
      "Company",
      "Status",
      "Email",
      "Actions"
    ];

    return (
      <Card>
        <CardHeader>
          <Paper>
            <AddUserModal />
          </Paper>
        </CardHeader>
        <CardBody>
          <Table>
            <TableHead>
              <TableRow>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={
                        classes.tableCell + " " + classes.tableHeadCell
                      }
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
                      <IconButton>
                        <EditUserModal />
                      </IconButton>
                      <IconButton onClick={this.doDelete()}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Users);
