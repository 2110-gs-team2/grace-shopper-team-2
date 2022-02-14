import React, { Component } from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="">
      <div className="flex flex-col">
        <img src="/img/FicusDanielle.jpeg" className="" alt="" />
        <div className="flex justify-between items-center mt-2">
          <div className="text-xl font-medium">{product.name}</div>
          <div className="text-xl font-bold">${product.price}</div>
        </div>
        <div className="uppercase text-dark-grey text-sm">{product.size}</div>
      </div>
    </div>
  );
};

export default ProductCard;
