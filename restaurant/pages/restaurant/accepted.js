import OrderRow from "@/components/OrderRow";
import PageHeader from "@/components/PageHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Accepted = () => {
  const acceptedOrdersData = [
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

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.push("/auth/signin/restaurant");
    }
  }, [session, router]);
  return (
    <div className="max-w-full md:px-8 px-1 mx-auto mt-8">
      <PageHeader heading={"Accepted Orders"} />
      <table className="w-full bg-white shadow-lg">
        <thead>
          <tr>
            <th className="md:px-4 py-2">Customer Name</th>
            <th className="md:px-4 py-2">Dish Name</th>
            <th className="md:px-4 py-2">Price</th>
            <th className="md:px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {acceptedOrdersData.map((order) => (
            <OrderRow key={order.id} order={order} button="Deliver" />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accepted;
