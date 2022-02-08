import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../store/products";

class Products extends Component {
  componentDidMount() {
    this.props.getAllProducts();
  }
  render() {
    const { products } = this.props;
    return (
      <>
        <h1>PoshLeaf Products:</h1>
        {products.map((product) => {
          return <div key={product.id}>{product.name}</div>;
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
