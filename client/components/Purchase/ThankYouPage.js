import React, { Component, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import { completeOrder } from "../../store/cart";

const ThankYouPage = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.orderId) dispatch(completeOrder(params.orderId));
  }, []);

  return (
    <div className="w-screen h-screen bg-forest-green">
      <div className="pt-36 pb-20 max-w-7xl m-auto h-full">
        <div className=" p-10 bg-beige rounded-lg ">
          <div className="flex flex-col gap-2 max-w-xl m-auto">
            <div className="text-3xl text-center">
              Your order number {`#${params.orderId.split("-")[0]}`} is
              confirmed!
            </div>
            <div className="text-xl text-center">
              Thank you for your purchase. We're excited for you to start your
              plant nurturing journey. You should receive an email confirmation
              about your order! Please note that it will take about 5-7 business
              days for your items to ship.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
