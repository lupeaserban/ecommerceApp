import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const DELETE_USER_MUTATION = gql`
  mutation DELETE_USER_MUTATION(
    $id: ID!
    $name: String
    $email: String
    $jobTitle: String
    $telephone: String
  ) {
    deleteUser(
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

export default class DeleteUser extends Component {
  deleteUser = async (e, deleteUserMutation) => {
      e.preventDefault();
      const res = await deleteUserMutation({
        variables: {
          id: this.props.user.id,
          ...this.props
        }
      })
    console.log(res);
  };

  render() {
    return (
      <Mutation mutation={DELETE_USER_MUTATION} variables={this.state}>
        {(deleteUser, { loading, error }) => {
          return (
                <Button onClick={ e => this.deleteUser (e, deleteUser)}>
                  <DeleteIcon />
                </Button>
             
          );
        }}
      </Mutation>
    );
  }
}
