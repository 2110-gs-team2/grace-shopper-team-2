import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../store/products";

class Products extends Component {
  componentDidMount() {
    this.props.getAllProducts();
  }

  addToCart = (product) => {
    console.log('Product added to cart', product);
  }

  render() {
    const { products } = this.props;
    const userType = "user"; // Temporary variable
    if (userType === "admin")
      return (
        <div style={{ backgroundColor: "dodgerblue !important" }}>
          Logged in as admin
        </div>
      );
    if (userType === "developer") return <div>Logged in as developer</div>;
    if (userType === "user")
      return (
        <>
          <h1>PoshLeaf Products:</h1>
          {products.map((product) => {
            return (
                <div key={product.id}>
                  Name:
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                  Type: {product.type}
                  Price: {product.price}
                  <button onClick={() => this.addToCart(product)}>Add to Cart</button>
                </div>
            );
          })}
        </>
      );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products,
  };
};

const mapDispatchToProps = { getAllProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Products);
