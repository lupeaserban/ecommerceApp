import React from "react";
import PropTypes from "prop-types";
import ProjectsTable from "components/myComponents/ProjectsTable";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import AddProjectModal from "components/myComponents/AddProjectModal";
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
                    "Client",
                    "Project Name",
                    "Project Manager",
                    "Deadline"
                  ]}
                  tableData={[
                    ["12", "Niger", "Oud-Turnhout", "X", "this year"],
                    ["23", "Curaçao", "Sinaai-Waas", "Y", "this month"],
                    ["45", "Netherlands", "Baileux", "Z", "today"]
                  ]}
                />
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
