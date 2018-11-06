import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Modal, Button } from "@material-ui/core";

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
    open: false,
    projectData: {
      name: "",
      companyId: null,
      pmId: null,
      startDate: "",
      endDate: "",
      status: "",
      clientUserId: null
    }
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value }); //https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
    console.log(this.state);
  };

  doPost = () => {
    const data = {
      name: "Proiect 2",
      companyId: 3,
      pmId: 1,
      startDate: "2018-11-01",
      endDate: "2018-11-30",
      status: "in-progress",
      clientUserId: 2
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(data)
    };

    const request = new Request(
      "https://im-project-manager.appspot.com/api/projects",
      options
    );
    const response = fetch(request);
    const status = response.status;
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={this.handleOpen}
        >
          +
        </Button>
        <Modal
          style={{ paddingLeft: "40%", paddingTop: "10%" }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <TextField
              name="name"
              placeholder="name"
              onChange={this.handleInputChange}
            />
            <TextField
              name="companyID"
              placeholder="companyId"
              onChange={this.handleInputChange}
            />
            <TextField
              name="pmId"
              placeholder="pmId"
              onChange={this.handleInputChange}
            />
            <TextField
              name="start date"
              placeholder="start date"
              onChange={this.handleInputChange}
            />
            <TextField
              name="end date"
              placeholder="end date"
              onChange={this.handleInputChange}
            />
            <TextField
              name="status"
              placeholder="status"
              onChange={this.handleInputChange}
            />
            <TextField
              name="clientUserID"
              placeholder="clientUserID"
              onChange={this.handleInputChange}
            />
            <Button variant="contained" color="primary" onClick={this.doPost}>
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
