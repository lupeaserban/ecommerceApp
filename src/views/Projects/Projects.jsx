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
                      "Dec 20th",
                      "high"
                    ],
                    [
                      "2",
                      "Platforma Dum",
                      "12-AC",
                      "Done",
                      "Tudor",
                      "Serban",
                      "June 7th",
                      "August 15th",
                      "low"
                    ],
                    [
                      "3",
                      "Platforma Mud",
                      "2-5C",
                      "Pending",
                      "Tudor",
                      "Alex",
                      "Nov 10th",
                      "December 15th",
                      "high"
                    ]
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
