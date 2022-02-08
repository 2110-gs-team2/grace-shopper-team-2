import { applyMiddleware, combineReducers, createStore } from "redux";
import axios from "axios";
import thunk from "redux-thunk";
import logger from "redux-logger";

const initialState = {
  products: []
}

// Action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

// Action creators
const _getAllProducts = (products) =>({ type: GET_ALL_PRODUCTS, products });

// Thunks
export const getAllProducts = () => {
  return async (dispatch) => {
    const products = (await axios.get('/products')).data;
    dispatch(_getAllProducts(products));
  };
};

// Reducer
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, products: action.products };
    default:
      return state;
  }
};

export default productsReducer;
