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
    let itemResults = await Promise.all(
      orders.map((o) => axios.get(`/api/order-items/order/${o.id}`))
    );
    itemResults = itemResults.map((i) => i.data);
    await orders.forEach((o) => {
      const itemArray = itemResults.find(
        (arr) => arr[0] && arr[0].orderId === o.id
      );
      o.items = itemArray || [];
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
