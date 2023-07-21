import axios from "axios";
import React, { useEffect, useState } from "react";

const ordersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const resp = await axios.get("/api/orders");

      if (resp.data.success) {
        setOrders(resp.data.orders);
        console.log(resp.data.orders);
        console.log(resp.data.message);
      } else {
        console.log(resp.data.message);
      }
    };

    getOrders();
  }, []);

  return <div>{JSON.stringify(orders, null, 4)}</div>;
};

export default ordersPage;
