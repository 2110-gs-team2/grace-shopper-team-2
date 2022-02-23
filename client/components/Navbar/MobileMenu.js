import React, { useState, Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Transition, Dialog } from "@headlessui/react";
import { Package, X, Menu } from "react-feather";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Link, useLocation } from "react-router-dom";
import includes from "lodash/includes";

const MobileMenu = (props) => {
  const [open, setOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const currUser = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products);

  //redux hooks for cart store
  const dispatch = useDispatch();
  const location = useLocation();

  const closeSlideover = () => {
    setOpen(false);
  };
  const openSlideOver = () => {
    setOpen(true);
  };

  return (
    <div className="md:hidden block">
      <button
        onClick={openSlideOver}
        className="focus:outline-none flex gap-1 items-center"
      >
        <Menu strokeWidth={1} width={30} height={30} />
      </button>
      <Transition.Root appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-20"
          onClose={closeSlideover}
        >
          <div className="absolute inset-0">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-slate-800 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="ease-in-out duration-500"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="fixed inset-y-0 right-0 bg-beige w-full flex border-2">
                <div className="h-full flex flex-col p-5 bg-beige shadow-xl min-w-full 	">
                  <div className="right-0 my-2 absolute px-5 max-w-fit flex justify-center rounded-md">
                    <button
                      onClick={closeSlideover}
                      className="focus:outline-none"
                    >
                      <X />
                    </button>
                  </div>
                  <div className="">
                    <Dialog.Title className="text-3xl">
                      Your mobile menu
                    </Dialog.Title>
                  </div>
                  {/* <div className="mt-6 overflow-x-hidden overflow-y-auto max-h-[80vh] pb-16">
                    <div className="flex flex-col gap-5 ">hello!</div>
                  </div> */}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default MobileMenu;
