import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddCart from "@material-ui/icons/AddShoppingCart";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";

import DeleteProduct from "views/Projects/DeleteProduct.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const styles = () => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 640
  }
});

class Product extends React.Component {
  render() {
    const { product } = this.props.location.state;
    const { classes } = this.props;
    console.log(product);
    return (
      <Card className={classes.card}>
        <Button
          onClick={() => {
            this.props.history.push("/products");
          }}
        >
          Back
        </Button>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            src={product.image}
            image={product.image}
            title="Image"
          />
          <CardContent>
            <Typography gutterBottom variant="display1" component="h2">
              {product.name}
            </Typography>
            <Typography gutterBottom variant="subheading" component="h2">
              {product.price} $
            </Typography>
            <Typography component="p">{product.description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton className={classes.icon}>
            <Tooltip title="Add to cart">
              <AddCart />
            </Tooltip>
          </IconButton>
          <DeleteProduct product={product} />
        </CardActions>
        <CardActions>
          <Link
            to={{
              pathname: `/updateproduct/${product.id}`,
              state: { product: product }
            }}
          >
            <Button>
              <EditIcon />
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(dashboardStyle)(Product);
