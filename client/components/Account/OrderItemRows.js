import React, { Component, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchOrders } from "../../store/orders";
import format from "date-fns/format";
import isPast from "date-fns/isPast";
import { getAllProducts } from "../../store/products";

const OrderItemRows = ({ items }) => {
  return (
    <tbody className=" divide-y divide-dark-grey">
      {items.map((item) => {
        return (
          <tr key={item.id}>
            <td className="py-4 whitespace-nowrap text-lg font-medium ">
              {item.productDetails.name}
            </td>
            <td className="py-4 whitespace-nowrap text-left">
              <div className="">{item.quantity}</div>
            </td>
            <td className="py-4 whitespace-nowrap text-right">
              <div>${item.quantity * item.productDetails.price}</div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default OrderItemRows;
