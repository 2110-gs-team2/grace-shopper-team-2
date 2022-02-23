import React from "react";
import { connect } from "react-redux";
import { Login, Signup } from "./AuthForm";

const AuthPage = (props) => {
  const { name, displayName } = props;
  return (
    <div className="flex flex-row ">
      <div className="md:basis-1/2 h-screen bg-forest-green"></div>
      <div className="md:basis-1/2 basis-full flex flex-col justify-center p-10">
        <div className="text-3xl">{displayName}</div>
        {name === "login" ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
  };
};

const mapDispatch = () => {
  return {};
};

export const LoginPage = connect(mapLogin, mapDispatch)(AuthPage);
export const SignupPage = connect(mapSignup, mapDispatch)(AuthPage);
