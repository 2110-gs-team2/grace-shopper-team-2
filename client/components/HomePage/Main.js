import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowDown } from "react-feather";

const Main = () => {
  const products = useSelector((state) => state.products);

  return (
    <div>
      <div
        className={`md:h-screen h-[70vh] w-full bg-cover bg-center bg-no-repeat relative`}
        style={{
          backgroundImage: "url(/img/above-the-fold.jpg)",
        }}
      >
        <div className="md:flex hidden animate-bounce w-12 h-12 bg-beige bg-opacity-70 justify-center items-center rounded-full absolute bottom-10 left-1/2 -translate-x-1/2">
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
      <div className="md:p-20 md:pb-10 p-5">
        <div className="flex lg:flex-row flex-col justify-start relative py-10 md:h-[65vh] h-[90vh] max-w-5xl m-auto my-10 md:mb-0 mb-20">
          <div className=" absolute lg:bottom-auto -bottom-2 left-0 lg:w-2/5 w-full p-14 z-10 flex flex-col justify-center rounded-lg shadow-sm bg-forest-green">
            <div className="text-5xl text-beige">Value prop 1</div>
            <div className="mt-5 text-xl text-beige">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis
              molestie a iaculis at erat pellentesque adipiscing commodo elit.
              Purus faucibus ornare suspendisse sed nisi lacus sed viverra.
            </div>
          </div>
          <div className="absolute inset-0 lg:w-4/6 w-full left-auto m-0 z-0 ">
            <div className="absolute inset-0 ">
              <img
                className="object-cover w-full lg:rounded-none rounded-lg"
                src="/img/HomePage-3.jpg"
              ></img>
            </div>
          </div>
        </div>
        <div className="flex justify-start relative py-10 lg:min-h-[50vh] min-h-[90vh] max-w-5xl m-auto">
          <div className="absolute inset-0 lg:w-4/6 w-full right-auto m-0 z-0">
            <div className="absolute inset-0">
              <img
                className="object-cover w-full lg:rounded-none rounded-lg"
                src="/img/HomePage-3.jpg"
              ></img>
            </div>
          </div>
          <div className="absolute lg:bottom-auto -bottom-2 right-0 lg:w-2/5 w-full p-14 z-10 flex flex-col justify-center rounded-lg shadow-sm bg-forest-green">
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
        className="lg:p-20 py-0 bg-cover lg:min-h-[50vh] min-h-[90vh] bg-beige flex justify-center items-center flex-col gap-3"
        style={{ backgroundImage: "url(/img/HomePage-2.png)" }}
      >
        <div className="text-5xl">Ready to buy?</div>
        <div className="text-xl">Enjoy free shipping on $150+ orders</div>
        <Link
          to="/products"
          className="block mt-5 p-6 py-3 w-48 text-center rounded-full text-base font-bold border-2 border-beige md:border-0 bg-forest-green text-beige uppercase"
        >
          Shop all
        </Link>
      </div>
    </div>
  );
};

export default Main;
