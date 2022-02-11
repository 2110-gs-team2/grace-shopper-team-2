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
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (email, password, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, { email, password });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
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
