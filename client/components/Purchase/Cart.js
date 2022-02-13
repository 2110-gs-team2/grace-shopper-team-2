// Component REACTO Information:

// Restate Needs:
// This component is required to showcase the following:
// Display products they've added to a cart with quantity & ability to:
// * +/- quantity
// * delete from cart
// * place order via a button
// If no user logged in: same functionality applied to a 'guest' identity
// If place order button clicked:
// * create user account if not a logged-in user
// * initiate final order confirmation component (Order comp????)
// * clearout products from the user's cart

// Example:
// Logged in user places 4 products into their cart
// * The user clicks on their cart icon from the general header html
// * The user is presented with their cart to review
// * The user makes an update to their cart by increasing the quantitiy of
// one product from 1 to 2
// * The user makes a change by clicking a delte button next to a product
// * The user clicks a 'Proceed to Checkout' button when satisfied

// Approach: (As a Todo list, 'DONE' denotes an step that has been coded)
// The following parts will be used to build out this React component:
// * localStorage of the browser to contain products and user Id data
// * DONE - user Id will be pulled from localStorage via current webToken
// * un-ordered list elements to display products user has placed into localStorage
// * user will place products into localStorage via an 'add to cart' button from
// within the Products and/or ProductsDetail components
// * a 'proceed to checkout' button will present user with a Order component spa to finalize order

// Code: Please see following 'code starts here' line

//Testing: There is no testing component at this time, though subject to change if needed

//Optimize:
// * would like to try using local state to help manipulate localStorage or populate, if able?
//Why?:  May be needed when handling events? (Not sure yet)

//* Code starts here *//

import React, { useState } from "react";
import { useSelector } from "react-redux";

