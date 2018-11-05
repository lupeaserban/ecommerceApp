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
      <th>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={this.handleOpen}
        >
          View
        </Button>
        <Modal
          style={{ paddingLeft: "40%", paddingTop: "5%", overflow: "scroll" }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <b>{details.name}</b>
            <p>PM: {details.pm.name}</p>
            <p>{details.status}</p>
            <Timeline />
          </div>
        </Modal>
      </th>
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
