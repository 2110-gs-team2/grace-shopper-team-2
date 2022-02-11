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
    return (
      <div className="py-20">
        <h1>PoshLeaf Products:</h1>
        {products.map((product) => {
          return (
              <div key={product.id}>
                Name:
                <Link to={`/products/${product.slug}`}>{product.name}</Link>
                Type: {product.type}
                Price: {product.price}
                <button onClick={() => this.addToCart(product)}>Add to Cart</button>
              </div>
          );
        })}
      </div>
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
