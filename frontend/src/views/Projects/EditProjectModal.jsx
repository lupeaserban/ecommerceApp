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

import Edit from "@material-ui/icons/Edit";

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

class SimpleModal extends React.Component {
  state = {
    open: false,
    companies: [],
    projectData: {
      id: this.props.project.id,
      name: "" || this.props.project.name,
      companyId: "" || this.props.project.companyId,
      pmId: 0,
      startDate: "" || this.props.project.startDate,
      endDate: "" || this.props.project.endDate,
      status: "" || this.props.project.status,
      clientUserId: 0 || this.props.project.clientUserId
    }
  };

  handleInputChange = e => {
    let inputData = Object.assign({}, this.state.projectData);
    inputData[e.target.name] = e.target.value;
    this.setState({ projectData: inputData }); //https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
  };

  doPost = () => {
    this.handleClose();
    let data = this.state.projectData;
    console.log(data);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method: "PUT",
      headers,
      body: JSON.stringify(data)
    };

    const request = new Request(
      "https://im-project-manager.appspot.com/api/projects/" +
        this.props.project.id,
      options
    );
    const response = fetch(request);
    console.log(response);
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

  render() {
    const { classes, project } = this.props;
    console.log(this.props.project.id);
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
                placeholder={project.name}
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
                value={project.pmId}
                onChange={this.handleInputChange}
                name="pmId"
              >
                <MenuItem value={1}>Tudor</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Status</InputLabel>
              <Select
                value={this.state.projectData.status}
                onChange={this.handleInputChange}
                name="status"
              >
                <MenuItem value={"in-progress"}>in-progress</MenuItem>
                <MenuItem value={"pending"}>pending</MenuItem>
                <MenuItem value={"done"}>done</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Client</InputLabel>
              <Select
                value={project.clientUserId}
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
                defaultValue={project.startDate}
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
                defaultValue={project.endDate}
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
const EditProjectModal = withStyles(styles)(SimpleModal);

export default EditProjectModal;
