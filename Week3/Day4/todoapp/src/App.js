import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 } from "uuid";

// setting a name to store our todos array.
const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  // making todos array for storing todos
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  // whenever the todos array changes we set the array to LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const todo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (todo) setTodos(todo);
  }, []);

  // function to toggle todo for selecting it
  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  // function to add todo in TODOS ARRAY
  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return alert("input cannot be left empty");
    setTodos((prevTodos) => {
      return [...prevTodos, { id: v4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  // function for removing todos which are selected
  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <center style={{ marginTop: "100px" }}>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <br />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter((todo) => !todo.complete).length} left todo</div>
    </center>
  );
}

export default App;
