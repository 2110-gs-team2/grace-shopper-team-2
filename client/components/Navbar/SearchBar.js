import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

/*
To-Do:
-Change font to match page (freight-neo-pro?)
-Clear search bar after user clicks a product?
-Change borderRadius to match navbar's drop down menus
*/

class SearchBar extends Component {
  handleOnSelect = (product) => {
    this.props.history.push({ pathname: `/products/${product.slug}` });
    // Attempting to clear search input after user is navigated to single product page
    // const searchField = document.getElementsByTagName("input")[0];
    // console.log(searchField.value, "Before");
    // searchField.value = '';
    // console.log(searchField.value, "After");
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
          <div style={{ width: 350 }}>
            <ReactSearchAutocomplete
              formatResult={this.formatResult}
              items={products}
              maxResults={5}
              onSelect={this.handleOnSelect}
              placeholder={"Search Products"}
              styling={{
                backgroundColor: "#FFFAE3",
                fontFamily: "freight-neo-pro",
                fontSize: "18px",
                height: "35px",
                hoverBackgroundColor: "#D7D9AF",
                iconColor: "#2D4323",
                lineColor: "#2D4323"
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
