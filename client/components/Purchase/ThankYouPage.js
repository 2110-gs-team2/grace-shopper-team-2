import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { completeOrder, fetchCart } from "../../store/cart";

const ThankYouPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    if (params.orderId) dispatch(completeOrder(params.orderId, products));
    // dispatch(fetchCart(currUser, products));
  }, []);

  return (
    <div className="w-screen h-screen bg-forest-green">
      <div className="pt-36 pb-20 md:px-10 px-5 max-w-7xl m-auto h-full">
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
