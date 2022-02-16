import { LockClosedIcon } from "@heroicons/react/solid";
import React, { Component, useEffect } from "react";
import { Check, MoreHorizontal } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { me } from "../../store";
import CartCard from "./CartCard";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(me());
  }, []);

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
          <div className="col-span-3 flex flex-col gap-5">
            <div className="bg-beige p-10 rounded-lg">
              <div className="flex flex-col gap-2">
                <div className="text-3xl flex gap-2 items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-forest-green rounded-full">
                    <Check className="text-white" />
                  </div>
                  Your email
                </div>
                <div className="text-xl">{currUser.email}</div>
              </div>
            </div>
            <div className="bg-beige p-10 rounded-lg">
              <div className="flex flex-col gap-2">
                <div className="text-3xl flex gap-2 items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-forest-green rounded-full">
                    <Check className="text-white" />
                  </div>
                  Your address
                </div>
                <div className="text-xl">{currUser.addressLine1}</div>
                <div className="text-xl">{currUser.addressLine2}</div>
                <div className="text-xl">
                  {currUser.city}, {currUser.state} {currUser.zipcode}
                </div>
              </div>
            </div>
            <div className="bg-beige p-10 rounded-lg">
              <div className="flex flex-col gap-2">
                <div className="text-3xl flex gap-2 items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-forest-green rounded-full">
                    <MoreHorizontal className="text-white" />
                  </div>
                  Your payment method
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 p-10 bg-beige rounded-lg min-h-[80vh] relative">
            <div className="text-3xl">Your cart</div>
            <div className="mt-6 overflow-x-hidden overflow-y-auto max-h-[60vh] pb-16">
              <div className="flex flex-col gap-5 ">
                <CartCard />
                <CartCard />
                <CartCard />
                <CartCard />
              </div>
            </div>
            <div className="rounded-lg absolute inset-x-0 bottom-0 bg-beige drop-shadow-[0_-6px_18px_rgba(0,0,0,0.2)] p-5 flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="font-bold uppercase leading-5 text-xl">
                  Subtotal:
                </span>
                <span className="font-bold uppercase leading-5 text-xl">
                  $100
                </span>
              </div>
              <button className="py-3 px-5 shadow w-full text-base font-bold text-beige bg-forest-green uppercase rounded-full flex gap-2 justify-center">
                Place order
                <LockClosedIcon width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
