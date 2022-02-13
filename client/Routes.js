import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { LoginPage, SignupPage } from "./components/AuthPage";
import MyAccount from "./components/Account/MyAccount";
import Main from "./components/HomePage/Main";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import AdminView from "./components/Manage/AdminView";
import { me } from "./store";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const token = window.localStorage.getItem("token");
    const { auth } = this.props;
    const isAdmin = auth.role === "ADMIN";
    console.log(auth.role, "what is this");

    return (
      <div>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/cart" exact component={Cart} />
          <Route exact path="/products/categories/:type" component={Products} />
          <Route exact path="/products/featured/:type" component={Products} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/:slug" component={ProductDetails} />
          <Route path="/my-account/orders/:id">
            {!token ? <Redirect to="/login" /> : <MyAccount />}
          </Route>
          <Route path="/my-account/:type">
            {!token ? <Redirect to="/login" /> : <MyAccount />}
          </Route>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/signup" exact component={SignupPage} />
          {isAdmin ? (
            <>
              <Route path="/manage" exact component={AdminView} />
            </>
          ) : null}
        </Switch>
      </div>
    );
  }
}

const mapState = ({ auth }) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!auth.id,
    auth,
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
