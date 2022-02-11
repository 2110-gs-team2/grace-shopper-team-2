import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  withRouter,
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import { LoginPage, SignupPage } from "./components/AuthPage";
import MyAccount from "./components/Account/MyAccount";
import Main from "./components/HomePage/Main";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import OrderDetails from "./components/Account/OrderDetails";
import Cart from "./components/Cart";
import { me } from "./store";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/cart" exact component={Cart} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/:slug" component={ProductDetails} />
          {isLoggedIn ? null : (
            <Fragment>
              <Route path="/login" exact component={LoginPage} />
              <Route path="/signup" exact component={SignupPage} />
            </Fragment>
          )}
          <PrivateRoute
            authed={this.props.isLoggedIn}
            path="/my-account/orders/:id"
            exact
            component={MyAccount}
          />
          <PrivateRoute
            authed={this.props.isLoggedIn}
            path="/my-account/:type"
            component={MyAccount}
          />
        </Switch>
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
