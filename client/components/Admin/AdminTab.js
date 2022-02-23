import { Tab } from "@headlessui/react";
import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { getAllProducts } from "../../store/products";
import { fetchUsers } from "../../store/users";
import SingleInventory from "./SingleInventory";
import WarningModal from "./WarningModal";
import toast, { Toaster } from "react-hot-toast";
import { Check } from "react-feather";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const triggerBanner = (operation) =>
  toast((t) => {
    return (
      <div className="flex flex-row gap-2 w-full items-center">
        <div className="w-5 h-5 p-1  flex items-center justify-center bg-beige rounded-full">
          <Check className="text-forest-green" />
        </div>
        <div className="text-base">
          Successfully {`${operation}${operation === "add" ? "e" : ""}`}d
        </div>
      </div>
    );
  });

const AdminTab = () => {
  let [categories] = useState(["Inventory", "Users"]);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="w-full px-2  sm:px-0">
      <div>
        <Toaster
          toastOptions={{
            className: "bg-forest-green text-white",
          }}
        />
      </div>
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-forest-green rounded-xl">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "text-xl w-full py-2.5 leading-5 font-medium text-forest-green rounded-lg",
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
          <Tab.Panel className="rounded-lg">
            <ul className="grid grid-cols-2 gap-5">
              {products.map((p) => (
                <li key={p.id} className="bg-beige rounded-lg flex">
                  <div
                    style={{ backgroundImage: `url('${p.imageUrl[0]}')` }}
                    className="w-1/2 bg-no-repeat rounded-lg bg-center bg-cover"
                  ></div>
                  <div className="p-5 grow">
                    <div className="border-b border-dark-grey pb-2">
                      <span className="font-bold uppercase leading-5">
                        {p.name}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-col gap-2">
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
                      <SingleInventory
                        product={p}
                        triggerBanner={triggerBanner}
                      />
                      <WarningModal
                        productId={p.id}
                        triggerBanner={triggerBanner}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel className="rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-forest-green ring-beige ring-opacity-60">
            <ul className="grid grid-cols-4 gap-5">
              {users.map((u, idx) => (
                <li key={idx} className="p-5 bg-beige rounded-lg flex flex-col">
                  <div className="font-bold uppercase leading-5 border-b border-dark-grey pb-2 grow">
                    {u.firstName} {u.lastName}
                  </div>
                  <div className="mt-2 flex flex-col gap-2">
                    <div className="flex justify-between">
                      <div className="">Email</div>
                      <div>{u.email}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Role</div>
                      <div>{u.role}</div>
                    </div>
                  </div>
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

export default connect(mapState)(AdminTab);
