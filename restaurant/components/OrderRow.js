import React from "react";

const OrderRow = ({ order, button = "" }) => {
  return (
    <tr className="border-b border-gray-300 text-center">
      <td className="md:px-4 py-2">{order.customer}</td>
      <td className="md:px-4 py-2">{order.dish}</td>
      <td className="md:px-4 py-2">{order.price}</td>
      {/* Add more table columns for other information */}
      <td className="px-4 py-2">
        {button && (
          <button className="md:px-4 px-1 py-2 text-white text-[10px] md:text-md bg-green-500 rounded-md">
            {button}
          </button>
        )}
      </td>
    </tr>
  );
};

export default OrderRow;
