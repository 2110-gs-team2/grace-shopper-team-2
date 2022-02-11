import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import { LoginPage, SignupPage } from "./components/AuthPage";
import MyAccount from "./components/Account/MyAccount";
import Main from "./components/HomePage/Main";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { me } from "./store";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/my-account/profile" component={MyAccount} />
            <Route path="/my-account/orders" component={MyAccount} />
            <Route path="/my-account/address" component={MyAccount} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
          </Switch>
        )}
        <Route path="/" exact component={Main} />
        <Route path="/cart" exact component={Cart} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:slug" component={ProductDetails} />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
