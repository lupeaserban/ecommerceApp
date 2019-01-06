import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
    $image: String
  ) {
    deleteProduct(
      id: $id
      name: $name
      description: $description
      price: $price
      image: $image
    ) {
      id
    }
  }
`;

class DeleteProduct extends React.Component {
  deleteProduct = async (e, deleteProductFunc) => {
    e.preventDefault();
    const res = await deleteProductFunc({
      variables: {
        id: this.props.product.id,
        ...this.props
      }
    });
  };

  render() {
    return (
      <Mutation mutation={DELETE_PRODUCT_MUTATION}>
        {(deleteProduct, { loading, error }) => {
          return (
            <Button onClick={e => this.deleteProduct(e, deleteProduct)}>
              <DeleteIcon />
            </Button>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteProduct;
