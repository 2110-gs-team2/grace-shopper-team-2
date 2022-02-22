import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const ProductMenu = () => {
  return (
    <div className="w-full max-w-sm">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button>
              <div
                className={`inline-block text-lg font-medium relative hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green
                ${
                  open
                    ? "before:block before:absolute before:h-2 before:top-1/2 before:-translate-y-1/2 before:-inset-x-0.5 before:bg-xlight-green"
                    : ""
                }`}
              >
                <span className="relative ">SHOP</span>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-0 z-10 w-screen max-w-sm px-4 mt-3 transform sm:px-0 lg:max-w-lg">
                <div className="overflow-hidden rounded-lg shadow-md ">
                  <div className="relative gap-8 bg-beige p-6 flex justify-between items-center">
                    <div className="flex flex-col gap-2 grow">
                      <div className="text-sm font-bold uppercase">
                        By category
                      </div>
                      <Link
                        to="/products?type=indoor"
                        onClick={() => close()}
                        className="hover:bg-xlight-green p-1 px-3 rounded-md"
                      >
                        Indoor plants
                      </Link>
                      <Link
                        to="/products?type=succulent"
                        onClick={() => close()}
                        className="hover:bg-xlight-green p-1 px-3 rounded-md"
                      >
                        Succulents
                      </Link>
                      <Link
                        to="/products?type=herb"
                        onClick={() => close()}
                        className="hover:bg-xlight-green p-1 px-3 rounded-md"
                      >
                        Herbs
                      </Link>
                      <Link
                        to="/products"
                        onClick={() => close()}
                        className="hover:bg-xlight-green p-1 px-3 rounded-md"
                      >
                        Shop all
                      </Link>
                    </div>
                    <div className="h-36 border-l border-light-green "></div>
                    <div className="flex flex-col self-start grow gap-2">
                      <div className="text-sm font-bold uppercase">
                        Featured
                      </div>
                      <Link
                        to="/products?isPetFriendly=true"
                        onClick={() => close()}
                        className="hover:bg-xlight-green p-1 px-3 rounded-md"
                      >
                        Pet-friendly plants
                      </Link>
                      <Link
                        to="/products?difficulty=easy"
                        onClick={() => close()}
                        className="hover:bg-xlight-green p-1 px-3 rounded-md"
                      >
                        Best beginner plants
                      </Link>
                      <Link
                        to="/products?light=low"
                        onClick={() => close()}
                        className="hover:bg-xlight-green p-1 px-3 rounded-md"
                      >
                        Low light plants
                      </Link>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default ProductMenu;
