import React, { Component } from "react";
import OrderRows from "./OrderRows";

const OrderView = () => {
  return (
    <div>
      <div className="text-5xl mb-5">Your orders</div>
      <table className="min-w-full divide-y divide-dark-grey sm:table-fixed">
        <thead className="">
          <tr>
            <th
              scope="col"
              className="py-3 text-left  text-dark-grey font-bold uppercase"
            >
              Order
            </th>
            <th
              scope="col"
              className="py-3 text-left  text-dark-grey font-bold uppercase"
            >
              Date
            </th>

            <th
              scope="col"
              className="py-3 text-left  text-dark-grey font-bold uppercase "
            >
              Status
            </th>
            <th
              scope="col"
              className="py-3 text-left  text-gray-500 font-bold uppercase "
            >
              Total
            </th>
          </tr>
        </thead>
        <OrderRows />
      </table>
    </div>
  );
};

export default OrderView;
