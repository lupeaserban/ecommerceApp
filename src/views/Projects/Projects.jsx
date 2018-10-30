import React from "react";
import PropTypes from "prop-types";
import { Link, Route, Redirect } from "react-router-dom";
import ProjectsTable from "components/myComponents/ProjectsTable";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import AddProjectModal from "components/myComponents/AddProjectModal";
import Project from "views/Projects/Project.jsx";
//core components
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Projects extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Stats</h4>
                <p className={classes.cardCategoryWhite}>Details</p>
              </CardHeader>

              <CardBody>
                <ProjectsTable
                  tableHeaderColor="primary"
                  tableHead={[
                    "ID",
                    "Denumire",
                    "RefID",
                    "Status",
                    "PM",
                    "Client",
                    "Start Date",
                    "End Date"
                  ]}
                  tableData={[
                    [
                      "1",
                      "Platforma Conta",
                      "12-AB",
                      "Pending",
                      "Tudor",
                      "Iulia",
                      "Nov 5th",
                      "Dec 20th"
                    ]
                  ]}
                />
                <div>
                  <Link to="/projects/project">
                    GO TO
                    <Route
                      exact
                      path="/projects/project"
                      render={() => (
                        <div>
                          <Project />
                          <Redirect to="/projects/project" />
                        </div>
                      )}
                    />
                  </Link>
                </div>
                <AddProjectModal />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Projects.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Projects);
