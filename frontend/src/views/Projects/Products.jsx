import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import queryString from "query-string";
import Pagination from "components/Pagination.jsx";

import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddCart from "@material-ui/icons/AddShoppingCart";
import Launch from "@material-ui/icons/Launch";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const QUERY = gql`
  query QUERY($skip: Int = 0, $first: Int = 4, $orderBy: ProductOrderByInput) {
    products(skip: $skip, first: $first, orderBy: $orderBy) {
      id
      name
      price
      description
      image
    }
  }
`;

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    const { classes } = this.props;
    const params = queryString.parse(this.props.location.search);
    return (
      <div>
        <Pagination page={params.page || 1} />
        <Query
          query={QUERY}
          fetchPolicy="network-only" //  refetching the query after adding a product !!!TODO: create product
          variables={{
            skip: params.page * 4 - 4,
            first: 4
          }}
        >
          {({ data, error, loading, refetch, variables }) => {
            if (loading) return <p>Loading..</p>;
            if (error) return <p>Error: {error.message}</p>;
            console.log(refetch);
            return (
              <div className={classes.root}>
                <Button
                  onClick={() => {
                    refetch({ orderBy: "price_ASC" });
                    console.log(data);
                  }}
                >
                  SORT BY PRICE
                </Button>
                <Button
                  onClick={() => {
                    refetch({ orderBy: "name_ASC" });
                    console.log(data);
                  }}
                >
                  SORT BY NAME
                </Button>
                <Button
                  onClick={() => {
                    this.props.history.push("/createproduct");
                  }}
                >
                  NEW PRODUCT
                </Button>
                <GridList cellHeight={180} className={classes.gridList}>
                  {data.products.map(product => (
                    <GridListTile key={product.id}>
                      <img src={product.image} alt="" />
                      <GridListTileBar
                        title={product.name}
                        subtitle={<span> {product.price} $ </span>}
                        actionIcon={
                          <div>
                            <IconButton className={classes.icon}>
                              <Tooltip title="Add to cart">
                                <AddCart />
                              </Tooltip>
                            </IconButton>
                            <Link
                              to={{
                                pathname: `/products/${product.id}`,
                                state: { product: product }
                              }}
                            >
                              <IconButton className={classes.icon}>
                                <Tooltip title="View details">
                                  <Launch />
                                </Tooltip>
                              </IconButton>
                            </Link>
                          </div>
                        }
                      />
                    </GridListTile>
                  ))}
                </GridList>
              </div>
            );
          }}
        </Query>
        <Pagination page={params.page || 1} />
      </div>
    );
  }
}

Products.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Products);
