import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import AddProjectButton from "components/myComponents/AddProjectButton.jsx";
import FilledInput from "@material-ui/core/FilledInput";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class AddProjectModal extends React.Component {
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
    const { classes } = this.props;

    return (
      <div>
        <AddProjectButton
          color="primary"
          size="sm"
          round
          onClick={this.handleOpen}
        >
          +
        </AddProjectButton>
        <Modal
          style={{ paddingLeft: "40%", paddingTop: "10%" }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <FilledInput placeholder="Client" />
            <FilledInput placeholder="ID" />
            <FilledInput placeholder="Project Name" />
            <FilledInput placeholder="Project Manager" />
            <FilledInput placeholder="Deadline" />
            <Button variant="contained" color="primary">
              Add
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

AddProjectModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(AddProjectModal);

export default SimpleModalWrapped;
