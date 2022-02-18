import React, { Component, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import { completeOrder } from "../../store/cart";

const ThankYouPage = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(completeOrder(params.orderId));
  }, []);

  return (
    <div className="w-screen h-screen bg-forest-green">
      <div className="pt-36 pb-20 max-w-7xl m-auto h-full gap-5">
        <div className=" p-10 bg-beige rounded-lg">
          <div className="flex flex-col gap-3">Thank you</div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
