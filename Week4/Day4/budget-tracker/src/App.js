import "./App.css";
import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { IncomeExpense } from "./components/IncomeExpense";
import { TransHistory } from "./components/TransHistory";
import { AddTransaction } from "./components/AddTransaction";
import { Toaster } from "react-hot-toast";

function App() {
  return (
      <div className="App">
        <Toaster position="bottom-center" />
        <Header />
        <Balance />

        <IncomeExpense />
        <TransHistory />
        <AddTransaction />
      </div>
  );
}

export default App;
