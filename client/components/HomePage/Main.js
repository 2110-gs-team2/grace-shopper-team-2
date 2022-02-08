import React, { Component, useEffect, useState } from "react";

const Main = () => {
  return (
    <div>
      <div
        className={` h-screen w-full bg-cover bg-center bg-no-repeat`}
        style={{
          backgroundImage: "url(/img/above-the-fold.jpg)",
        }}
      ></div>
      <div className=" bg-beige px-10 py-20">
        <div className="w-9/12 m-auto">
          <div className="text-6xl">Browse our plants</div>
          <div className="flex flex-col md:grid-cols-3 md:grid gap-10 my-5">
            <div className="flex flex-col ">
              <img src="/img/FicusDanielle.jpeg" className="" alt="" />
              <div className="flex justify-between items-center mt-5">
                <div className="text-3xl font-medium ">Money Tree</div>
                <div>$39</div>
              </div>
              <div className="uppercase text-grey">x-large</div>
            </div>
            <div className="flex flex-col">
              <img src="/img/FicusDanielle.jpeg" className="" alt="" />
              <div className="flex justify-between items-center mt-5">
                <div className="text-3xl font-medium">Red Prayer Plant</div>
                <div>$108</div>
              </div>
              <div className="uppercase text-grey">small</div>
            </div>
            <div className="flex flex-col ">
              <img src="/img/FicusDanielle.jpeg" className="" alt="" />
              <div className="flex justify-between items-center mt-5">
                <div className="text-3xl font-medium">
                  Schefflera Arboricola
                </div>
                <div>$49</div>
              </div>
              <div className="uppercase text-grey">large</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
