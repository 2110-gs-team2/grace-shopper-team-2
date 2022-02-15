import React, { Component, useEffect } from "react";
import Carousel from "./Carousel";

const StylizedProductPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="min-h-[100vh] bg-beige">
      <div className="min-h-[120vh] pt-28 p-20 max-w-[90vw] m-auto">
        <div className="flex flex-row gap-20">
          <Carousel />
          <div className="grid-cols-1 grow border-2 flex flex-col ">
            <div className="flex flex-col gap-2 pb-5 border-b-2 border-forest-green">
              <div className="text-5xl">ZZ Plant</div>
              <div className="text-3xl font-bold">$100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylizedProductPage;
