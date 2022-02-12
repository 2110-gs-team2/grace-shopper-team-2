import { Tab } from "@headlessui/react";
import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { getAllProducts } from "../../store/products";
import users, { fetchUsers } from "../../store/users";
import SingleInventory from "./SingleInventory";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const InventoryList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(fetchUsers());
  }, []);

  let [categories] = useState({
    Inventory: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Users: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
  });

  return (
    <div className="w-full px-2  sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-forest-green rounded-xl">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "text-lg uppercase w-full py-2.5 leading-5 font-medium text-forest-green rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-forest-green ring-beige ring-opacity-60",
                  selected
                    ? "bg-beige shadow"
                    : "text-blue-100 hover:bg-beige/[0.12] hover:text-beige"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2 bg-forest-green rounded-lg p-5">
          <Tab.Panel className="rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-forest-green ring-beige ring-opacity-60">
            <ul className="grid grid-cols-2 gap-5">
              {products.map((p) => (
                <li
                  key={p.id}
                  className="bg-beige rounded-md hover:bg-coolGray-100 flex"
                >
                  <div
                    style={{ backgroundImage: "url('/img/HomePage-1.jpg')" }}
                    className="w-1/2 bg-no-repeat rounded-lg bg-center bg-cover"
                  ></div>
                  <div className="p-5 grow">
                    <div className="border-b border-dark-grey pb-2">
                      <span className="font-bold uppercase leading-5">
                        {p.name}
                      </span>
                    </div>
                    <div className="my-2 flex flex-col gap-2">
                      <div className="flex justify-between">
                        <div>Quantity</div>
                        <div>{p.quantity}</div>
                      </div>
                      <div className="flex justify-between">
                        <div>Price</div>
                        <div>${p.price}</div>
                      </div>
                      <div className="flex justify-between">
                        <div>Type</div>
                        <div>{p.type}</div>
                      </div>
                      <div className="flex justify-between">
                        <div>Size</div>
                        <div>{p.size}</div>
                      </div>
                      <SingleInventory product={p}/>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel className="rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-forest-green ring-beige ring-opacity-60">
            <ul className="flex flex-col gap-5">
              {users.map((u, idx) => (
                <li
                  key={idx}
                  className="p-5 bg-beige rounded-md hover:bg-coolGray-100 flex"
                >
                  {u.firstName}
                </li>
              ))}
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

const mapState = ({ products }) => {
  return { products };
};

export default connect(mapState)(InventoryList);
