import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Edit from "@material-ui/icons/Edit";
import {
  FormControl,
  Modal,
  Button,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from "@material-ui/core";

//Re-render after project is added or deleted

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "80%"
  },
  paper: {
    padding: "2%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",

    width: "75%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  }
});

class EditUserModal extends React.Component {
  state = {
    open: false
  };

  componentDidMount() {}

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  doPost = () => {};

  handleInputChange = e => {
    //https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Edit onClick={this.handleOpen} color="primary" />

        <Modal
          style={{ paddingLeft: "40%", paddingTop: "10%" }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <FormControl className={classes.formControl}>
              <TextField
                name="name"
                placeholder="User Name"
                onChange={this.handleInputChange}
              />
            </FormControl>
            <FormControl>
              <TextField
                name="name"
                placeholder="Title"
                onChange={this.handleInputChange}
              />
            </FormControl>
            <FormControl>
              <TextField
                name="name"
                placeholder="Telephone"
                onChange={this.handleInputChange}
              />
            </FormControl>
            <FormControl>
              <TextField
                name="name"
                placeholder="Email"
                onChange={this.handleInputChange}
              />
            </FormControl>

            <Button
              style={{ width: "20%", marginLeft: "40%" }}
              variant="contained"
              color="primary"
              onClick={this.doPost}
            >
              CREATE
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

EditUserModal.propTypes = {
  classes: PropTypes.object
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(EditUserModal);

export default SimpleModalWrapped;
