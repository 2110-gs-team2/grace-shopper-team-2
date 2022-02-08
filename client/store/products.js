import { applyMiddleware, combineReducers, createStore } from "redux";
import axios from "axios";
import thunk from "redux-thunk";
import logger from "redux-logger";

// const initialState = {
//   products: []
// }

// Action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

// Action creators
const _getAllProducts = (products) =>({ type: GET_ALL_PRODUCTS, products });

// Thunks
export const getAllProducts = () => {
  return async (dispatch) => {
    const products = (await axios.get('/api/products')).data;
    dispatch(_getAllProducts(products));
  };
};

// Reducer
const products = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

export default products;
