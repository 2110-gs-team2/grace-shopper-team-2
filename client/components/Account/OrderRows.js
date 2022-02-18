import React, { Component, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchOrders } from "../../store/orders";
import format from "date-fns/format";
import isPast from "date-fns/isPast";
import { getAllProducts } from "../../store/products";
import { me } from "../../store";

const OrderRows = ({ orders, auth }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.id) dispatch(fetchOrders(auth.id));
    dispatch(getAllProducts());
  }, [auth]);

  return (
    <tbody className=" divide-y divide-dark-grey">
      {orders.length ? (
        orders.map((o) => {
          return (
            <tr key={o.id}>
              <td className="py-4 whitespace-nowrap">
                <Link to={`/my-account/orders/${o.id}`}>
                  <div className="underline">{`#${o.id.split("-")[0]}`}</div>
                </Link>
              </td>
              <td className="py-4 whitespace-nowrap">
                <div className="">
                  {format(new Date(o.completedTimestamp), "MMM dd, yyy")}
                </div>
              </td>
              <td className="py-4 whitespace-nowrap">
                <div>
                  {isPast(new Date(o.completedTimestamp))
                    ? "Complete"
                    : "In Progress"}
                </div>
              </td>
              <td className="py-4 whitespace-nowrap">
                <div>{`$${o.total}`}</div>
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td>
            <div className="text-lg py-5">
              It doesn't look like you have any orders!
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
};

const mapState = ({ auth, orders, products }) => {
  console.log(orders, "what is orders");
  orders.forEach((o) => {
    const total = o.items.reduce((acc, item) => {
      acc += 1 * item.quantity * item.price;
      return acc;
    }, 0);
    o.total = total;
  });
  return { auth, orders, products };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState)(OrderRows);