//Component
const Cart = () => {
  //hook to pull in redux store
  const myState = useSelector((state) => {
    return state;
  });

  //local state hooks initiated here
  // let due to how a product is removed from state in the removeProduct function
  let [localProducts, setProducts] = useState(
    //eval if localStorage already has products
    !window.localStorage.products
      ? []
      : JSON.parse(window.localStorage.getItem("products"))
  );

  console.log(localProducts);

  //getting auth properties from myState (redux store)
  const auth = myState.auth;

  //Local Storage setup
  // JSON (stringify,parse) needed to keep array integrity for productSample
  const productsJson = JSON.stringify(localProducts);
  //localStorage needs a key:value pair is loaded using class method
  window.localStorage.setItem("products", productsJson);
  // variable used to retrieve localStorage data
  const products = JSON.parse(window.localStorage.getItem("products"));

  // test data for localStorage (to delete when store is up)
  //this test pulls productSample data into local storage, back out into test html

  //products api test data
  const productsSample = [
    {
      id: "edb91c76-4427-4385-8506-16a8cad13fa5",
      name: "Snake Plant Laurentii",
      description:
        'The Snake Plant Laurentii, or Sansevieria trifasciata "Laurentii", is a succulent plant characterized by its upright sword-like leaves with vibrant yellow edges. It is popular for its incredibly easy-going nature – it can tolerate low light and drought – and its air-purifying capabilities. The easiest way to kill this plant is to over care for it!',
      type: "SUCCULENT",
      price: "80.00",
      quantity: 94,
      size: "X-SMALL",
      isPetFriendly: true,
      light: "LOW",
      difficulty: "EXPERT",
      createdAt: "2022-02-08T00:56:21.650Z",
      updatedAt: "2022-02-08T00:56:21.650Z",
    },
    {
      id: "5114cad9-4419-4241-af54-fcee5f9d4cdf",
      name: "Anthurium Plant",
      description:
        "Anthurium is all about style. Magazine-cover style. Social-media-influencer style. Red-carpet style. With its big blooms, bold color and mood-lifting tropical vibe, we keep one to brighten up our home and another to give as a gift.",
      type: "HERB",
      price: "79.00",
      quantity: 40,
      size: "LARGE",
      isPetFriendly: false,
      light: "INDIRECT",
      difficulty: "MODERATE",
      createdAt: "2022-02-08T00:56:21.649Z",
      updatedAt: "2022-02-08T00:56:21.649Z",
    },
    {
      id: "11ee3b42-98f3-484e-84be-d8de932903b5",
      name: "ZZ Plant",
      description:
        "The ZZ Plant is characterized by its waxy green leaves above the surface of its potting mix, and its large potato-like rhizomes underneath. These rhizomes store water, making the ZZ a hardy, drought-tolerant houseplant that only needs water every few weeks.",
      type: "HERB",
      price: "108.00",
      quantity: 105,
      size: "X-SMALL",
      isPetFriendly: true,
      light: "LOW",
      difficulty: "MODERATE",
      createdAt: "2022-02-08T00:56:21.650Z",
      updatedAt: "2022-02-08T00:56:21.650Z",
    },
  ];

  //inline css styling for TEST output
  const tableStyle = {
    borderCollapse: "collapse",
    border: "2px solid rgb(200, 200, 200)",
    letterSpacing: "1px",
    fontFamily: "sans-serif",
    fontSize: ".8rem",
    margin: "0 auto",
  };
  const tableBody = {
    backgroundColor: "#e4f0f5",
  };

  const th = {
    border: "1px solid rgb(190, 190, 190)",
    padding: "5px 10px",
  };

  const td = {
    border: "1px solid rgb(190, 190, 190)",
    padding: "5px 10px",
  };

  const buttonAlign = {
    display: "flex",
    justifyContent: "center",
  };

  const h1 = {
    textAlign: "center",
  };

  //Functions to add/remove/adjust quantity

  //function to remove product from localStorage array and return new array
  const removeProduct = (id, array) => {
    const filteredProducts = array.filter((elem) => elem.id !== id);
    return setProducts((localProducts = filteredProducts));
  };

  //function to add product to cart if product button id matches mapped product from sample
  const addProduct = (id, productArray) => {
    //eval if product already in cart and show alert if needed
    const productCheck = localProducts.find((product) => product.id === id);
    if (productCheck) return console.log("Product already in the cart");
    const product = productArray.find((product) => {
      return product.id === id;
    });
    return setProducts(localProducts.concat(product));
  };

  //locates quantity for product via querySelector then decrements innerHtml value
  //activated via button onClick
  const subtractQuantity = () => {
    const quantity = document.querySelector("#quantity");

    if (quantity.innerHTML > 1) {
      return (quantity.innerHTML = quantity.innerHTML * 1 - 1);
    } else return "Quantity Limit Reached";
  };
  //locates quantity for product via querySelector then increments innerHtml value
  //activated via button onClick
  const addQuantity = () => {
    const quantity = document.querySelector("#quantity");
    if (quantity.innerHTML < 5) {
      return (quantity.innerHTML = quantity.innerHTML * 1 + 1);
    } else return "Quantity Limit Reached";
  };

  //html/Jsx where user & localStorage is mapped onto webpage
  return (
    <div
      style={{ position: "relative", top: "10em" }}
      className="cart-container"
    >
      <div style={{ textAlign: "center" }}>
        <h1>{`Test Output: Cart Page for ${auth.firstName} ${auth.lastName}`}</h1>
      </div>
      {localProducts.length < 1 ? (
        <h1 style={h1}>Your cart is empty</h1>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Type</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody style={tableBody}>
            {localProducts.map((product) => (
              <tr key={product.id}>
                <th style={th}>{product.name}</th>
                <td style={td}>{product.type}</td>
                <td style={td}>{product.price}</td>
                <td style={td}>
                  <button
                    onClick={() => {
                      console.log(subtractQuantity(product.id));
                    }}
                  >
                    -{" "}
                  </button>
                  <span id="quantity"> 1 </span>
                  <button
                    onClick={() => {
                      console.log(addQuantity(product.id));
                    }}
                  >
                    {" "}
                    +
                  </button>
                </td>
                <td style={td}>
                  <button
                    onClick={() => {
                      removeProduct(product.id, localProducts);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={buttonAlign}>
        <button
          onClick={() => {
            addProduct(productsSample[0].id, productsSample);
          }}
          className="block mt-5 p-6 py-3 w-25 text-center rounded-full text-base font-bold bg-forest-green text-beige uppercase"
        >
          Product A
        </button>
        <button
          onClick={() => {
            addProduct(productsSample[1].id, productsSample);
          }}
          className="block mt-5 p-6 py-3 w-25 text-center rounded-full text-base font-bold bg-forest-green text-beige uppercase"
        >
          Product B
        </button>
        <button
          onClick={() => {
            addProduct(productsSample[2].id, productsSample);
          }}
          className="block mt-5 p-6 py-3 w-25 text-center rounded-full text-base font-bold bg-forest-green text-beige uppercase"
        >
          Product C
        </button>
      </div>
    </div>
  );
};

export default Cart;
