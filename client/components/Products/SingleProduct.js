import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSingleProduct } from "../../store/products";
import { isArray } from "lodash";

class SingleProduct extends Component {
  constructor() {
    super();
    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    const { products, getSingleProduct } = this.props;
    const { slug } = this.props.match.params;
    /* If user navigates to a single product from the all products page, there is no need to call another thunk since data is already in redux store */
    if (products.length) {
      this.setState({ product: products.find((product) => slug === product.slug) })
    }
    else {
      getSingleProduct(slug);
    }
  }

  componentDidUpdate() {
    const { products } = this.props;
    const { product } = this.state;
    if (!Object.keys(product).length) {
      if (isArray(products) && products.length) {
        this.setState({ product: products[0] });
      }
    }
  }

  render() {
    const { product } = this.state;
    return (
      <div className="py-20 px-5">
        <h1>Product Details:</h1>
        <div>Name: {product.name}</div>
        <div>Description: {product.description}</div>
        <div>Price: {product.price}</div>
        <div>Type: {product.type}</div>
        <div>Difficulty: {product.difficulty}</div>
        <div>Light: {product.light}</div>
        <div>Size: {product.size}</div>
        <div>Pet Friendly: {product.isPetFriendly ? 'Yes' : 'No'}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products
  };
};

const mapDispatchToProps = { getSingleProduct };

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);