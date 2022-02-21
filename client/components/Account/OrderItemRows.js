import React from "react";

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
              <div>${item.quantity * item.price}</div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default OrderItemRows;
