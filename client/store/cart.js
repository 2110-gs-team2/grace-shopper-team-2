import axios from "axios";

//action types
const SET_CART = "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const ADD_TO_QUANTITY = "ADD_TO_QUANTITY";
const SUB_FROM_QUANTITY = "SUB_FROM_QUANTITY";
const RESET_CART = "RESET_CART";

//action creators
const _setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};
const _addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product,
  };
};
const _deleteFromCart = (id) => {
  return {
    type: DELETE_FROM_CART,
    id,
  };
};
const _addToQuantity = (product) => {
  return {
    type: ADD_TO_QUANTITY,
    product,
  };
};
const _subFromQuantity = (product) => {
  return {
    type: SUB_FROM_QUANTITY,
    product,
  };
};

const _resetCart = () => {
  return {
    type: RESET_CART,
  };
};

//thunks
export const fetchCart = () => {
  return (dispatch) => {
    window.localStorage.cart
      ? dispatch(_setCart(JSON.parse(window.localStorage.getItem("cart"))))
      : window.localStorage.setItem("cart", JSON.stringify([]));
    dispatch(_setCart(JSON.parse(window.localStorage.getItem("cart"))));
  };
};


export const addToCart = (id, productArray, quantity) => {
  return (dispatch) => {
    //pull localStorage cart
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    //find product to add from store
    const product = productArray.find((product) => id === product.id);
    //find & discover if product already in cart
    const productCheck = cart.find((product) => product.id === id);
    //if not in cart, push to cart, update quantity, & dispatch to store
    if (!productCheck) {
      if (!quantity) quantity = 1;
      product.quantity = quantity;
      cart.push(product);
      dispatch(_addToCart(product));
      //send cart back to localStorage
      const cartJSON = JSON.stringify(cart);
      window.localStorage.setItem("cart", cartJSON);
    } else {
      //if item in cart already, increase quantity x 1
      dispatch(addToQuantity(product.id, quantity));
    }
  };
};

export const removeFromCart = (id) => {
  return (dispatch) => {
    //pull localStorage cart
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    //filter out product
    const filterdCart = cart.filter((product) => product.id !== id);
    //send filteredCart back to localStorage
    const cartJSON = JSON.stringify(filterdCart);
    window.localStorage.setItem("cart", cartJSON);
    //send product id to be removed from state
    dispatch(_deleteFromCart(id));
  };
};

export const addToQuantity = (id, quantity) => {
  return (dispatch) => {
    let productIdx = 0;
    //pull localStorage cart
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    //find product to update & assign cart product array index
    const product = cart.find((product, idx) => {
      if (product.id === id) {
        productIdx = idx;
        return product;
      }
    });
    //increment product quantity by 1 via assigned index value
    if (!quantity) quantity = 1;
    cart[productIdx].quantity = cart[productIdx].quantity + quantity;
    //send updated cart back to localStorage
    const cartJSON = JSON.stringify(cart);
    window.localStorage.setItem("cart", cartJSON);
    //update redux store
    dispatch(_addToQuantity(product));
  };
};

export const subFromQuantity = (id) => {
  return (dispatch) => {
    let productIdx = 0;
    //pull localStorage cart
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    //find product to update & assign cart product array index
    const product = cart.find((product, idx) => {
      if (product.id === id) {
        productIdx = idx;
        return product;
      }
    });
    //decrement product quantity by 1 via assigned index value
    cart[productIdx].quantity -= 1;
    //send updated cart back to localStorage
    const cartJSON = JSON.stringify(cart);
    window.localStorage.setItem("cart", cartJSON);
    //update redux store
    dispatch(_subFromQuantity(product));
  };
};

export const completeOrder = (orderId) => {
  return async (dispatch) => {
    // if authenticated we create or find an open order
    if (orderId) {
      // create OrderItems based on their localStorage('cart') data row
      const cart = JSON.parse(window.localStorage.getItem("cart"));

      // get all items associated with order
      const { data: currItems } = await axios.get(
        `/api/order-items/order/${orderId}`
      );

      // complete the order by putting a timestamp
      await axios.put(`/api/orders/${orderId}`, {
        completedTimestamp: new Date(),
      });

      await Promise.all(
        cart.map((item) => {
          let itemInDb = currItems.find(
            (currItem) => currItem.productId === item.id
          );
          if (!itemInDb) {
            return axios.post("/api/order-items", {
              orderId,
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            });
          } else {
            return axios.put(`/api/order-items/${itemInDb.id}`, {
              quantity: item.quantity,
              price: item.price,
            });
          }
        })
      );
    }

    window.localStorage.setItem("cart", "[]");
    dispatch(_resetCart());
  };
};

//reducer
const cartReducer = (state = [], action) => {
  if (action.type === SET_CART) {
    return action.cart;
  }
  if (action.type === ADD_TO_CART) {
    return [...state, action.product];
  }
  if (action.type === DELETE_FROM_CART) {
    return state.filter((product) => product.id !== action.id);
  }
  if (action.type === ADD_TO_QUANTITY) {
    return state.map((product) =>
      product.id === action.product.id ? action.product : product
    );
  }
  if (action.type === SUB_FROM_QUANTITY) {
    return state.map((product) =>
      product.id === action.product.id ? action.product : product
    );
  }
  if (action.type === RESET_CART) {
    return [];
  }
  return state;
};

export default cartReducer;
