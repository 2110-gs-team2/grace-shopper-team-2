import React, { Component, Fragment } from "react";
import { connect, useSelector } from "react-redux";
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
  const state = useSelector((state) => state);
  const newAuthed = !!state.auth.id;

  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(props);
        return newAuthed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
}

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    const token = window.localStorage.getItem("token");

    return (
      <div>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/cart" exact component={Cart} />
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
