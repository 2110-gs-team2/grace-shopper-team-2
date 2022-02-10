import { applyMiddleware, combineReducers, createStore } from "redux";
import axios from "axios";
import thunk from "redux-thunk";
import logger from "redux-logger";

// const initialState = {
//   products: []
// }

// Action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';

// Action creators
const _getAllProducts = (products) =>({ type: GET_ALL_PRODUCTS, products });
const _getSingleProduct = (product) =>({ type: GET_SINGLE_PRODUCT, product });

// Thunks
export const getAllProducts = () => {
  return async (dispatch) => {
    const products = (await axios.get('/api/products')).data;
    dispatch(_getAllProducts(products));
  };
};

export const getSingleProduct = (id) => {
  return async (dispatch) => {
    const product = (await axios.get(`/api/products/${id}`)).data;
    dispatch(_getSingleProduct(product));
  };
};

// Reducer
const products = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;
    case GET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
};

export default products;
