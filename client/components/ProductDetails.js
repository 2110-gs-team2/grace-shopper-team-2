import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ProductDetails extends Component {
  render() {
    const id = this.props.match.params.id;
    const product = this.props.products.find((product) => id === product.id);
    // Need to use a thunk above instead. This only works if you go through the all products page first
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

export default connect(mapStateToProps)(ProductDetails);
