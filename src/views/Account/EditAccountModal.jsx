import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Tooltip,
  FormControl,
  Modal,
  Button,
  TextField
} from "@material-ui/core";

import Edit from "@material-ui/icons/Edit";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "40%"
  },
  paper: {
    padding: "2%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginLeft: "25%",
    marginTop: "10%",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  }
});

class SimpleModal extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, accountInfo } = this.props;
    console.log(this.props.accountInfo);
    return (
      <div>
        <Tooltip title="edit" placement="right">
          <Edit onClick={this.handleOpen} color="primary" />
        </Tooltip>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <FormControl className={classes.formControl}>
              <TextField
                name="name"
                placeholder={accountInfo.name}
                onChange={this.handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                name="name"
                placeholder={accountInfo.email}
                onChange={this.handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                name="name"
                placeholder={accountInfo.telephone}
                onChange={this.handleInputChange}
              />
            </FormControl>
            <Button
              style={{ width: "20%", marginLeft: "40%" }}
              variant="contained"
              color="primary"
              onClick={this.doPost}
            >
              EDIT
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const EditAccountModal = withStyles(styles)(SimpleModal);

export default EditAccountModal;
