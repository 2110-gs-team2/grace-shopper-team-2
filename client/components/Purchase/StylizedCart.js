import React, { useState, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { Package, X } from "react-feather";
import { LockClosedIcon } from "@heroicons/react/solid";
import StylizedCartCard from "./StyledCartCard";
import { Link } from "react-router-dom";

const StylizedCart = (props) => {
  const [open, setOpen] = useState(false);

  function closeSlideover() {
    setOpen(false);
  }
  function openSlideOver() {
    setOpen(true);
  }
  return (
    <Fragment>
      <button onClick={openSlideOver}>
        <Package
          strokeWidth={1}
          width={30}
          height={30}
          className="text-red-600"
        />
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
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="ease-in-out duration-500"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="fixed inset-y-0 right-0 bg-beige md:w-[35vw] w-11/12 flex">
                <div className="h-full flex flex-col p-5 bg-beige shadow-xl min-w-full relative overflow-scroll	">
                  <div className="right-0 my-2 absolute px-5 max-w-fit flex justify-center rounded-md">
                    <button onClick={closeSlideover}>
                      <X />
                    </button>
                  </div>
                  <div className="">
                    <Dialog.Title className="text-3xl">Your cart</Dialog.Title>
                  </div>
                  <div className="mt-6 overflow-x-hidden overflow-y-auto max-h-[80vh] pb-16">
                    <div className="flex flex-col gap-5 ">
                      <StylizedCartCard />
                      <StylizedCartCard />
                      <StylizedCartCard />
                      <StylizedCartCard />
                      <StylizedCartCard />
                      <StylizedCartCard />
                      <StylizedCartCard />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-beige drop-shadow-[0_-6px_18px_rgba(0,0,0,0.2)] p-5 flex flex-col gap-4">
                    <div className="flex justify-between">
                      <span className="font-bold uppercase leading-5 text-xl">
                        Subtotal:
                      </span>
                      <span className="font-bold uppercase leading-5 text-xl">
                        $100
                      </span>
                    </div>
                    <a
                      href="/checkout"
                      onClick={() => closeSlideover()}
                      className="py-3 px-5 shadow w-full text-base font-bold text-beige bg-forest-green uppercase rounded-full flex gap-2 justify-center"
                    >
                      Continue to checkout
                      <LockClosedIcon width={20} height={20} />
                    </a>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </Fragment>
  );
};

export default StylizedCart;
