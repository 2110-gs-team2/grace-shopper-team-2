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
    const { data: orders } = await axios.get("/api/orders");
    if (user)
      user.openOrder =
        orders.find((o) => o.userId === user.id && !o.completedTimestamp) || {};
    return dispatch(setAuth(user));
  }
};

export const authenticate = (email, password, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, { email, password });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
    history.push("/");
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
  return async (dispatch) => {
    const { data: updatedUser } = await axios.put(`/api/users/${id}`, user);
    dispatch(_updateUser(updatedUser));
  };
};

export const createGuest = (guest) => {
  return async (dispatch) => {
    const { data: newGuest } = await axios.post(`/api/users/`, guest);
    dispatch(setAuth(newGuest));
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
