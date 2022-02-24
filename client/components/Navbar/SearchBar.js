import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

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
          <span>{product.name}</span>
        </Link>
      </>
    );
  };

  render() {
    const { products } = this.props;
    return (
      <div>
        <header>
          <div style={{ width: "100%" }}>
            <ReactSearchAutocomplete
              autoFocus={true}
              formatResult={this.formatResult}
              items={products}
              maxResults={5}
              onSelect={this.handleOnSelect}
              placeholder={"Search Products"}
              styling={{
                backgroundColor: "#FFFAE3",
                border: "2px solid #2D4323",
                borderRadius: "0.5rem",
                boxShadow: "none",
                fontFamily: "freight-neo-pro",
                fontSize: "18px",
                height: "45px",
                hoverBackgroundColor: "#D7D9AF",
                iconColor: "#2D4323",
                lineColor: "#2D4323",
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
