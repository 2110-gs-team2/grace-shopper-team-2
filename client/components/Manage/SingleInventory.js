import { Dialog, Transition } from "@headlessui/react";
import React, { useState, Fragment } from "react";
import { X } from "react-feather";
import { useDispatch } from "react-redux";
import SingleInventoryForm from "./SingleInventoryForm";

const SingleInventory = ({ product }) => {
  const [open, setOpen] = useState(false);
  function closeModal() {
    setOpen(false);
  }
  function openModal() {
    setOpen(true);
  }

  return (
    <Fragment>
      <button
        onClick={openModal}
        className="mt-5 block p-6 py-3 text-center rounded-full text-base font-bold text-beige bg-forest-green uppercase"
      >
        Edit
      </button>
      <Transition.Root appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-20 rounded-md"
          onClose={closeModal}
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
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 top-1/3 "
              enterTo="opacity-100 top-1/2 "
              leave="ease-in duration-200"
              leaveFrom="opacity-100 top-1/2 "
              leaveTo="opacity-0 top-1/3 "
            >
              <div className=" absolute rounded-md left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-left shadow-xl transition-all max-w-2xl w-full">
                <div className="right-0 absolute p-2 max-w-fit flex justify-center bg-xlight-green m-2 rounded-md">
                  <button onClick={closeModal}>
                    <X />
                  </button>
                </div>
                <div className="bg-beige p-7 pt-14 rounded-md">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="id"
                        className="text-sm font-bold uppercase"
                      >
                        ID
                      </label>
                      {product.id}
                    </div>
                    <SingleInventoryForm product={product} setOpen={setOpen} />
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

export default SingleInventory;
