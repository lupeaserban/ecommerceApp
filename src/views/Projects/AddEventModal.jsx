import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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

class AddEventModal extends React.Component {
  state = {
    open: false,
    events: [],
    eventData: {
      type: "",
      title: "",
      priority: "",
      companyId: "",
      pmId: 0,
      startDate: "",
      endDate: "",
      status: "",
      clientUserId: 0,
      statuses: []
    }
  };

  componentDidMount() {}

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  doPost = () => {
    this.handleClose();
    let data = this.state.eventData;
    // console.log(data);
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
    fetch(request);
  };

  handleInputChange = e => {
    let inputData = Object.assign({}, this.state.eventData);
    inputData[e.target.name] = e.target.value;
    console.log(e);
    this.setState({ eventData: inputData }); //https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button
          variant="flat"
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
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-controlled-open-select">
                Event Type
              </InputLabel>
              <Select
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.eventData.type}
                onChange={this.handleInputChange}
                name="type"
              >
                <MenuItem value="task">Task</MenuItem>
                <MenuItem value="meeting">Meeting</MenuItem>
                <MenuItem value="milestone">Milestone</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Priority</InputLabel>
              <Select
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.eventData.priority}
                onChange={this.handleInputChange}
                name="priority"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">high</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                name="dueDate"
                onChange={this.handleInputChange}
                label="Due Date"
                type="date"
                defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                name="title"
                placeholder="Title"
                onChange={this.handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                name={"title"}
                placeholder=""
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

AddEventModal.propTypes = {
  classes: PropTypes.object
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(AddEventModal);

export default SimpleModalWrapped;
