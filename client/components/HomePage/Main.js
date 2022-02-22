import React, { Component, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowDown } from "react-feather";

const Main = () => {
  const products = useSelector((state) => state.products);

  return (
    <div>
      <div
        className={`h-screen w-full bg-cover bg-center bg-no-repeat relative`}
        style={{
          backgroundImage: "url(/img/above-the-fold.jpg)",
        }}
      >
        <div className="animate-bounce w-12 h-12 bg-beige bg-opacity-70 flex justify-center items-center rounded-full absolute bottom-10 left-1/2 -translate-x-1/2">
          <ArrowDown className="text-forest-green" strokeWidth={2} />
        </div>
      </div>
      <div className=" bg-beige py-10 px-5 md:px-10 md:py-20">
        <div className="w-full md:w-9/12 m-auto">
          <div className="text-5xl">Browse our plants</div>
          <div className="flex flex-col md:grid-cols-3 md:grid gap-10 my-6">
            {products
              ? products.slice(0, 3).map((p) => (
                  <Link to={`/products/${p.slug}`} key={p.id}>
                    <div className="flex flex-col ">
                      <img src={p.imageUrl[0]} className="" alt="" />
                      <div className="flex justify-between items-center mt-5">
                        <div className="text-3xl font-medium ">{p.name}</div>
                        <div>${p.price}</div>
                      </div>
                      <div className="uppercase text-dark-grey">{p.size}</div>
                    </div>
                  </Link>
                ))
              : null}
          </div>
        </div>
      </div>
      {/* middle section */}
      <div className="flex flex-col md:flex-row min-h-[60vh]">
        <div className="basis-1/2 bg-forest-green p-10 md:py-20 md:px-10 ">
          <div className="text-5xl text-beige">
            Delivered right at your door
          </div>
          <div className="my-5 text-xl text-beige ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis
            molestie a iaculis at erat pellentesque adipiscing commodo elit.
            Purus faucibus ornare suspendisse sed nisi lacus sed viverra.
          </div>
          <Link
            to="/products"
            className="block mt-5 p-6 py-3 w-48 text-center rounded-full text-base font-bold bg-beige text-forest-green uppercase"
          >
            Shop all
          </Link>
        </div>
        <div
          className="basis-1/2 md:py-20 md:px-10 md:h-auto bg-cover bg-center"
          style={{ backgroundImage: "url(/img/homePage-1.jpg)" }}
        ></div>
      </div>
      {/* value prop section */}
      <div className="p-20">
        <div className="flex justify-start relative py-10 h-[40vw] max-w-5xl m-auto my-10">
          <div className=" absolute left-0 min-h-min w-2/5 p-14 z-10 flex flex-col justify-center rounded-lg shadow-sm bg-forest-green">
            <div className="text-5xl text-beige">Value prop 1</div>
            <div className="mt-5 text-xl text-beige">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis
              molestie a iaculis at erat pellentesque adipiscing commodo elit.
              Purus faucibus ornare suspendisse sed nisi lacus sed viverra.
            </div>
          </div>
          <div className="absolute inset-0 w-4/6 left-auto m-0 z-0">
            <div className="absolute inset-0">
              <img
                className="object-cover w-full"
                src="/img/HomePage-3.jpg"
              ></img>
            </div>
          </div>
        </div>
        <div className="flex justify-start relative py-10 min-h-[30vw] max-w-5xl m-auto my-10">
          <div className="absolute inset-0 w-4/6 right-auto m-0 z-0">
            <div className="absolute inset-0">
              <img
                className="object-cover w-full"
                src="/img/HomePage-3.jpg"
              ></img>
            </div>
          </div>
          <div className="absolute right-0 min-h-min  w-2/5 p-14 z-10 flex flex-col justify-center rounded-lg shadow-sm bg-forest-green">
            <div className="text-5xl text-beige">Value prop 2</div>
            <div className="mt-5 text-xl text-beige">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis
              molestie a iaculis at erat pellentesque adipiscing commodo elit.
              Purus faucibus ornare suspendisse sed nisi lacus sed viverra.
            </div>
          </div>
        </div>
      </div>
      {/* final section */}
      <div
        className="p-20 bg-cover min-h-[50vh] bg-beige flex justify-center items-center flex-col gap-3"
        style={{ backgroundImage: "url(/img/HomePage-2.png)" }}
      >
        <div className="text-5xl">Ready to buy?</div>
        <div className="text-xl">Enjoy free shipping on $150+ orders</div>
        <Link
          to="/products"
          className="block mt-5 p-6 py-3 w-48 text-center rounded-full text-base font-bold bg-forest-green text-beige uppercase"
        >
          Shop all
        </Link>
      </div>
    </div>
  );
};

export default Main;
