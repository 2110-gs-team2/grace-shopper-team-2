import React, { Fragment } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { User } from "react-feather";
import { logout } from "../../store";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

const UserMenu = ({ styleChange, userName }) => {
  const dispatch = useDispatch();
  return (
    <Menu className="relative z-50" as="div">
      <Menu.Button className="flex items-center focus:outline-none rounded-lg focus:ring-2 ring-offset-2 ring-offset-forest-green ring-beige ring-opacity-60">
        <div className="text-lg text-medium px-3 py-1 rounded-lg flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-forest-green"></div>
          <span>Hi, {userName}</span>
        </div>
        {/* <User strokeWidth={1} width={30} height={30} /> */}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className=" absolute right-0 w-48 mt-2 bg-beige rounded-md shadow-md focus:outline-none">
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`${
                    active ? "bg-xlight-green" : "text-gray-900"
                  }  group flex rounded-md items-center w-full px-2 py-2 text-medium uppercase`}
                  to="/my-account/profile"
                >
                  Account
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`${
                    active ? "bg-xlight-green" : "text-gray-900"
                  }  group flex rounded-md items-center w-full px-2 py-2 text-medium uppercase`}
                  to="/my-account/orders"
                >
                  Orders
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`${
                    active ? "bg-xlight-green" : "text-gray-900"
                  }  group flex rounded-md items-center w-full px-2 py-2 text-medium uppercase`}
                  to="/manage"
                >
                  Manage
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-xlight-green" : "text-gray-900"
                  }  group flex rounded-md items-center w-full px-2 py-2 text-medium uppercase`}
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const mapState = (state) => {
  return {
    userName: state.auth.firstName,
  };
};

export default connect(mapState)(UserMenu);
