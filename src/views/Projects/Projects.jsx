import React from "react";
import PropTypes from "prop-types";
import ProjectViewModal from "components/myComponents/ProjectViewModal";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import AddProjectModal from "components/myComponents/AddProjectModal";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
//core components
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Projects extends React.Component {
  state = {
    data: [],
    rows: []
  };

  componentDidMount() {
    fetch("https://im-project-manager.appspot.com/api/projects")
      .then(function(response) {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          rows: myJson
        });
      });
  }

  render() {
    const { classes } = this.props;
    const tableHead = [
      "ID",
      "Project Name",
      "Status",
      "Start Date",
      "End Date",
      "PM"
    ];
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
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
                {this.state.rows.map(row => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.startDate}</TableCell>
                      <TableCell>{row.endDate}</TableCell>
                      <TableCell>{row.pm.name}</TableCell>
                      <ProjectViewModal details={row} />
                    </TableRow>
                  );
                })}
              </TableBody>
              <AddProjectModal />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

Projects.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Projects);
