import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Timeline from "components/myComponents/Timeline.jsx";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class ProjectViewModal extends React.Component {
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
    const { classes, details } = this.props;

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          round
          onClick={this.handleOpen}
        >
          View
        </Button>
        <Modal
          style={{ paddingLeft: "40%", paddingTop: "10%" }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <b>{details[1]}</b>
            <p>Client: {details[5]}</p>
            <p>Priority: {details[8]}</p>

            <Timeline />
          </div>
        </Modal>
      </div>
    );
  }
}

ProjectViewModal.propTypes = {
  classes: PropTypes.object.isRequired,
  details: PropTypes.array
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(ProjectViewModal);

export default SimpleModalWrapped;
