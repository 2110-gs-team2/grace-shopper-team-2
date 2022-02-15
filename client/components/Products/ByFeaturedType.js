import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../store/products";

class ByFeaturedType extends Component {
  constructor() {
    super();
    this.state = {
      filteredProducts: []
    };
  }

  componentDidMount() {
    const { products, getAllProducts } = this.props;
    /* If user navigates to a filtered "Featured" page from the all products page, there is no need to call another thunk since data is already in redux store */
    products.length ? this.filterByType(products) : getAllProducts();
  }

  componentDidUpdate() {
    const { products } = this.props;
    if (!this.state.filteredProducts.length) this.filterByType(products);
  }

  addToCart = (product) => {
    console.log("Product added to cart!", product);
  }

  filterByType = (products) => {
    const { type } = this.props.match.params;
    if (type === "pet-friendly") {
      this.setState({
        filteredProducts: products.filter((product) => product.isPetFriendly)
      });
    }
    if (type === "beginners") {
      this.setState({
        filteredProducts: products.filter((product) => product.difficulty === "EASY")
      });
    }
    if (type === "low-light") {
      this.setState({
        filteredProducts: products.filter((product) => product.light === "LOW")
      });
    }
  }

  render() {
    const { filteredProducts } = this.state;
    if (filteredProducts.length) {
      return (
        <div className="py-20 px-5">
          <h1>PoshLeaf Products:</h1>
          {filteredProducts.map((product) => {
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
    } else {
      return (
        <div className="py-20 px-5">Loading...</div>
      )
    }
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products
  };
};

const mapDispatchToProps = { getAllProducts };

export default connect(mapStateToProps, mapDispatchToProps)(ByFeaturedType);
