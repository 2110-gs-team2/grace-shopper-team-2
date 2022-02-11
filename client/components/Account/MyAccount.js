import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import OrderView from "./OrderView";
import ProfileView from "./ProfileView";
import AddressView from "./AddressView";
import { useLocation } from "react-router-dom";
import includes from "lodash/includes";
import OrderDetails from "./OrderDetails";

const MyAccount = (props) => {
  const location = useLocation();
  return (
    <div className="w-screen h-screen bg-forest-green">
      <div className="pt-36 pb-20 max-w-7xl grid grid-cols-4 m-auto h-full gap-5">
        <div className="col-span-1 p-10 bg-beige rounded-lg">
          <div className="flex flex-col gap-3">
            <Link
              to={`/my-account/profile`}
              className={`${
                includes(location.pathname, "profile")
                  ? "before:block before:absolute before:h-2 before:top-1/2 before:-translate-y-1/2 before:-inset-x-0.5 before:bg-xlight-green"
                  : null
              } text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green`}
            >
              <span className="relative z-10">Profile</span>
            </Link>
            <Link
              to={`/my-account/orders`}
              className={`${
                includes(location.pathname, "orders")
                  ? "before:block before:absolute before:h-2 before:top-1/2 before:-translate-y-1/2 before:-inset-x-0.5 before:bg-xlight-green"
                  : null
              } text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green`}
            >
              <span className="relative z-10">My Orders</span>
            </Link>
            <Link
              to="/my-account/address"
              className={`${
                includes(location.pathname, "address")
                  ? "before:block before:absolute before:h-2 before:top-1/2 before:-translate-y-1/2 before:-inset-x-0.5 before:bg-xlight-green"
                  : null
              } text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green`}
            >
              <span className="relative z-10">My Address</span>
            </Link>
          </div>
        </div>
        <div className="col-span-3 p-10 bg-beige rounded-lg">
          {includes(location.pathname, "profile") ? <ProfileView /> : null}
          {includes(location.pathname, "orders") ? (
            location.pathname === "/my-account/orders" ? (
              <OrderView />
            ) : (
              <OrderDetails {...props} />
            )
          ) : null}
          {includes(location.pathname, "address") ? <AddressView /> : null}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
