import React, { Component } from "react";
import { connect } from "react-redux";
import { isArray } from "lodash";

import Carousel from "./Carousel";
import { Minus, Plus, Sun, Frown, Scissors } from "react-feather";
import { Disclosure, Transition } from "@headlessui/react";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../store/products";
import { addToCart } from "../../store/cart";

class SingleProduct extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
      count: 1,
    };
  }

  componentDidMount() {
    window.scrollTo({ top: 0, behavior: "smooth" });

    this.props.getAllProducts();
    const { products } = this.props;
    const { slug } = this.props.match.params;
    /* If user navigates to a single product from the all products page, there is no need to call another thunk since data is already in redux store */
    if (products.length) {
      this.setState({
        product: products.find((product) => slug === product.slug),
      });
    }
  }

  componentDidUpdate() {
    const { products } = this.props;
    const { product } = this.state;
    if (!Object.keys(product).length) {
      if (isArray(products) && products.length) {
        this.setState({ product: products[0] });
      }
    }
  }

  changeQuantity = (operation) => {
    if (operation === "DECREMENT")
      this.setState({ count: this.state.count - 1 });
    if (operation === "INCREMENT")
      this.setState({ count: this.state.count + 1 });
  };

  render() {
    const { product, count } = this.state;
    const { products, addToCart } = this.props;
    const { changeQuantity } = this;
    return (
      <div className="min-h-[100vh] bg-beige">
        <div className="pt-28 p-20 max-w-[90vw] m-auto">
          <div className="flex flex-row gap-20 justify-around items-between">
            <Carousel />
            <div className="grid-cols-1 flex flex-col gap-3 basis-1/3">
              <div className="flex flex-col gap-2 pb-5 border-b-2 border-forest-green">
                <div className="text-5xl">{product.name}</div>
                <div className="text-3xl font-bold">${product.price}</div>
              </div>
              <div className="flex justify-between mt-5">
                <div className="text-lg uppercase font-bold">Size</div>
                <div className="text-lg ">{product.size}</div>
              </div>
              <div className="flex justify-between ">
                <div className="text-lg uppercase font-bold">Quantity</div>
                <div>
                  <div className="flex items-center justify-between w-28 px-2 py-1 text-base font-bold text-forest-green border-2 border-forest-green uppercase rounded-full">
                    <button onClick={() => changeQuantity("DECREMENT")}>
                      <Minus strokeWidth={2} width={18} />
                    </button>
                    <div className="text-xl text items-center flex">
                      {count}
                    </div>
                    <button onClick={() => changeQuantity("INCREMENT")}>
                      <Plus strokeWidth={2} width={18} />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={() => addToCart(product.id, products, count)}
                  className="transition-all duration-200 border-2 border-transparent hover:bg-beige hover:text-forest-green  hover:border-forest-green mt-5 block p-6 py-3 w-full text-center rounded-full text-base font-bold text-beige bg-forest-green uppercase"
                >
                  Add to cart
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="text-xl font-medium flex justify-between w-full px-4 py-3 text-left border-b-2 border-forest-green focus:outline-none ">
                        <span className="text-lg uppercase font-bold">
                          About this plant
                        </span>
                        <div className="">
                          <Plus
                            strokeWidth={1}
                            className={`absolute transition-all duration-300 ${
                              open ? "rotate-45" : " opacity-100"
                            }`}
                          />
                        </div>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-200 ease-out"
                        enterFrom="transform -translate-y-5 opacity-0"
                        enterTo="transform translate-y-0 opacity-100"
                        leave="transition duration-100 ease-out"
                        leaveFrom="transform translate-y-0 opacity-100"
                        leaveTo="transform -translate-y-5 opacity-0"
                      >
                        <Disclosure.Panel className="px-4 pt-4 pb-2">
                          <div className="flex items-center mb-3 text-lg">
                            {product.description}
                          </div>
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="text-xl font-medium flex justify-between w-full px-4 py-3 text-left border-b-2 border-forest-green focus:outline-none ">
                        <span className="text-lg uppercase font-bold">
                          Plant Care
                        </span>
                        <div className="">
                          <Plus
                            strokeWidth={1}
                            className={`absolute transition-all duration-300 ${
                              open ? "rotate-45" : " opacity-100"
                            }`}
                          />
                        </div>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-200 ease-out"
                        enterFrom="transform -translate-y-5 opacity-0"
                        enterTo="transform translate-y-0 opacity-100"
                        leave="transition duration-100 ease-out"
                        leaveFrom="transform translate-y-0 opacity-100"
                        leaveTo="transform -translate-y-5 opacity-0"
                      >
                        <Disclosure.Panel className="px-4 pt-4 pb-2">
                          <div className="flex flex-col mb-3 gap-3">
                            <div className="flex justify-between">
                              <Sun strokeWidth={1} />
                              <div className="text-lg">
                                Low to bright indirect light
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <Frown strokeWidth={1} />
                              <div className="text-lg">Toxic for pets</div>
                            </div>
                            <div className="flex justify-between">
                              <Scissors strokeWidth={1} />
                              <div className="text-lg">Easy to care</div>
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>
          <div className="mt-10">
            {products.length ? (
              <>
                <div className="text-5xl mb-5">People also browsed...</div>
                <div className="flex flex-col md:grid md:grid-cols-3 gap-5">
                  {products.slice(0, 3).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => {
      dispatch(getAllProducts());
    },
    addToCart: (productId, products, count) => {
      dispatch(addToCart(productId, products, count));
    },
  };
};

// const mapDispatchToProps = { getSingleProduct, getAllProducts };

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
