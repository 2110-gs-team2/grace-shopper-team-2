import React, { Component } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.slug}`}>
      <div className="">
        <div className="flex flex-col group">
          <div className="relative">
            <img src="/img/FicusDanielle.jpeg" alt="" />
            <button className="uppercase py-2 border-2 border-forest-green inset-x-5 absolute rounded-full text-base font-bold bottom-3 bg-beige text-forest-green hidden group-hover:block">
              Add to cart
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="text-xl font-medium">{product.name}</div>
            <div className="text-xl font-bold">${product.price}</div>
          </div>
          <div className="uppercase text-dark-grey text-sm">{product.size}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
