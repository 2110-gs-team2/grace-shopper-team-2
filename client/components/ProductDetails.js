import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSingleProduct } from "../store/products";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    const { products, getSingleProduct } = this.props;
    const { id } = this.props.match.params;
    /* If user navigates to a single product from the all products page, there is no need to call another thunk since data is already in redux store */
    products.length
      ? this.setState({ product: products.find((product) => id === product.id) })
      : getSingleProduct(id);
  }

  componentDidUpdate() {
    if (!Object.keys(this.state.product).length) {
      this.setState({ product: this.props.products });
    }
  }

  render() {
    const { product } = this.state;
    return (
      <>
        <h1>Product Details:</h1>
        <div>Name: {product.name}</div>
        <div>Description: {product.description}</div>
        <div>Price: {product.price}</div>
        <div>Type: {product.type}</div>
        <div>Difficulty: {product.difficulty}</div>
        <div>Light: {product.light}</div>
        <div>Size: {product.size}</div>
        <div>Pet Friendly: {product.isPetFriendly ? 'Yes' : 'No'}</div>
      </>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products
  };
};

const mapDispatchToProps = { getSingleProduct };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
