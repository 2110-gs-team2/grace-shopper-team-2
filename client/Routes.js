import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { LoginPage, SignupPage } from "./components/Account/AuthPage";
import MyAccount from "./components/Account/MyAccount";
import Main from "./components/HomePage/Main";
import AllProducts from "./components/Products/AllProducts";
import SingleProduct from "./components/Products/SingleProduct";
import AdminView from "./components/Admin/AdminView";
import CheckoutPage from "./components/Purchase/CheckoutPage";
import Cart from "./components/Purchase/Cart";
import ThankYouPage from "./components/Purchase/ThankYouPage";
import PageNotFound from "./components/PageNotFound";
import { convertOrder } from "./store";
import { fetchCart } from "./store/cart";
import { me } from "./store";
import { getAllProducts } from "./store/products";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.getAllProducts();
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.convertOrder(this.props.auth, this.props.products);
      // if (this.props.auth.openOrder)
      //   this.props.fetchCart(this.props.auth, this.props.products);
    }
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
          <Route exact path="/products" component={withRouter(AllProducts)} />
          <Route exact path="/products/:slug" component={SingleProduct} />
          <Route path="/my-account/orders/:id">
            {!token ? <Redirect to="/login" /> : <MyAccount />}
          </Route>
          <Route path="/my-account/:type">
            {!token ? <Redirect to="/login" /> : <MyAccount />}
          </Route>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/checkout" exact component={CheckoutPage} />
          <Route path="/thank-you/:orderId" component={ThankYouPage} />
          <Route path="/manage" exact>
            {!isAdmin ? <Redirect to="/" /> : <AdminView />}
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

const mapState = ({ auth, products }) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!auth.id,
    auth,
    products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (user, products) => {
      dispatch(fetchCart(user, products));
    },
    convertOrder: (user, products) => {
      dispatch(convertOrder(user, products));
    },
    loadInitialData() {
      dispatch(me());
    },
    getAllProducts: () => {
      dispatch(getAllProducts());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
