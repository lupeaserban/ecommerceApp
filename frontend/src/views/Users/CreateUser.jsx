import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import {
  Card,
  Button,
  // InputLabel,
  // Select,
  // MenuItem,
  // TextField,
  Input
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ErrorMessage from "components/ErrorMessage.jsx";

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $name: String!
    $email: String!
    $jobTitle: String!
    $telephone: String!
    $image: String
  ) {
    createUser(
      name: $name
      email: $email
      jobTitle: $jobTitle
      telephone: $telephone
      image: $image
    ) {
      id
      image
    }
  }
`;

const styles = theme => ({
  form: {
    padding: "10%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  },
  input : {
    width: "90%",
    padding: "1%"
  }
});

class CreateUser extends React.Component {
  state = {
    name: "",
    email: "",
    jobTitle: "",
    telephone: "",
    image: ""
  };

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "users_list");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/serban/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    // console.log(file);
    this.setState({
      image: file.secure_url
    });
  };

  handleInputChange = e => {
    // console.log(e.target.value)
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val }); //https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
  };

  render() {
    const { classes } = this.props;
    return (
      <Mutation mutation={CREATE_USER_MUTATION} variables={this.state}>
        {(createUser, { loading, error }) => {
          return (
            <Card>
              <form className={ classes.form }
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await createUser();
                  //refresh page
                  console.log(res);
                }}
              >
                {/* <FormControl disabled={loading} className={classes.formControl}> */}
                <ErrorMessage error={error} />
                <Input className={ classes.input }
                  required={true}
                  name="file"
                  type="file"
                  placeholder="Upload an image"
                  onChange={this.uploadFile}
                />
                <Input className={ classes.input }
                  required={true}
                  name="name"
                  type="text"
                  placeholder="User Name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />

                <Input className={ classes.input }
                  required={true}
                  name="jobTitle"
                  type="text"
                  placeholder="JobTitle"
                  value={this.state.jobTitle}
                  onChange={this.handleInputChange}
                />

                <Input className={ classes.input }
                  required={true}
                  name="telephone"
                  type="text"
                  placeholder="Telephone Number"
                  value={this.state.telephone}
                  onChange={this.handleInputChange}
                />

                <Input className={ classes.input }
                  required={true}
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
                {/* </FormControl> */}
                <Button
                  style={{ width: "20%", marginLeft: "40%", marginTop: "10%" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Card>
          );
        }}
      </Mutation>
    );
  }
}

CreateUser.propTypes = {
  classes: PropTypes.object
};
// We need an intermediary variable for handling the recursive nesting.

export default withStyles(styles)(CreateUser);
export { CREATE_USER_MUTATION };
