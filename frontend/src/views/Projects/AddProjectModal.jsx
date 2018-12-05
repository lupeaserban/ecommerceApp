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
  MenuList,
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
    justifyContent: "space-around",

    width: "75%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  }
});

class AddProjectModal extends React.Component {
  state = {
    open: false,
    companies: [],
    projectData: {
      name: "",
      companyId: "",
      pmId: 0,
      startDate: "",
      endDate: "",
      status: "",
      clientUserId: 0
    }
  };

  getCompanies = () => {
    fetch("https://im-project-manager.appspot.com/api/companies", {
      cors: "no-cors"
    })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          companies: myJson
        });
        // console.log(this.state.companies);
      });
  };

  componentDidMount() {
    this.getCompanies();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  doPost = () => {
    this.handleClose();
    let data = this.state.projectData;
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
    let inputData = Object.assign({}, this.state.projectData);
    inputData[e.target.name] = e.target.value;
    this.setState({ projectData: inputData }); //https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
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
          New Project..
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
              <TextField
                name="name"
                placeholder="Project Name"
                onChange={this.handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Company</InputLabel>
              <Select
                value={this.state.projectData.companyId}
                onChange={this.handleInputChange}
                name="companyId"
              >
                {this.state.companies.map((company, i) => {
                  return (
                    <MenuList key={i} value={company.id}>
                      <MenuItem>{company.name}</MenuItem>
                    </MenuList>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>PM</InputLabel>
              <Select
                value={this.state.projectData.pmId}
                onChange={this.handleInputChange}
                name="pmId"
              >
                <MenuItem value={1}>Tudor</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Status</InputLabel>
              <Select onChange={this.handleInputChange} name="status">
                <MenuItem value={"in-progress"}>in-progress</MenuItem>
                <MenuItem value={"pending"}>pending</MenuItem>
                <MenuItem value={"done"}>done</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Client</InputLabel>
              <Select
                value={this.state.projectData.clientUserId}
                onChange={this.handleInputChange}
                name="clientUserId"
              >
                <MenuItem value={1}>Client 1</MenuItem>
                <MenuItem value={2}>Client 2</MenuItem>
                <MenuItem value={3}>Client 3</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <TextField
                name="startDate"
                onChange={this.handleInputChange}
                label="Start Date"
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
                margin="normal"
                name="endDate"
                onChange={this.handleInputChange}
                label="End Date"
                type="date"
                defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
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

AddProjectModal.propTypes = {
  classes: PropTypes.object
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(AddProjectModal);

export default SimpleModalWrapped;
