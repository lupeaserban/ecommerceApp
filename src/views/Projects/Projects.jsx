import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
//core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Projects extends React.Component {
  state = {
    value: 0
  };

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
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    "ID",
                    "Client",
                    "Project Name",
                    "Project Manager",
                    "Deadline",
                    "Organizer"
                  ]}
                  tableData={[
                    ["12", "Niger", "Oud-Turnhout", "X", "this year"],
                    ["23", "Curaçao", "Sinaai-Waas", "Y", "this month"],
                    ["45", "Netherlands", "Baileux", "Z", "today"]
                  ]}
                />
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
