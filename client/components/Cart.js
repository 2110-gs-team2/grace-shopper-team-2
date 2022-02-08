import React from 'react';
import { useSelector } from 'react-redux';

//Component
const Cart = () => {
  const state = useSelector((state) => {
    return state;
  });
  
  return (
    <div>
      <h1>Todo: Cart Page</h1>
    </div>
  );

};

export default Cart;