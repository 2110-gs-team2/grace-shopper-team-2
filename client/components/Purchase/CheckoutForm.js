import React, { useEffect, useState, useRef } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { LockClosedIcon } from "@heroicons/react/solid";
import { convertCartToOrder } from "../../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { setOpenOrder } from "../../store";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.auth);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const prevUserRef = useRef(currUser);

  useEffect(() => {
    if (!prevUserRef.current.openOrder || !prevUserRef.current.id)
      // dispatch(setOpenOrder(currUser));
      prevUserRef.current = currUser;
  }, [currUser]);

  useEffect(() => {
    if (!stripe) return;

    // const clientSecret = elements._commonOptions.clientSecret.clientSecret;
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:8080/thank-you/${currUser.openOrder.id}`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="py-3 px-5 shadow w-48 text-base font-bold text-beige bg-forest-green uppercase rounded-full flex gap-2 justify-center"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            <div className="m-0 p-0 flex justify-around">
              <span className="mr-2"> Place order</span>
              <LockClosedIcon width={20} height={20} />
            </div>
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="text-red-700">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
