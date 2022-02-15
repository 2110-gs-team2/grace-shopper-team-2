//action types
const SET_CART = 'SET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';

//action creators
const _setCart = (cart) => {
  return {
    type: SET_CART,
    cart
  };
};
const _addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product
  };
};
const _deleteFromCart = (id) => {
  return {
    type: DELETE_FROM_CART,
    id
  }
};

//thunks
export const fetchCart = () => {
  return (dispatch)=> {
    window.localStorage.cart ?
      dispatch(_setCart(JSON.parse(window.localStorage.getItem('cart')))) 
    : 
      window.localStorage.setItem('cart', JSON.stringify([]))
      dispatch(_setCart(JSON.parse(window.localStorage.getItem('cart'))));
  }
};
export const addToCart = (id, productArray) => {
  return (dispatch) => {
    //pull localStorage cart
    const cart = JSON.parse(window.localStorage.getItem('cart'));
    //find product to add from store
    const product = productArray.find(product => id === product.id);
    //find & discover if product already in cart
    const productCheck = cart.find(product => product.id === id)
    //if not in cart, push to cart & dispatch to store
    if(!productCheck) {
      cart.push(product);
      dispatch(_addToCart(product));
    } else {
      console.log('Product already in cart');
    };
    //send cart back to localStorage
    const cartJSON = JSON.stringify(cart);
    window.localStorage.setItem('cart', cartJSON)
  }
};
export const removeFromCart = (id) => {
  return (dispatch) => {
    //pull localStorage cart
    const cart = JSON.parse(window.localStorage.getItem('cart'))
    //filter out product
    const filterdCart = cart.filter(product => product.id !== id);
    //send filteredCart back to localStorage
    const cartJSON = JSON.stringify(filterdCart);
    window.localStorage.setItem('cart', cartJSON);
    //send product id to be removed from state
    dispatch(_deleteFromCart(id))

  }
};

//reducer
const cartReducer = (state=[], action) => {
  if(action.type === SET_CART) {
    return action.cart;
  };
  if(action.type === ADD_TO_CART) {
    return  [...state, action.product]
  };
  if(action.type === DELETE_FROM_CART) {
    return state.filter(product => product.id !== action.id);
  };
  return state;
};

export default cartReducer;