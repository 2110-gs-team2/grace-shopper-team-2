import axios from "axios";
import history from "../history";
import { fetchCart } from "./cart";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";
const UPDATE_USER = "UPDATE_USER";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const _logout = () => ({ type: SET_AUTH, auth: {} });
const _updateUser = (auth) => ({ type: UPDATE_USER, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const { data: user } = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });

    const { data: userOrders } = await axios.get(
      `/api/orders/user/${user.id}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    let incompleteOrder = userOrders.find((order) => !order.completedTimestamp);

    // if there is none, create one for them
    if (!incompleteOrder) {
      incompleteOrder = (await axios.post("/api/orders", { userId: user.id }))
        .data;
    }

    user.openOrder = incompleteOrder;

    return dispatch(setAuth(user));
  }
};

export const authenticate =
  (email, password, firstName, lastName, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        email,
        password,
        firstName,
        lastName,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
      // history.push("/");
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem(TOKEN);
    await axios.get("/logout");
    history.push("/");
    dispatch(_logout());
    dispatch(fetchCart({}));
  };
};

export const updateUser = (user, id) => {
  const token = window.localStorage.getItem(TOKEN);
  console.log("updateUser is being called");
  return async (dispatch) => {
    const { data: updatedUser } = await axios.put(`/api/users/${id}`, {
      user,
      token,
    });
    dispatch(_updateUser(updatedUser));
  };
};

export const createGuest = (guest) => {
  return async (dispatch) => {
    const { data: newGuest } = await axios.post(`/api/users/`, guest);
    // create openOrder
    let incompleteOrder = (
      await axios.post("/api/orders", { userId: newGuest.id })
    ).data;
    newGuest.openOrder = incompleteOrder;
    dispatch(setAuth(newGuest));
  };
};

export const convertOrder = (user, products) => {
  const cart = JSON.parse(window.localStorage.getItem("cart"));

  return async (dispatch) => {
    if (user.id) {
      // get all items associated with incomplete order
      const { data: currItems } = await axios.get(
        `/api/order-items/order/${user.openOrder.id}`
      );

      // make sure current cart syncs up with the openOrder
      await Promise.all(
        cart.map((item) => {
          let itemInDb = currItems.find(
            (currItem) => currItem.productId === item.id
          );
          if (!itemInDb) {
            return axios.post("/api/order-items", {
              orderId: user.openOrder.id,
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            });
          } else {
            return axios.put(`/api/order-items/${itemInDb.id}`, {
              quantity: item.quantity,
              price: item.price,
            });
          }
        })
      );

      window.localStorage.setItem("cart", JSON.stringify([]));
      dispatch(me());
      dispatch(fetchCart(user, products));
    }
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case UPDATE_USER:
      return action.auth;
    default:
      return state;
  }
}
