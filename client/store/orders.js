import axios from "axios";

const FETCH_ORDERS = "FETCH_ORDERS";

const _fetchOrders = (orders) => {
  return {
    type: FETCH_ORDERS,
    orders,
  };
};

export const fetchOrders = (userId) => {
  return async (dispatch) => {
    const { data: orders } = await axios.get(`/api/orders/user/${userId}`);
    const itemResults = await Promise.all(
      orders.map((o) => axios.get(`/api/order-items/${o.id}`))
    );
    orders.forEach((o) => {
      const items = itemResults.find((item) => item.data[0].orderId === o.id);
      o.items = items.data;
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