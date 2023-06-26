import React from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import useBalance from "../hook/useBalance";

export const Balance = () => {
  const { balance } = useBalance();
  console.log(balance);

  //   useEffect(() => {
  //     if (balance < 0) {
  //       // toast here
  //       toast.error("Balance cannot be negative");
  //     }
  //   }, [balance]);

  return (
    <div className="balance-box text-center">
      <h6>Your Balance:</h6>
      <h2>${balance > 0 ? balance : 0}</h2>
      <hr />
    </div>
  );
};
