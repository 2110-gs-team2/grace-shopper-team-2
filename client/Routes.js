import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { LoginPage, SignupPage } from "./components/Account/AuthPage";
import MyAccount from "./components/Account/MyAccount";
import Main from "./components/HomePage/Main";
import AllProducts from "./components/Products/AllProducts";
import ByFeaturedType from "./components/Products/ByFeaturedType";
import SingleProduct from "./components/Products/SingleProduct";
import AdminView from "./components/Admin/AdminView";
import StylizedProducts from "./components/Products/StylizedProducts";
import CheckoutPage from "./components/Purchase/CheckoutPage";
import StylizedProductPage from "./components/Products/StylizedProductPage";
import Test_GetQueryStrings from "./components/Products/Test_GetQueryStrings";
import Test_SetQueryStrings from "./components/Products/Test_SetQueryStrings";
import Cart from "./components/Purchase/Cart";
import { me } from "./store";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const token = window.localStorage.getItem("token");
    const { auth } = this.props;
    const isAdmin = auth.role === "ADMIN";

    return (
      <div>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/cart" exact component={Cart} />
          <Route
            exact
            path="/products/categories/:type"
            component={StylizedProducts}
          />
          <Route
            exact
            path="/products/featured/:type"
            component={withRouter(ByFeaturedType)}
          />
          {/* Testing */}
          <Route exact path="/test" component={Test_GetQueryStrings} />
          <Route exact path="/testqs" component={Test_SetQueryStrings} />
          {/* Testing end */}
          <Route exact path="/products" component={AllProducts} />
          {/* <Route exact path="/products/:slug" component={SingleProduct} /> */}
          <Route exact path="/products/:slug" component={StylizedProductPage} />
          <Route path="/my-account/orders/:id">
            {!token ? <Redirect to="/login" /> : <MyAccount />}
          </Route>
          <Route path="/my-account/:type">
            {!token ? <Redirect to="/login" /> : <MyAccount />}
          </Route>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/checkout" exact component={CheckoutPage} />
          <Route path="/manage" exact>
            {!isAdmin ? <Redirect to="/" /> : <AdminView />}
          </Route>
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
