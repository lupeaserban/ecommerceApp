import React from "react";
import PropTypes from "prop-types";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  Button,
  // InputLabel,
  // Select,
  // MenuItem,
  // TextField,
  Input
} from "@material-ui/core";
import ErrorMessage from "components/ErrorMessage.jsx";

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
    $image: String
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      price: $price
      image: $image
    ) {
      id
      name
      description
      price
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
  input: {
    width: "90%",
    padding: "1%"
  }
});

class UpdateProduct extends React.Component {
  state = {
    id: this.props.location.state.product.id,
    name: "",
    description: "",
    price: "",
    image: ""
  };

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "products");
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

  updateProduct = async (e, updateProductFunc) => {
    e.preventDefault();
    console.log(this.props.location.state.id);
    const res = await updateProductFunc({
      variables: {
        ...this.state
      }
    });
    console.log(res);
  };

  render() {
    const { classes } = this.props;
    return (
      <Mutation mutation={UPDATE_PRODUCT_MUTATION} variables={this.state}>
        {(updateProduct, { loading, error }) => {
          return (
            <Card>
              <form
                className={classes.form}
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await updateProduct();
                //   refresh page
                  console.log(res);
                  this.props.history.push({
                    pathname: `/products/${res.data.updateProduct.id}`,
                    state: { product: res.data.updateProduct }
                  });
                }}
              >
                {/* <FormControl disabled={loading} className={classes.formControl}> */}
                <ErrorMessage error={error} />
                <Input
                  className={classes.input}
                  required={true}
                  name="file"
                  type="file"
                  placeholder="Upload an image"
                  onChange={this.uploadFile}
                />
                <Input
                  className={classes.input}
                  required={true}
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />

                <Input
                  className={classes.input}
                  required={true}
                  name="description"
                  type="text"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                />

                <Input
                  className={classes.input}
                  required={true}
                  name="price"
                  type="text"
                  placeholder="Price"
                  value={this.state.price}
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

export default withStyles(styles)(UpdateProduct);
