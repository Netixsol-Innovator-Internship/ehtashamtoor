import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { useState } from "react";
import "../App.css";
// axios.defaults.withCredentials = false;

const Todo = ({ todo, getTodos }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const DeleteTodo = async (id) => {
    let resp = await axios.delete(
      `${process.env.REACT_APP_API_URL}/deleteTodo?id=${id}`
    );
    console.log(resp);
    const { message } = resp.data;
    if (message === "todo deleted") {
      toast("Todo deleted successfully");
      getTodos();
    }
  };

  const EditTodo = (id) => {
    setIsEdit(true);
    console.log(id);
  };

  // function to change value of existing todo
  const handleEditTodo = async (id) => {
    // console.log(id);
    let editedtodo = {
      id,
      value: inputVal,
    };
    console.log(editedtodo);

    const resp = await axios.post(`${process.env.REACT_APP_API_URL}/editTodo`, {
      editedtodo,
    });
    // console.log(resp.data);
    if (resp.data.message === "Todo Edit") {
      toast("Todo Edited Successfully");
      setIsEdit(false);
      getTodos();
    }
  };
  return (
    <>
      {isEdit ? (
        <div
          className="wrapperPopUp"
          // onClick={() => {
          //   setIsEdit(false);
          // }}
        >
          <div className="editPopBox bg-gradient-to-r from-purple-600 to-blue-600 w-fit">
            <button
              className="absolute font-bold text-emerald-400"
              onClick={() => {
                setIsEdit(false);
              }}
            >
              X
            </button>
            <form
              className="flex flex-col gap-4 items-center"
              onSubmit={(e) => {
                e.preventDefault();
                handleEditTodo(todo.id);
              }}
            >
              <div className="flex flex-col gap-4 items-center">
                <label
                  htmlFor="value"
                  className="text-white text-sm xsm:text-2xl"
                >
                  Enter a todo to edit
                </label>
                <input
                  type="text"
                  id="value"
                  className="py-1 px-2  bg-transparent border-2 focus:outline-0 rounded-md text-white w-10/12 sm:w-80 md:w-96"
                  placeholder="Write a todo"
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                  }}
                />
              </div>
              <button
                type="submit"
                className="font-semibold md:px-4 md:py-2 text-white border-2 hover:bg-emerald-600 hover:border-emerald-600 w-10/12 sm:w-80 md:w-96"
              >
                EDIT
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-600 w-full flex justify-between items-center my-2 shadow-black-400 shadow-md">
          <div className="px-1 py-2 text-white">{todo.value}</div>
          <div className="flex gap-4">
            <button
              className="font-semibold p-1 hover:text-emerald-400"
              onClick={() => {
                EditTodo(todo.id);
              }}
            >
              <MdEditSquare size={25} />
            </button>
            <button className="font-semibold p-1 text-red-700">
              <MdDelete
                size={25}
                onClick={() => {
                  DeleteTodo(todo.id);
                }}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
