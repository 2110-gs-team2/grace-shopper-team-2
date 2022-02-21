import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import format from "date-fns/format";
import isPast from "date-fns/isPast";
import OrderItemRows from "./OrderItemRows";
import { ChevronLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import { fetchOrders } from "../../store/orders";

const OrderDetails = ({ order, auth }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders(auth.id));
  }, []);

  return (
    <div className="flex flex-col">
      <button onClick={history.goBack} className="flex gap-2">
        <ChevronLeft strokeWidth={1} />
        <span className="text-md">Go back</span>
      </button>
      {order ? (
        <>
          <div className="text-5xl mb-5">
            Order <span>{`#${order.id.split("-")[0]}`}</span>
          </div>
          <div>
            Purchased{" "}
            {format(new Date(order.completedTimestamp), "MMM dd, yyy")} |
            Status:
            {isPast(new Date(order.completedTimestamp))
              ? " Complete"
              : " In Progress"}
          </div>
          <table className="min-w-full table-auto mt-5">
            <thead className="border-b-2 border-forest-green">
              <tr>
                <th
                  scope="col"
                  className="py-3 text-left  text-dark-grey font-bold uppercase"
                >
                  Items
                </th>
                <th
                  scope="col"
                  className="py-3 text-left  text-dark-grey font-bold uppercase "
                >
                  Quantity
                </th>

                <th
                  scope="col"
                  className="py-3 text-left  text-gray-500 font-bold uppercase w-12"
                >
                  Total
                </th>
              </tr>
            </thead>
            <OrderItemRows items={order.orderItems} />
          </table>
          <div className="mt-5 flex flex-col self-end border-t-2 border-forest-green w-1/2 py-5 gap-3">
            <div className="flex justify-between">
              <div className="uppercase">Subtotal</div>
              <div>${`${order.subtotal}`}</div>
            </div>
            <div className="flex justify-between">
              <div className="uppercase">Shipping</div>
              <div>Free</div>
            </div>
            <div className="flex justify-end border-t border-dark-grey py-5 ">
              <div className="">${`${order.subtotal}`}</div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

const mapState = ({ auth, orders, products }, { params }) => {
  const order = orders.filter((o) => o.id === params.id)[0];
  if (order) {
    order.subtotal = order.orderItems.reduce((acc, item) => {
      acc += 1 * item.quantity * item.price;
      return acc;
    }, 0);
    order.orderItems.forEach((i) => {
      const product = products.find((p) => p.id === i.productId);
      i.productDetails = product;
    });
  }

  return { auth, order };
};

export default connect(mapState)(OrderDetails);
