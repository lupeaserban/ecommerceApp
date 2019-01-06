import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    productsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading..</p>;
        const count = data.productsConnection.aggregate.count;
        const perPage = 4;
        const pages = Math.ceil(count / perPage);

        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Link
              to={{
                pathname: "/products",
                search: `?page=${props.page - 1}`
              }}
            >
              {" "}
              <p aria-disabled="true"> &#8592; PREV </p>{" "}
            </Link>
            <p>
              {props.page} of {pages}
            </p>
            <Link
              to={{
                pathname: "/products",
                search: `?page=${parseInt(props.page) + 1}`
              }}
            >
              NEXT &#8594;
            </Link>
          </div>
        );
      }}
    </Query>
  );
};

export default Pagination;
