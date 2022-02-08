import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name} className="flex flex-col">
        <label
          htmlFor="email"
          className="text-sm font-bold uppercase pt-5 pb-3"
        >
          Email
        </label>
        <input
          name="email"
          type="text"
          className="py-3 px-5 border-forest-green border-2 focus:ring-forest-green block w-full rounded-full bg-beige
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
          className="py-3 px-5 border-forest-green border-2 focus:ring-forest-green block w-full rounded-full  bg-beige
          "
        />
        <button
          to="/products"
          className="mt-5 block p-6 py-3 w-48 text-center rounded-full text-base font-bold text-beige bg-forest-green uppercase"
        >
          {displayName}
        </button>
        {error && error.response && <div> {error.response.data} </div>}
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
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
