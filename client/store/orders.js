import axios from "axios";

const TOKEN = "token";
const FETCH_ORDERS = "FETCH_ORDERS";

const _fetchOrders = (orders) => {
  return {
    type: FETCH_ORDERS,
    orders,
  };
};

export const fetchOrders = (userId) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    const { data: orders } = await axios.get(`/api/orders/user/${userId}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch(_fetchOrders(orders));
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return action.orders;
    default:
      return state;
  }
};
