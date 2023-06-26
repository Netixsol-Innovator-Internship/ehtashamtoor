import { useSelector } from "react-redux";

const useBalance = () => {
  const Alltransactions = useSelector((state) => state.Alltransactions);

  const amounts = Alltransactions.transactions.map(
    (transaction) => transaction.amount
  );

  let balance = 0;
  for (let i = 0; i < amounts.length; i++) {
    balance += amounts[i];
  }
  return { balance, amounts };
};

export default useBalance;