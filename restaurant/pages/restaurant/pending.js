import OrderRow from "@/components/OrderRow";
import PageHeader from "@/components/PageHeader";
import React from "react";

const Pending = () => {
  const pendingOrdersData = [
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
    <div className="max-w-full md:px-8 mx-auto mt-8">
      <PageHeader heading={"Pending Orders"} />
      <table className="w-full bg-white shadow-lg">
        <thead>
          <tr>
            <th className="md:px-4 px-1 py-2">Customer Name</th>
            <th className="md:px-4 px-1 py-2">Dish Name</th>
            <th className="md:px-4 px-1 py-2">Price</th>
            <th className="md:px-4 px-1 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingOrdersData.map((order) => (
            <OrderRow key={order.id} order={order} button="Accept" />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pending;
