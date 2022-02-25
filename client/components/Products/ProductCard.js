import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/cart";
import { useDispatch, useSelector } from "react-redux";

export const DECREMENT = "DECREMENT";
export const INCREMENT = "INCREMENT";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const currUser = useSelector((state) => state.auth);
  return (
    <div className="">
      <div className="flex flex-col group relative h-full">
        <div className="flex flex-row gap-3 absolute top-3 left-3 z-10 m-0">
          {product.quantity < 10 && product.quantity !== 0 ? (
            <div className="py-4 px-4 min-w-fit h-6 rounded-full bg-forest-green text-white uppercase font-bold text-sm flex flex-col justify-center">
              Low on stock
            </div>
          ) : null}
          {product.isNew ? (
            <div className="py-4 px-4 min-w-fit h-6 rounded-full bg-forest-green text-white uppercase font-bold text-sm flex flex-col justify-center">
              New
            </div>
          ) : null}
          {product.isStaffFavorite ? (
            <div className="py-4 px-4 min-w-fit h-6 rounded-full bg-forest-green text-white uppercase font-bold text-sm flex flex-col justify-center">
              Staff Favorite
            </div>
          ) : null}
        </div>
        <div className="relative">
          <Link to={`/products/${product.slug}`}>
            <div className="relative">
              <img src={product.imageUrl[0]} className="w-full" alt="" />
            </div>
          </Link>
          <button
            disabled={!product.quantity}
            onClick={() => {
              dispatch(addToCart(currUser, product, products, 1));
            }}
            className=" bottom-5 disabled:bg-stone-300 disabled:border-stone-300 disabled:text-beige uppercase py-2 border-2 border-forest-green inset-x-5 z-10 absolute rounded-full text-base font-bold bg-beige text-forest-green hidden group-hover:block"
          >
            {product.quantity ? "Add to cart" : "Out of Stock"}
          </button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-xl font-medium">{product.name}</div>
          <div className="text-xl font-bold">${product.price}</div>
        </div>
        <div className="uppercase text-dark-grey text-sm">{product.size}</div>
      </div>
    </div>
  );
};

export default ProductCard;
