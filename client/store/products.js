import axios from "axios";

// Action types
const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";

// Action creators
const _getAllProducts = (products) => ({ type: GET_ALL_PRODUCTS, products });
const _getSingleProduct = (product) => ({ type: GET_SINGLE_PRODUCT, product });
const _updateProduct = (product) => ({ type: UPDATE_PRODUCT, product });

// Thunks
export const getAllProducts = () => {
  return async (dispatch) => {
    const products = (await axios.get("/api/products")).data;
    dispatch(_getAllProducts(products));
  };
};

export const getSingleProduct = (id) => {
  return async (dispatch) => {
    const product = (await axios.get(`/api/products/${id}`)).data;
    dispatch(_getSingleProduct(product));
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    const { data: updatedProduct } = await axios.put(
      `/api/products/${product.id}`,
      product
    );
    dispatch(_updateProduct(updatedProduct));
  };
};

// Reducer
const products = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;
    case GET_SINGLE_PRODUCT:
      return [action.product];
    case UPDATE_PRODUCT:
      const products = [...state].filter((p) => p.id !== action.product.id);
      return [...products, action.product];
    default:
      return state;
  }
};

export default products;
