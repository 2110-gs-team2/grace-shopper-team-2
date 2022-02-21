import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Minus, Plus } from "react-feather";
import { removeFromCart, subFromQuantity, addToCart } from "../../store/cart";

const CartCard = (props) => {
  const { product, products } = props;
  const currUser = useSelector((state) => state.auth);

  //redux hooks
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row gap-5 pr-1">
      <img src={product.imageUrl} className=" object-contain w-24" alt="" />
      {/* <img src="/img/HomePage-1.jpg" className=" object-contain w-24" alt="" /> */}
      <div className="flex grow flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <span className="text-xl font-medium">{product.name}</span>
            <button
              onClick={() => {
                dispatch(removeFromCart(currUser, product.id));
              }}
            >
              <Trash2 strokeWidth={1} width={20} height={20} />
            </button>
          </div>
          <div className="m-0">
            <span className="text-sm uppercase">
              {product.type} | {product.size}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold uppercase leading-5">
            ${product.price}
          </span>
          <div className="flex items-center justify-between w-28 px-2 py-1 text-base font-bold text-forest-green border-2 border-forest-green uppercase rounded-full">
            <button
              disabled={product.quantity < 2}
              onClick={() => {
                dispatch(subFromQuantity(currUser, product, products));
              }}
            >
              <Minus strokeWidth={2} width={18} />
            </button>
            <span className="text-xl inline-block align-middle">
              {product.quantity}
            </span>
            <button
              onClick={() => {
                const productInfo = products.filter(
                  (p) => p.id === product.productId
                )[0];
                if (currUser.id) {
                  dispatch(addToCart(currUser, productInfo, products, 1));
                } else {
                  dispatch(addToCart(currUser, product, products, 1));
                }
              }}
            >
              <Plus strokeWidth={2} width={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
