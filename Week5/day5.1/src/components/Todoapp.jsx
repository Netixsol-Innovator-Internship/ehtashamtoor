import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import Todo from "./Todo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Todoapp = () => {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);

  const { user, logOut } = useAuth();

  const getTodos = async () => {
    let resp = await axios.get(`${process.env.REACT_APP_URL}/`);
    console.log(resp.data.message);

    if (resp.data.message === "redirect to login") {
      navigate("/login");
    }
  };

  useLayoutEffect(() => {
    // getTodos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // apply code here to send data
  };
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
      toast.success("logout success");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="flex flex-col items-center gap-8 bg-gradient-to-r from-[#622a95] to-[#1c3160] w-screen h-screen">
      <button
        className="text-white"
        onClick={() => {
          handleLogout();
        }}
      >
        logout
      </button>
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
  );
};

export default Todoapp;
