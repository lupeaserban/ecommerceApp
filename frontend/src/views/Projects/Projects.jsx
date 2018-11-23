import React from "react";
import { Link, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Project from "views/Projects/Project.jsx";
import EditProjectModal from "views/Projects/EditProjectModal";
import AddProjectModal from "views/Projects/AddProjectModal";
// @material-ui/core

import withStyles from "@material-ui/core/styles/withStyles";

import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
//core components
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { IconButton, Table, Card } from "@material-ui/core";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import DeleteIcon from "@material-ui/icons/Delete";

//TODO! set up routing to open a new screen for each project, not a modal

class Projects extends React.Component {
  state = {
    rows: []
  };

  componentDidMount() {
    fetch("https://im-project-manager.appspot.com/api/projects", {
      cors: "no-cors"
    })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          rows: myJson
        });
      });
  }

  doDelete = row => {
    return fetch(
      "https://im-project-manager.appspot.com/api/projects/" + row.id,
      {
        method: "delete"
      }
    ).then(response => response.json());
  };

  // update state and post new state, or do a delete request?

  render() {
    const { classes } = this.props;
    const tableHead = [
      "Name",
      "Status",
      "Start Date",
      "End Date",
      "PM",
      "Events",
      "Actions"
    ];
    // console.log(this.state.rows);
    return (
      <Card>
        <CardHeader>
          <Paper>
            <AddProjectModal />
          </Paper>
        </CardHeader>
        <CardBody>
          <Table>
            <TableHead>
              <TableRow>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      style={{
                        backgroundColor: "info",
                        fontWeight: "bold",
                        fontSize: "75%"
                      }}
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
              {this.state.rows.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.startDate}</TableCell>
                    <TableCell>{row.endDate}</TableCell>
                    <TableCell>{row.pm ? row.pm.name : null}</TableCell>
                    <TableCell>
                      <Link to={`/projects/${row.id}`}>
                        <Button variant="contained" color="primary">
                          View
                        </Button>
                      </Link>
                      <Route
                        path={"/projects/:id"}
                        render={props => <Project {...props} test={"hi"} />}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <EditProjectModal project={row} />
                      </IconButton>
                      <IconButton
                        value={row}
                        onClick={() => this.doDelete(row)}
                      >
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

Projects.propTypes = {
  classes: PropTypes.object.isRequired
};

const ProjectsPage = withStyles(dashboardStyle)(Projects);
export default ProjectsPage;
