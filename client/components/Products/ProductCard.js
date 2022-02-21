import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/cart";
import { useDispatch, useSelector } from "react-redux";

export const DECREMENT = "DECREMENT";
export const INCREMENT = "INCREMENT";

const ProductCard = ({ product }) => {
  // const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const currUser = useSelector((state) => state.auth);

  return (
    <div className="">
      <div className="flex flex-col group relative h-full">
        <button
          disabled={!product.quantity}
          onClick={() => {
            dispatch(addToCart(currUser, product, products, 1));
          }}
          className="uppercase py-2 border-2 border-forest-green inset-x-5 bottom-20 z-20 absolute rounded-full text-base font-bold bg-beige text-forest-green hidden group-hover:block"
        >
          {product.quantity ? "Add to cart" : "Out of Stock"}
        </button>
        <Link to={`/products/${product.slug}`}>
          <div className="relative">
            <img src={product.imageUrl[0]} alt="" />
          </div>
        </Link>
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
