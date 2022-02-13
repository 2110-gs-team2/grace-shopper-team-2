import React, { Component } from "react";

const CheckoutPage = () => {
  return (
    <div>
      <div
        className={`fixed px-5 py-3 inset-x-0 transition duration-300 z-20 bg-beige shadow-lg`}
      >
        <div className="flex justify-center items-center m-2">
          <a href="/">
            <img src="/img/logo.svg" className="w-36" alt="" />
          </a>
        </div>
      </div>
      <div className="min-h-[100vh] bg-forest-green">
        <div className="pt-36 pb-20 max-w-7xl grid grid-cols-5 m-auto h-full gap-5">
          <div className="col-span-3 p-10 bg-beige rounded-lg">hello!</div>
          <div className="col-span-2 p-10 bg-beige rounded-lg">hello!</div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
