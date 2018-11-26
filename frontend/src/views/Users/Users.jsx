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
  Tooltip,
  Tab
} from "@material-ui/core";
//core components
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import AddUserModal from "views/Users/AddUserModal.jsx";
import EditUserModal from "views/Users/EditUserModal.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Client from "./Client";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const QUERY = gql`
  query QUERY {
    users {
      name
      email
      id
    }
  }
`;


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
            <Query query={QUERY}>
              {({data, error, loading}) => {
                 console.log(data)
                if(loading) return <p>Loading..</p>
                if(error) return <p>Error: {error.message}</p>
                return (
                  <TableBody>
                  {data.users.map(user => 
                    <TableRow key={user.id}> 
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.jobTitle}</TableCell>
                        <TableCell>{user.email}</TableCell>
            
                    </TableRow> 
                    )}
                </TableBody>
                )}}
           </Query>
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
