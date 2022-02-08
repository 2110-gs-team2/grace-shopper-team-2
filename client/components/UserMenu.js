import React, { Fragment } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { User } from "react-feather";

const UserMenu = ({ styleChange }) => {
  return (
    <Menu className="relative z-50" as="div">
      <Menu.Button className="flex items-center">
        <User
          strokeWidth={1}
          width={30}
          height={30}

        />
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
          <div className="text-medium pt-3 px-3">Hi, firstName!</div>
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`${
                    active ? "bg-xlight-green" : "text-gray-900"
                  }  group flex rounded-md items-center w-full px-2 py-2 text-medium uppercase`}
                  to="/login"
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
                  to="signup"
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
                  to="signup"
                >
                  Log out
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
