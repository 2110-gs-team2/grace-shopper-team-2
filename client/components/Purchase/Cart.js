import React, { useState, Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../store/cart";
import { Transition, Dialog } from "@headlessui/react";
import { Package, X } from "react-feather";
import { LockClosedIcon } from "@heroicons/react/solid";
import CartCard from "./CartCard";
import { Link, useLocation } from "react-router-dom";
import includes from "lodash/includes";

//subtotal function
export const cartSubTotal = (arr) => {
  return arr.reduce((acc, product) => {
    acc += product.price * 1 * product.quantity;
    return acc;
  }, 0);
};

export const getCartQuantity = (arr) => {
  return arr.reduce((acc, product) => {
    acc += product.quantity;
    return acc;
  }, 0);
};

const Cart = (props) => {
  const [open, setOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const currUser = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products);
  const prevCartRef = useRef(cart);
  const prevUserRef = useRef(currUser);
  const subtotal = cartSubTotal(cart).toFixed(2);
  let shippingProgress = Math.floor((subtotal / 150) * 100);
  if (shippingProgress > 100) shippingProgress = 100;
  const [freeShippingProgress, setFreeShippingProgress] = useState("0%");

  //redux hooks for cart store
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchCart(currUser, products));
  }, []);

  useEffect(() => {
    setFreeShippingProgress(`${shippingProgress}%`);
  }, [cart]);

  // console.log("whats the prevCartRef", prevCartRef.current);
  // console.log("whats the cart", cart);

  // console.log("whats the prevUserRef", prevUserRef.current.id);
  // console.log("whats the currUser", currUser.id);
  useEffect(() => {
    // opens slide when cart content changes in certain scenarios
    if (
      !includes(location.pathname, "checkout") &&
      !includes(location.pathname, "thank-you")
    ) {
      if (
        !(prevCartRef.current.length === 0 && cart.length !== 0) &&
        prevCartRef.current.length !== cart.length &&
        prevUserRef.current.id === currUser.id
      ) {
        console.log("condition 1");
        return openSlideOver();
      }
      if (
        prevCartRef.current.length === 1 &&
        cart.length === 1 &&
        prevCartRef.current[0].quantity !== cart[0].quantity
      ) {
        console.log("condition 2");
        return openSlideOver();
      }

      if (
        !prevCartRef.current.id &&
        !currUser.id &&
        cart.length === 1 &&
        prevCartRef.current.length !== 0
      ) {
        console.log("condition 3");
        return openSlideOver();
      }
    }

    prevCartRef.current = cart;
    prevUserRef.current = currUser;
  }, [cart]);

  const closeSlideover = () => {
    setOpen(false);
  };
  const openSlideOver = () => {
    setOpen(true);
  };

  return (
    <Fragment>
      <button
        onClick={openSlideOver}
        className="focus:outline-none flex gap-1 items-center"
      >
        <Package strokeWidth={1} width={30} height={30} />
        <span className="text-lg">({getCartQuantity(cart)})</span>
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
                    <button
                      onClick={closeSlideover}
                      className="focus:outline-none"
                    >
                      <X />
                    </button>
                  </div>
                  <div className="">
                    <Dialog.Title className="text-3xl">
                      Your cart ({getCartQuantity(cart)})
                      {cart && cart.length !== 0 ? (
                        <div className="mt-3">
                          <div className="text-sm">
                            {freeShippingProgress === "100%"
                              ? "Congrats, you scored free shipping!"
                              : `You're $${
                                  150 - subtotal
                                } away from free shipping!`}
                          </div>
                          <div className="w-full bg-forest-green rounded-full h-1.5 dark:bg-xlight-green my-3">
                            <div
                              className=" h-1.5 bg-xlight-green rounded-full dark:bg-forest-green transition-all"
                              style={{ width: `${freeShippingProgress}` }}
                            ></div>
                          </div>
                        </div>
                      ) : null}
                    </Dialog.Title>
                  </div>
                  <div className="mt-6 overflow-x-hidden overflow-y-auto max-h-[80vh] pb-16">
                    <div className="flex flex-col gap-5 ">
                      {cart.map((product) => {
                        return (
                          <CartCard
                            key={product.id}
                            product={product}
                            products={products}
                          />
                        );
                      })}
                    </div>
                  </div>
                  {cart && cart.length === 0 ? (
                    <div className="flex flex-col gap-3">
                      <div className="text-3xl">
                        Your cart is looking a little empty..
                      </div>
                      <div className="text-xl">Here's where to start:</div>
                      <Link
                        to="/products"
                        onClick={closeSlideover}
                        className="w-full h-32 group bg-cover bg-center relative before:block before:absolute before:h-full before:top-0 before:-inset-x-0 before:bg-black before:opacity-40 hover:before:opacity-80 before:transition before:ease-in-out before:duration-500"
                        style={{
                          backgroundImage:
                            'url("/img/scott-webb-oRWRlTgBrPo-unsplash.jpg")',
                        }}
                      >
                        <span className="text-center absolute text-3xl top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2  text-white">
                          Shop all products
                        </span>
                      </Link>
                      <Link
                        to="/featured/beginners"
                        onClick={closeSlideover}
                        className="w-full h-32 group bg-cover bg-center relative before:block before:absolute before:h-full before:top-0 before:-inset-x-0 before:bg-black before:opacity-40 hover:before:opacity-80 before:transition before:ease-in-out before:duration-500"
                        style={{
                          backgroundImage:
                            'url("/img/sarah-dorweiler-x2Tmfd1-SgA-unsplash.jpg")',
                        }}
                      >
                        <span className="text-center absolute text-3xl top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2  text-white">
                          For beginner plant parents
                        </span>
                      </Link>
                    </div>
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 bg-beige drop-shadow-[0_-6px_18px_rgba(0,0,0,0.2)] p-5 flex flex-col gap-4">
                    <div className="flex justify-between">
                      <span className="font-bold uppercase leading-5 text-xl">
                        Subtotal:
                      </span>
                      <span className="font-bold uppercase leading-5 text-xl">
                        ${subtotal}
                      </span>
                    </div>
                    <Link
                      to="/checkout"
                      onClick={async () => {
                        closeSlideover();
                      }}
                      disabled={!cart.length}
                      className={`${
                        !cart.length ? "pointer-events-none bg-stone-300" : ""
                      } py-3 px-5 w-full text-base font-bold text-beige bg-forest-green uppercase rounded-full flex gap-2 justify-center`}
                    >
                      Continue to checkout
                      <LockClosedIcon width={20} height={20} />
                    </Link>
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

export default Cart;
