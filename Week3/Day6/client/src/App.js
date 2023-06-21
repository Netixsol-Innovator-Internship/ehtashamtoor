import Todo from "./components/Todo";
import "./App.css";
import { useState, useRef, useLayoutEffect } from "react";
import axios from "axios";
import { v4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState("");

  const getTodos = async () => {
    let resp = await axios.get("http://localhost:5000/");
    console.log(resp.data.message);
    setTodos(resp.data.todos);
  };

  useLayoutEffect(() => {
    getTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newTodo = {
      id: v4(),
      value: inputVal,
    };
    // console.log("input value:", newTodo);

    const resp = await axios.post("http://localhost:5000/addTodo", { newTodo });
    console.log(resp.data);
    if (resp.data.message === "Todo empty") {
      toast("Todo cannot be left empty");
      return;
    }
    if (resp.data.message === "Todo Added") {
      toast("Todo added Successfully");
      getTodos();
      setInputVal("");
    }
  };
  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-r from-purple-600 to-blue-600 flex flex-col items-center gap-8">
        <h1 className="text-4xl font-semibold my-10 text-white">TODO UNIQUE</h1>
        <div className="w-fit lg:w-4/12">
          <form
            className="flex flex-col gap-3 md:flex-row md:justify-between"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="py-1 px-2 w-60 xsm:w-80 sm:w-80 md:w-96 shadow-black-400 shadow-lg"
              placeholder="Enter your new Todo"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
            />
            <button
              type="submit"
              className="font-semibold md:px-4 md:py-2 text-white border-2 hover:bg-emerald-600 hover:border-emerald-600 shadow-black-400 shadow-lg"
            >
              Add
            </button>
          </form>
        </div>
        <div className="w-60 xsm:w-80 sm:w-80 md:w-96 lg:w-4/12">
          {todos.map((todo) => {
            return <Todo key={todo.id} todo={todo} getTodos={getTodos} />;
          })}
        </div>
      </div>
      <Toaster position="bottom-center" />
    </>
  );
}
export default App;
