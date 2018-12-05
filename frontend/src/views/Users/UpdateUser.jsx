// see if form works without modal or how to eliminate this.state.open !!

import React from "react";
import PropTypes from "prop-types";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import {
  //FormControl,
  Button,
  // InputLabel,
  // Select,
  // MenuItem,
  // TextField,
  Input
} from "@material-ui/core";

import ErrorMessage from "components/ErrorMessage.jsx";

//Re-render after project is added or deleted

const SINGLE_USER_QUERY = gql`
  query SINGLE_USER_QUERY($id: ID!) {
    user(where: { id: $id }) {
      name
      email
      jobTitle
      telephone
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: ID!
    $name: String
    $email: String
    $jobTitle: String
    $telephone: String
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      jobTitle: $jobTitle
      telephone: $telephone
    ) {
      id 
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

class UpdateUser extends React.Component {
  state = {};

  handleInputChange = e => {
    // console.log(e.target.value)
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val }); //https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
  };

  updateUser = async (e, updateUserMutation) => {
    e.preventDefault();
    console.log(this.props.location.state.id)
    const res = await updateUserMutation({
      variables: {
        id: this.props.location.state.id,
        ...this.state
      }
    })
    console.log(res);
  }

  render() {
    const { classes } = this.props;
    const id = this.props.location.state;
    console.log(id);

    return (
      <Query
        query={SINGLE_USER_QUERY}
        variables={{ id: this.props.location.state.id }}
      >
        {({data, loading}) => {
          if(loading) return <p>Loading..</p>
          if(!data.user) return <p>No user found</p>
          // console.log(payload)
          return (
            <Mutation mutation={UPDATE_USER_MUTATION} variables={this.state}>
              {(updateUser, { loading, error }) => {
                return (
                  <div className={classes.paper}>
                    <form className={classes.form}
                      onSubmit={e => this.updateUser(e, updateUser)}
                    >
                      {/* <FormControl disabled={loading} className={classes.formControl}> */}
                      <ErrorMessage error={error} />
                      <Input className={ classes.input }
                        required={true}
                        name="name"
                        type="text"
                        placeholder="User Name"
                        defaultValue={data.user.name}
                        onChange={this.handleInputChange}
                      />

                      <Input className={ classes.input }
                        required={true}
                        name="jobTitle"
                        type="text"
                        placeholder="JobTitle"
                        defaultValue={data.user.jobTitle}
                        onChange={this.handleInputChange}
                      />

                      <Input className={ classes.input }
                        required={true}
                        name="telephone"
                        type="text"
                        placeholder="Telephone Number"
                        defaultValue={data.user.telephone}
                        onChange={this.handleInputChange}
                      />

                      <Input className={ classes.input }
                        required={true}
                        name="email"
                        type="text"
                        placeholder="Email"
                        defaultValue={data.user.email}
                        onChange={this.handleInputChange}
                      />
                      {/* </FormControl> */}

                      <Button
                        style={{ width: "20%", marginLeft: "40%", marginTop: "10%" }}
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Save Changes
                      </Button>
                    </form>
                  </div>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

UpdateUser.propTypes = {
  classes: PropTypes.object
};

// We need an intermediary variable for handling the recursive nesting.

export default withStyles(styles)(UpdateUser);
export { UPDATE_USER_MUTATION };
