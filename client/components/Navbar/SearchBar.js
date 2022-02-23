import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

/*
To-Do:
-Change fontFamily to match page
// -Wrap text in drop-down results if possible (was kind of able to implement it, but it just adds "..." at the end of long product names)
-Bring entire products page up a little (I used py-20 on AllProducts component, but it brought the page down too much. Any number less than 20 brings it up too much)
-Clear search bar after user clicks a product?
*/

class SearchBar extends Component {
  handleOnSelect = (product) => {
    this.props.history.push({ pathname: `/products/${product.slug}` });
  };

  formatResult = (product) => {
    return (
      <>
        <Link to={`/products/${product.slug}`}>
          <img
            style={{ height: "50px", width: "auto", maxHeight: "50px" }}
            src={product.imageUrl[0]}
          />
          <span>
            {product.name}
          </span>
        </Link>
      </>
    );
  };

  render() {
    const { products } = this.props;
    return (
      <div>
        <header>
          <div style={{ width: 375 }}>
            <ReactSearchAutocomplete
              formatResult={this.formatResult}
              items={products}
              maxResults={5}
              onSelect={this.handleOnSelect}
              placeholder={"Search Products"}
              styling={{
                backgroundColor: "#FFFAE3",
                height: "35px",
                hoverBackgroundColor: "#D7D9AF",
                iconColor: "#2D4323"
              }}
            />
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products,
  };
};

export default withRouter(connect(mapStateToProps)(SearchBar));
