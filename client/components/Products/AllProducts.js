import React, { useEffect, useState } from "react";
import { ChevronDown, Filter } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Disclosure } from "@headlessui/react";
import {
  difficultyLevels,
  lightLevels,
  sizes,
  types,
} from "../Admin/SingleInventoryForm";
import startCase from "lodash/startCase";
import queryString from "query-string";
import Pagination from "./Pagination";

const AllProducts = (props) => {
  const [queryObj, setQueryObj] = useState({});
  const [sortBy, setSortBy] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setFilter(getQueryObjectFromUrl());
  }, []);

  const changeSort = (evt) => {
    setSortBy(evt.target.value);
  };

  const clearFilters = (evt) => {
    setFilter({});
  };

  const filterChange = (name, filterValue, evt) => {
    const qo = Object.assign({}, queryObj);
    if (!qo[name]) {
      qo[name] = filterValue.toLowerCase();
    } else {
      if (Array.isArray(queryObj[name])) {
        if (evt.target.checked) {
          qo[name].push(filterValue.toLowerCase());
        } else {
          qo[name] = qo[name].filter((z) => z !== filterValue.toLowerCase());
          if (!qo[name].length) delete qo[name];
        }
      } else {
        if (evt.target.checked) {
          qo[name] = [qo[name]];
          qo[name].push(filterValue.toLowerCase());
        } else {
          delete qo[name];
        }
      }
    }
    setFilter(qo);
  };

  const getQueryObjectFromUrl = () => {
    return props.location.search.includes("?")
      ? queryString.parse(props.location.search)
      : {};
  };

  const getNewLocationFromQueryObj = (filter) => {
    let newQueryString = queryString.stringify(filter);
    newQueryString = newQueryString === "" ? "" : "?" + newQueryString;
    return window.location.href.split("?")[0] + newQueryString;
  };

  const getSizeInt = (size) => {
    switch (size.toLowerCase()) {
      case "x-small":
        return 0;
      case "small":
        return 1;
      case "medium":
        return 2;
      case "large":
        return 3;
      default:
        return -1;
    }
  };

  const isInFilter = (name, filterValue) => {
    return Object.entries(queryObj).some(([key, val]) => {
      if (key === name) {
        if (Array.isArray(val)) {
          return val.includes(filterValue.toLowerCase());
        } else {
          return filterValue.toLowerCase() === String(val).toLowerCase();
        }
      }
    });
  };

  const setBrowserQueryStringFromObj = (filter) => {
    window.history.pushState(null, "", getNewLocationFromQueryObj(filter));
  };

  const setFilter = (filter) => {
    setBrowserQueryStringFromObj(filter);
    setQueryObj((prevState) => {
      return { ...filter };
    });
  };

  const currProducts = useSelector((state) => {
    const products = state.products.filter((product) =>
      Object.entries(queryObj).every(([key, val]) => {
        if (val === "") return;
        if (Array.isArray(val)) {
          return val.some(
            (v) =>
              String(v).toUpperCase() === String(product[key]).toUpperCase()
          );
        } else {
          return (
            String(product[key]).toUpperCase() === String(val).toUpperCase()
          );
        }
      })
    );

    if (sortBy === "name") {
      return products.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
    } else if (sortBy === "price") {
      return products.sort((a, b) =>
        Number(a[sortBy]) > Number(b[sortBy]) ? 1 : -1
      );
    } else if (sortBy === "size") {
      return products.sort((a, b) =>
        getSizeInt(a[sortBy]) > getSizeInt(b[sortBy]) ? 1 : -1
      );
    }
    return products;
  });

  return (
    <div>
      <div className="min-h-[100vh] py-20 bg-beige">
        <div className="min-h-[120vh] md:p-20 pt-0 max-w-[90vw] m-auto">
          <div className="flex justify-between mb-5">
            <div className="text-3xl md:block hidden">
              Results ({currProducts.length})
            </div>
            <select
              defaultValue=""
              onChange={(evt) => changeSort(evt)}
              className="focus:outline-none block p-6 py-3 text-center rounded-full text-base font-bold bg-forest-green text-beige focus:border-forest-green focus:ring-2 focus:ring-xlight-green"
            >
              <option value="" disabled>
                SORT BY
              </option>
              <option value="name">Name (a → z)</option>
              <option value="price">Price (low → high)</option>
              <option value="size">Size (small → large)</option>
            </select>
          </div>
          <div className="grid grid-cols-4 m-auto h-full gap-5 my-5">
            <div className="col-span-1 bg-beige rounded-lg md:block hidden">
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
                            onChange={(evt) => filterChange("type", type, evt)}
                            value={type}
                            checked={isInFilter("type", type)}
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
                            onChange={(evt) => filterChange("size", size, evt)}
                            value={size}
                            checked={isInFilter("size", size)}
                            className="h-8 w-8 border-2 rounded-lg border-forest-green  focus:text-forest-green focus:ring-forest-green focus:outline-none checked:hover:bg-forest-green checked:bg-forest-green bg-beige"
                          />
                          <label
                            htmlFor={size}
                            className="ml-3 min-w-0 flex-1 text-lg"
                          >
                            {size[0] === "X"
                              ? size.slice(0, 3) + size.slice(-4).toLowerCase()
                              : startCase(size.toLowerCase())}
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
                            onChange={(evt) =>
                              filterChange("light", light, evt)
                            }
                            value={light}
                            checked={isInFilter("light", light)}
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
                            onChange={(evt) =>
                              filterChange("difficulty", difficulty, evt)
                            }
                            checked={isInFilter("difficulty", difficulty)}
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
                          name="isPetFriendly"
                          type="checkbox"
                          value={false}
                          onChange={(evt) =>
                            filterChange(
                              "isPetFriendly",
                              String(evt.target.checked),
                              evt
                            )
                          }
                          checked={isInFilter("isPetFriendly", "true")}
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
              <button
                onClick={(evt) => clearFilters(evt)}
                className="mt-5 uppercase p-6 py-3 w-full border-2 border-forest-green rounded-full text-base font-bold bg-beige text-forest-green "
              >
                Clear filters
              </button>
            </div>
            <Pagination currProducts={currProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
