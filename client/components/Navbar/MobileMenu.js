import React, { useState, Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Transition, Dialog } from "@headlessui/react";
import { Package, X, Menu, Framer } from "react-feather";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Link, useLocation } from "react-router-dom";
import includes from "lodash/includes";
import { logout } from "../../store";

const MobileMenu = (props) => {
  const [open, setOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const currUser = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products);
  console.log(currUser, "currUser??");

  //redux hooks for cart store
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(location, "this islocation");

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
              <div className="fixed inset-y-0 right-0 bg-beige w-full flex">
                <div className="h-full flex flex-col p-5 bg-beige shadow-xl min-w-full 	">
                  <div className="right-0 my-2 absolute px-5 max-w-fit flex justify-center rounded-md">
                    <button
                      onClick={closeSlideover}
                      className="focus:outline-none"
                    >
                      <X />
                    </button>
                  </div>

                  <div className="m-8 overflow-x-hidden overflow-y-auto flex flex-col">
                    <Dialog.Title className="text-3xl mb-5">
                      Hi, {currUser.id ? currUser.firstName : "there"}!
                    </Dialog.Title>
                    <div className="flex flex-col gap-3 pb-5 border-b-2 border-forest-green">
                      <Link
                        to={`/products`}
                        onClick={() => closeSlideover()}
                        className={`${
                          includes(location.pathname, "/products") &&
                          !location.search
                            ? "before:block before:absolute before:h-2 before:top-1/2 before:-translate-y-1/2 before:-inset-x-0.5 before:bg-xlight-green"
                            : null
                        } text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green`}
                      >
                        <span className="relative z-10 font-bold">
                          Shop all
                        </span>
                      </Link>
                      <Link
                        to={`/products?type=indoor`}
                        onClick={() => closeSlideover()}
                        className={`${
                          includes(location.search, "type=indoor")
                            ? "before:block before:absolute before:h-2 before:top-1/2 before:-translate-y-1/2 before:-inset-x-0.5 before:bg-xlight-green"
                            : null
                        } text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green`}
                      >
                        <span className="relative z-10">Indoor plants</span>
                      </Link>
                      <Link
                        to={`/products?type=succulents`}
                        onClick={() => closeSlideover()}
                        className={`${
                          includes(location.search, "type=succulents")
                            ? "before:block before:absolute before:h-2 before:top-1/2 before:-translate-y-1/2 before:-inset-x-0.5 before:bg-xlight-green"
                            : null
                        } text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green`}
                      >
                        <span className="relative z-10">Succulents</span>
                      </Link>
                      <Link
                        to={`/products?type=herbs`}
                        onClick={() => closeSlideover()}
                        className={`${
                          includes(location.search, "type=herbs")
                            ? "before:block before:absolute before:h-2 before:top-1/2 before:-translate-y-1/2 before:-inset-x-0.5 before:bg-xlight-green"
                            : null
                        } text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green`}
                      >
                        <span className="relative z-10">Herbs</span>
                      </Link>
                      <Link
                        to={`/products?difficulty=easy`}
                        onClick={() => closeSlideover()}
                        className={`${
                          includes(location.search, "difficulty=easy")
                            ? "before:block before:absolute before:h-2 before:top-1/2 before:-translate-y-1/2 before:-inset-x-0.5 before:bg-xlight-green"
                            : null
                        } text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green`}
                      >
                        <span className="relative z-10">
                          Best beginner plants
                        </span>
                      </Link>
                      <Link
                        to={`/products?light=low`}
                        onClick={() => closeSlideover()}
                        className={`${
                          includes(location.search, "light=low")
                            ? "before:block before:absolute before:h-2 before:top-1/2 before:-translate-y-1/2 before:-inset-x-0.5 before:bg-xlight-green"
                            : null
                        } text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green`}
                      >
                        <span className="relative z-10">Low light plants</span>
                      </Link>
                      <Link
                        to={`/products?isPetFriendly=true`}
                        onClick={() => closeSlideover()}
                        className={`${
                          includes(location.search, "isPetFriendly=true")
                            ? "before:block before:absolute before:h-2 before:top-1/2 before:-translate-y-1/2 before:-inset-x-0.5 before:bg-xlight-green"
                            : null
                        } text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green`}
                      >
                        <span className="relative z-10">
                          Pet-friendly plants
                        </span>
                      </Link>
                    </div>
                    <div className="flex flex-col gap-3 pt-5">
                      {currUser.id ? (
                        <Fragment>
                          <Link
                            to={`/my-account/profile`}
                            onClick={() => closeSlideover()}
                            className={`${
                              includes(location.pathname, "profile")
                                ? "before:block before:absolute before:h-2 before:top-1/2 before:-translate-y-1/2 before:-inset-x-0.5 before:bg-xlight-green"
                                : null
                            } text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green`}
                          >
                            <span className="relative z-10">My account</span>
                          </Link>
                          <Link
                            to={`/my-account/orders`}
                            onClick={() => closeSlideover()}
                            className={`${
                              includes(location.pathname, "orders")
                                ? "before:block before:absolute before:h-2 before:top-1/2 before:-translate-y-1/2 before:-inset-x-0.5 before:bg-xlight-green"
                                : null
                            } text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green`}
                          >
                            <span className="relative z-10">Orders</span>
                          </Link>
                          <button
                            onClick={() => {
                              dispatch(logout());
                              closeSlideover();
                            }}
                            className={` text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green`}
                          >
                            <span className="relative z-10">Log out</span>
                          </button>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <Link
                            to={`/login`}
                            onClick={() => closeSlideover()}
                            className={`${
                              includes(location.pathname, "login")
                                ? "before:block before:absolute before:h-2 before:top-1/2 before:-translate-y-1/2 before:-inset-x-0.5 before:bg-xlight-green"
                                : null
                            } text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green`}
                          >
                            <span className="relative z-10">Sign in</span>
                          </Link>
                          <Link
                            to={`/signup`}
                            onClick={() => closeSlideover()}
                            className={`${
                              includes(location.pathname, "signup")
                                ? "before:block before:absolute before:h-2 before:top-1/2 before:-translate-y-1/2 before:-inset-x-0.5 before:bg-xlight-green"
                                : null
                            } text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green`}
                          >
                            <span className="relative z-10">Sign up</span>
                          </Link>
                        </Fragment>
                      )}

                      {currUser.role === "ADMIN" ? (
                        <Link
                          to={`/manage`}
                          onClick={() => closeSlideover()}
                          className={`${
                            includes(location.pathname, "manage")
                              ? "before:block before:absolute before:h-2 before:top-1/2 before:-translate-y-1/2 before:-inset-x-0.5 before:bg-xlight-green"
                              : null
                          } text-lg inline max-w-fit relative uppercase font-medium hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green`}
                        >
                          <span className="relative z-10">Manage</span>
                        </Link>
                      ) : null}
                    </div>
                  </div>
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
