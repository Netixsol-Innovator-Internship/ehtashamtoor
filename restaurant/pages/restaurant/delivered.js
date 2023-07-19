import OrderRow from "@/components/OrderRow";
import PageHeader from "@/components/PageHeader";
import React from "react";

const Delivered = () => {
  const DeliveredOrdersData = [
    {
      id: 1,
      customer: "John Doe",
      dish: "Pasta",
      price: "$12.99" /* other data */,
    },
    {
      id: 2,
      customer: "Jane Smith",
      dish: "Pizza",
      price: "$9.99" /* other data */,
    },
    {
      id: 3,
      customer: "Mike Johnson",
      dish: "Burger",
      price: "$8.49" /* other data */,
    },
  ];
  return (
    <div className="max-w-full md:px-8 px-1 mx-auto mt-8">
      <PageHeader heading={"Delivered Orders"} />
      <table className="w-full bg-white shadow-lg">
        <thead>
          <tr>
            <th className="md:px-4 py-2">Customer Name</th>
            <th className="md:px-4 py-2">Dish Name</th>
            <th className="md:px-4 py-2">Price</th>
            {/* <th className="px-4 py-2">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {DeliveredOrdersData.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Delivered;
