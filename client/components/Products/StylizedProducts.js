import React, { useEffect } from "react";
import { ChevronDown } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Disclosure } from "@headlessui/react";
import {
  difficultyLevels,
  lightLevels,
  sizes,
  types,
} from "../Admin/SingleInventoryForm";
import startCase from "lodash/startCase";
import ProductCard from "./ProductCard";
import queryString from "query-string";

/* To-do
- If products are already loaded in redux store, should we keep calling same thunk?
- Filter products according to query strings (currently only works for one filter)
- Create a clearFilters function
- Modify url if user manually adds any filters
- Add sort-by options and create function
*/

const StylizedProducts = (props) => {
  let queryObj = {};
  if (props.location.search.includes("?")) {
    queryObj = queryString.parse(props.location.search);
    // console.log(queryObj, "Query object"); // Remove after testing
  }

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getAllProducts());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  //---This only works with one filter criteria---
  // const currProducts = useSelector((state) => {
  //   if (Object.keys(queryObj).length) {
  //     for (const [key, value] of Object.entries(queryObj)) {
  //       if (key === "isPetFriendly") {
  //         const myBool = (value === "true");
  //         return state.products.filter(
  //           (product) => product[key] === myBool
  //         );
  //       } else {
  //         return state.products.filter(
  //           (product) => product[key] === value.toUpperCase()
  //         );
  //       }
  //     }
  //   }
  //   return state.products;
  // });

  /*
  ***In progress...probably need recursion***
  Idea - Function takes in array of object.keys from the filters and array of objects to filter. Pop first key from obj.keys arr, filter objects array with it, if obj.keys array still not empty return a call to the same func. Passing in the obj.keys( minus the one just used ) and the filtered array. Else return the filtered array
  */
  const currProducts = useSelector((state) => {
    if (Object.keys(queryObj).length) {
      for (const [key, value] of Object.entries(queryObj)) {
        if (key === "isPetFriendly") {
          const myBool = value === "true";
          return state.products.filter((product) => product[key] === myBool);
        } else {
          return state.products.filter(
            (product) => product[key] === value.toUpperCase()
          );
        }
      }
    }
    return state.products;
  });
  // console.log(currProducts, "CurrProducts"); // Remove after testing

  return (
    <div>
      <div className="min-h-[100vh] bg-beige">
        <div className="min-h-[120vh] pt-28 p-20 max-w-[90vw] m-auto">
          <div className="flex justify-between mb-5">
            <div className="text-4xl">Filter</div>
            <select className="focus:outline-none block p-6 py-3  text-center rounded-full text-base font-bold bg-forest-green text-beige uppercase">
              <option value="">Sort by</option>
            </select>
          </div>
          <div className="grid grid-cols-4 m-auto h-full gap-5 my-5">
            <div className="col-span-1 bg-beige rounded-lg">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="text-xl font-medium flex justify-between w-full px-4 py-2 text-left border-b-2 border-forest-green focus:outline-none ">
                      <span>Type</span>
                      <ChevronDown
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-forest-green transition-all duration-200`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2">
                      {types.map((type) => (
                        <div
                          key={type}
                          className="flex items-center form-check mb-3"
                        >
                          <input
                            name={type}
                            type="checkbox"
                            value={type}
                            defaultChecked={
                              Object.values(queryObj).includes(
                                type.toLowerCase()
                              )
                                ? true
                                : false
                            }
                            className="h-8 w-8 border-2 rounded-lg border-forest-green  focus:text-forest-green focus:ring-forest-green focus:outline-none checked:hover:bg-forest-green checked:bg-forest-green bg-beige"
                          />
                          <label
                            htmlFor={type}
                            className="ml-3 min-w-0 flex-1 text-lg"
                          >
                            {startCase(type.toLowerCase())}
                          </label>
                        </div>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="text-xl font-medium flex justify-between w-full px-4 py-2 text-left border-b-2 border-forest-green focus:outline-none ">
                      <span>Size</span>
                      <ChevronDown
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-forest-green transition-all duration-200`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 ">
                      {sizes.map((size) => (
                        <div
                          key={size}
                          className="flex items-center form-check mb-3"
                        >
                          <input
                            name={size}
                            type="checkbox"
                            value={size}
                            defaultChecked={
                              Object.values(queryObj).includes(
                                size.toLowerCase()
                              )
                                ? true
                                : false
                            }
                            className="h-8 w-8 border-2 rounded-lg border-forest-green  focus:text-forest-green focus:ring-forest-green focus:outline-none checked:hover:bg-forest-green checked:bg-forest-green bg-beige"
                          />
                          <label
                            htmlFor={size}
                            className="ml-3 min-w-0 flex-1 text-lg"
                          >
                            {startCase(size.toLowerCase())}
                          </label>
                        </div>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="text-xl font-medium flex justify-between w-full px-4 py-2 text-left border-b-2 border-forest-green focus:outline-none ">
                      <span>Light</span>
                      <ChevronDown
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-forest-green transition-all duration-200`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 ">
                      {lightLevels.map((light) => (
                        <div
                          key={light}
                          className="flex items-center form-check mb-3"
                        >
                          <input
                            name={light}
                            type="checkbox"
                            value={light}
                            defaultChecked={
                              Object.values(queryObj).includes(
                                light.toLowerCase()
                              )
                                ? true
                                : false
                            }
                            className="h-8 w-8 border-2 rounded-lg border-forest-green  focus:text-forest-green focus:ring-forest-green focus:outline-none checked:hover:bg-forest-green checked:bg-forest-green bg-beige"
                          />
                          <label
                            htmlFor={light}
                            className="ml-3 min-w-0 flex-1 text-lg"
                          >
                            {startCase(light.toLowerCase())}
                          </label>
                        </div>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="text-xl font-medium flex justify-between w-full px-4 py-2 text-left border-b-2 border-forest-green focus:outline-none ">
                      <span>Difficulty</span>
                      <ChevronDown
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-forest-green transition-all duration-200`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 ">
                      {difficultyLevels.map((difficulty) => (
                        <div
                          key={difficulty}
                          className="flex items-center form-check mb-3"
                        >
                          <input
                            name={difficulty}
                            type="checkbox"
                            value={difficulty}
                            defaultChecked={
                              Object.values(queryObj).includes(
                                difficulty.toLowerCase()
                              )
                                ? true
                                : false
                            }
                            className="h-8 w-8 border-2 rounded-lg border-forest-green  focus:text-forest-green focus:ring-forest-green focus:outline-none checked:hover:bg-forest-green checked:bg-forest-green bg-beige"
                          />
                          <label
                            htmlFor={difficulty}
                            className="ml-3 min-w-0 flex-1 text-lg"
                          >
                            {startCase(difficulty.toLowerCase())}
                          </label>
                        </div>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="text-xl font-medium flex justify-between w-full px-4 py-2 text-left border-b-2 border-forest-green focus:outline-none ">
                      <span>Pet-friendly</span>
                      <ChevronDown
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-forest-green transition-all duration-200`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 ">
                      <div className="flex items-center form-check mb-3">
                        <input
                          name="petFriendly"
                          type="checkbox"
                          value={false}
                          defaultChecked={
                            Object.keys(queryObj).includes("isPetFriendly")
                              ? true
                              : false
                          }
                          className="h-8 w-8 border-2 rounded-lg border-forest-green  focus:text-forest-green focus:ring-forest-green focus:outline-none checked:hover:bg-forest-green checked:bg-forest-green bg-beige"
                        />
                        <label
                          htmlFor="petFriendly"
                          className="ml-3 min-w-0 flex-1 text-lg"
                        >
                          Pet-friendly
                        </label>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <button className="mt-5 uppercase p-6 py-3 w-full border-2 border-forest-green rounded-full text-base font-bold bg-beige text-forest-green ">
                Clear filters
              </button>
            </div>
            <div className="col-span-3  bg-beige rounded-lg px-5 ">
              <div className="flex flex-col md:grid md:grid-cols-3 gap-5">
                {currProducts.length
                  ? currProducts.map((product) => (
                      <ProductCard product={product} key={product.id} />
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylizedProducts;
