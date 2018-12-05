import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";
// import Active from "@material-ui/icons/CheckCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteUser from "views/Users/DeleteUser.jsx";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Button,
 // IconButton,
  Card,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper
  // Tooltip
} from "@material-ui/core";
//core components
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
// import CreateUser from "views/Users/CreateUser.jsx";
// import UpdateUser from "views/Users/UpdateUser.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const QUERY = gql`
  query QUERY {
    users {
      name
      email
      id
      jobTitle
      telephone
      image
    }
  }
`;

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = name => {
    this.setState({ open: false });
    // this.props.history.push('/users')
    console.log(this.props);
  };

  //getStatus = status => {
  //   return status === true;
  // };

  render() {
    const { classes } = this.props;
    const tableHead = ["Name", "jobTitle", "Telephone", "Email", "Update", "Delete"];
    return (
      <Query query={QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading..</p>;
          if (error) return <p>Error: {error.message}</p>;
          console.log(data);
          return (
            <Card>
              <CardHeader>
                <Paper>
                  <Button
                    onClick={() => {
                      this.props.history.push("/createuser");
                    }}
                  >
                    New User..
                  </Button>
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
                    {data.users.map((user, id) => (
                      <TableRow key={id}>
                        <TableCell>
                          <Link
                            to={{
                              pathname: `/users/${user.name}`,
                              state: { user: user }
                            }}
                          >
                            {user.name}
                          </Link>
                        </TableCell>
                        <TableCell>{user.jobTitle}</TableCell>
                        <TableCell>{user.telephone}</TableCell>
                        {/* <TableCell>
                          {this.getStatus(user.online) ? (
                            <Tooltip title="online">
                              <Active style={{ color: "green" }} />
                            </Tooltip>
                          ) : (
                            <Tooltip title="offline">
                              <Active style={{ color: "red" }} />
                            </Tooltip>
                          )}
                        </TableCell> */}
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Link
                            to={{
                              pathname: `/updateuser/${user.id}`,
                              state: { id: user.id }
                            }}
                          ><Button>
                            <EditIcon />
                            </Button>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <DeleteUser user={user}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          );
        }}
      </Query>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Users);
