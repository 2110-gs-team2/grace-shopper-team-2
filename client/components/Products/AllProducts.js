import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../store/products";

class AllProducts extends Component {
  componentDidMount() {
    const { products, getAllProducts } = this.props;
    if (!products.length) getAllProducts();
  }

  addToCart = (product) => {
    console.log("Product added to cart!", product);
  }

  render() {
    const { products } = this.props;
    return (
      <div className="py-20 px-5">
        <h1>PoshLeaf Products:</h1>
        {products.map((product) => {
          return (
            <div key={product.id}>
              Name:
              <Link to={`/products/${product.slug}`}>{product.name}</Link>
              Type: {product.type}
              Price: {product.price}
              {product.quantity ? "In Stock" : "Out of Stock"}
              <button disabled={!product.quantity} onClick={() => this.addToCart(product)}>Add to Cart</button>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products
  };
};

const mapDispatchToProps = { getAllProducts };

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
