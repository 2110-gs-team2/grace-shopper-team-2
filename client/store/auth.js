import axios from "axios";
import history from "../history";

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
  };
};

export const updateUser = (user, id) => {
  const token = window.localStorage.getItem(TOKEN);
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

export const setOpenOrder = (user) => {
  const token = window.localStorage.getItem(TOKEN);

  return async (dispatch) => {
    if (user.id) {
      const { data: userOrders } = await axios.get(
        `/api/orders/user/${user.id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      let incompleteOrder = userOrders.find(
        (order) => !order.completedTimestamp
      );

      // if there is none, create one for them
      if (!incompleteOrder) {
        incompleteOrder = (await axios.post("/api/orders", { userId: user.id }))
          .data;
      }
      user.openOrder = incompleteOrder;
      dispatch(setAuth(user));
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
