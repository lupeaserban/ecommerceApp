import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/Table.jsx";

import iconsStyle from "assets/jss/material-dashboard-react/views/iconsStyle.jsx";

function Organizer(props) {
  const { classes } = props;
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
                  "Deadline"
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

Organizer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(iconsStyle)(Organizer);
