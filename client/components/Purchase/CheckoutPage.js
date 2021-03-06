import React, { useRef, useEffect, useState } from "react";
import { Check, MoreHorizontal, HelpCircle, Edit3 } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "./CartCard";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { cartSubTotal } from "./Cart";
import AuthenticationModal from "./AuthenticationModal";
import AddressView from "../Account/AddressView";
const stripePromise = loadStripe(
  "pk_test_51KTcZ8G6iunwbpRu5GmvFjN92ftNqJy6Jo3rK2OgxD2EFLtBjPz9NyvpyKhGL8NBe79XEgEbWTXaVnZ5tBtP5EPP008ToSXphu"
);

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const currUser = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const items = [{ id: "xl-tshirt" }];
  useEffect(() => {
    async function getClientSecret() {
      const { data } = await axios.post("/create-payment-intent", items);
      let clientSecret = data.clientSecret;
      setClientSecret(clientSecret);
    }
    getClientSecret();
  }, []);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#FFFFFF",
      colorBackground: "#FFFFFF",
      colorText: "#30313d",
      colorDanger: "#B91C1C",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <div
        className={`fixed px-5 py-3 inset-x-0 transition duration-300 z-20 bg-beige shadow-lg`}
      >
        <div className="flex justify-center items-center m-2">
          <a href="/">
            <img src="/img/logo.svg" className="w-36" alt="" />
          </a>
        </div>
      </div>
      <div className="min-h-[100vh] bg-forest-green">
        <div className="pt-36 pb-20 px-5 max-w-7xl md:grid md:grid-cols-5 flex flex-col m-auto h-full gap-5">
          <div className="md:col-span-3 flex flex-col gap-5">
            <div className="bg-beige p-10 rounded-lg">
              {!currUser.id ? (
                <div className="flex flex-col gap-2">
                  <div className="text-3xl flex gap-2 items-center">
                    <HelpCircle
                      fill="#2D4323"
                      strokeWidth="1"
                      className="text-beige w-9 h-9"
                    />
                    Provide your info
                  </div>
                  <div className="flex md:flex-row flex-col justify-between md:gap-5">
                    <AuthenticationModal operation="LOGIN" />
                    <AuthenticationModal operation="SIGNUP" />
                  </div>
                  <AuthenticationModal operation="GUEST" />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="text-3xl flex gap-2 items-center">
                    <div className="w-8 h-8  flex items-center justify-center bg-forest-green rounded-full">
                      <Check className="text-white" />
                    </div>
                    Your email
                  </div>
                  <div className="text-xl">{currUser.email}</div>
                </div>
              )}
            </div>
            <div className="bg-beige p-10 rounded-lg">
              {!currUser.zipcode ? (
                <div className="flex flex-col gap-2">
                  <div className="text-3xl flex gap-2 items-center">
                    <HelpCircle
                      fill="#2D4323"
                      strokeWidth="1"
                      className="text-beige w-9 h-9"
                    />
                    Add an address
                  </div>
                  <AddressView />
                </div>
              ) : (
                <div className="flex flex-col gap-2 ">
                  <div className="text-3xl flex gap-2 items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-forest-green rounded-full">
                      <Check className="text-white" />
                    </div>
                    Your address
                  </div>
                  <div>
                    <div className="text-xl">{currUser.addressLine1}</div>
                    <div className="text-xl">{currUser.addressLine2}</div>
                    <div className="text-xl">
                      {currUser.city}, {currUser.state} {currUser.zipcode}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {currUser.id && currUser.zipcode ? (
              <div className="bg-beige p-10 rounded-lg">
                <div className="flex flex-col gap-2">
                  <div className="text-3xl flex gap-2 items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-forest-green rounded-full">
                      <MoreHorizontal className="text-white" />
                    </div>
                    Your payment method
                  </div>
                  <div>
                    {clientSecret && (
                      <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                      </Elements>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="md:col-span-2 pb-44 md:px-10 px-5 bg-beige rounded-lg min-h-[60vh] max-h-[80vh]  relative md:order-1 order-first">
            <div className="text-3xl pt-5 pb-5">Your cart</div>
            <div className="overflow-x-hidden overflow-y-auto md:max-h-full max-h-[60vh]">
              {/* <div className="mt-6 overflow-x-hidden overflow-y-auto max-h-[50vh] pb-16"> */}
              <div className="flex flex-col gap-5 ">
                {cart.length
                  ? cart.map((product) => (
                      <CartCard key={product.id} product={product} />
                    ))
                  : null}
              </div>
            </div>
            <div className="rounded-lg absolute inset-x-0 bottom-0 bg-beige drop-shadow-[0_-6px_18px_rgba(0,0,0,0.2)] p-5 flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="font-bold uppercase leading-5 text-xl">
                  Subtotal:
                </span>
                <span className="font-bold uppercase leading-5 text-xl">
                  ${cartSubTotal(cart).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
