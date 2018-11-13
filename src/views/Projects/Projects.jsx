import React from "react";
import PropTypes from "prop-types";
import ProjectViewModal from "components/myComponents/ProjectViewModal";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import AddProjectModal from "components/myComponents/AddProjectModal";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
//core components
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { IconButton, Table } from "@material-ui/core";
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
      ""
    ];
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "75%" }}
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableCell>
              <AddProjectModal />
            </TableCell>
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
                    <ProjectViewModal details={row} />
                  </TableCell>

                  <TableCell>
                    <IconButton value={row} onClick={() => this.doDelete(row)}>
                      <DeleteIcon />
                    </IconButton>
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

Projects.propTypes = {
  classes: PropTypes.object.isRequired
};

const ProjectsPage = withStyles(dashboardStyle)(Projects);
export default ProjectsPage;
