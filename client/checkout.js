import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";
import store from "./store";
import CheckoutPage from "./components/Purchase/CheckoutPage";
import Navbar from "./components/Navbar/Navbar";
import Routes from "./Routes";
import "./input.css";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <CheckoutPage />
    </Router>
  </Provider>,
  document.getElementById("checkout")
);
