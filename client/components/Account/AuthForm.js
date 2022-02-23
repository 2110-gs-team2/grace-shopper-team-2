import React, { Fragment } from "react";
import { connect } from "react-redux";
import { authenticate } from "../../store";
import history from "../../history";
import { useLocation } from "react-router-dom";
import includes from "lodash/includes";
/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const location = useLocation();
  const { name, displayName, handleSubmit, error } = props;

  const returnToHome = () => {
    history.push("/");
  };

  return (
    <div>
      <form
        onSubmit={(evt) => {
          handleSubmit(evt);
          if (!includes(location.pathname, "checkout")) returnToHome();
        }}
        name={name}
        className="flex flex-col"
      >
        {name === "signup" ? (
          <div className="flex m-0 md:gap-5 w-full md:flex-row flex-col">
            <div className="m-0 grow">
              <label
                htmlFor="firstName"
                className="text-sm font-bold uppercase pt-5 pb-3"
              >
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                className="py-3 px-5 border-forest-green border-2 block w-full rounded-full bg-beige
                focus:border-forest-green focus:ring-2 focus:ring-xlight-green
          "
              />
            </div>
            <div className="m-0 grow">
              <label
                htmlFor="lastName"
                className="text-sm font-bold uppercase pt-5 pb-3"
              >
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                className="py-3 px-5 border-forest-green border-2 block w-full rounded-full bg-beige
                focus:border-forest-green focus:ring-2 focus:ring-xlight-green
          "
              />
            </div>
          </div>
        ) : null}
        <label
          htmlFor="email"
          className="text-sm font-bold uppercase pt-5 pb-3 "
        >
          Email
        </label>
        <input
          name="email"
          type="text"
          className="py-3 px-5 border-forest-green border-2  block w-full rounded-full bg-beige
         focus:border-forest-green focus:ring-2 focus:ring-xlight-green
          "
        />

        <label
          htmlFor="password"
          className="text-sm font-bold uppercase pt-5 pb-3"
        >
          Password
        </label>
        <input
          name="password"
          type="password"
          className="py-3 px-5 border-forest-green border-2 block w-full rounded-full  bg-beige
          focus:border-forest-green focus:ring-2 focus:ring-xlight-green
          "
        />
        <button
          to="/products"
          className="mt-5 block p-6 py-3 w-48 text-center rounded-full text-base font-bold text-beige bg-forest-green uppercase"
        >
          {displayName}
        </button>
        {name === "login" ? (
          <Fragment>
            <div className="text-lg my-5 mx-0 text-center">— or —</div>
            <div className="flex xl:flex-row flex-col gap-5 justify-around my-2 mx-0">
              <a
                href="/auth/login/google"
                className="bg-white rounded-full px-10 shadow-sm"
              >
                <div className="flex gap-2 items-center md:justify-center">
                  <img src="/img/google.png" className="w-5" />
                  <span className="font-bold">Login with Google</span>
                </div>
              </a>
              <a
                href="/auth/login/facebook"
                className="rounded-full px-10 bg-[#1877F2]"
              >
                <div className="flex gap-2 items-center md:justify-center">
                  <img src="/img/facebook.png" className="w-5" />
                  <span className="font-bold text-white">
                    Login with Facebook
                  </span>
                </div>
              </a>
            </div>
          </Fragment>
        ) : null}

        {error && error.response && (
          <div className="text-red-700"> {error.response.data} </div>
        )}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  let firstName = "";
  let lastName = "";
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      if (evt.target.name === "signup") {
        firstName = evt.target.firstName.value;
        lastName = evt.target.lastName.value;
      }
      const formName = evt.target.name;
      const username = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, firstName, lastName, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
