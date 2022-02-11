import React, { Component } from "react";
import { Link } from "react-router-dom";
import OrderView from "./OrderView";
import { useLocation } from "react-router-dom";
import includes from "lodash/includes";

const MyAccount = () => {
  const location = useLocation();
  return (
    <div className="w-screen h-screen">
      <div className="py-20 max-w-7xl grid grid-cols-4 m-auto h-full">
        <div className="col-span-1 p-10">
          <div className="flex flex-col gap-3">
            <Link
              to="/my-account/profile"
              className="text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green"
            >
              <span className="relative z-10">Profile</span>
            </Link>
            <Link
              to="/my-account/orders"
              className="text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green"
            >
              <span className="relative z-10">My Orders</span>
            </Link>
          </div>
        </div>
        <div className="col-span-3 p-10">
          {includes(location.pathname, "profile") ? "this" : <OrderView />}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
