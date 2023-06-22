const express = require("express");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
const PORT = process.env.API_PORT;

// todos array
let todos = [];
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log("SERVER IS UP AND RUNNING");
});
// console.log(PORT);
app.get("/", (req, res) => {
  // res.send("helloWorld");
  res.send({ todos });
});

app.post("/addTodo", [body("newTodo.value").notEmpty()], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.send({ message: "Todo empty" });
    return;
  }
  const { newTodo } = req.body;
  console.log("todo===", newTodo);

  // validate the todo here

  // now add it to the todos array
  todos.push(newTodo);
  console.log("TOODS ARRAY: ", todos);
  //send ok response to frontend
  res.send({ message: "Todo Added" });
});

app.delete("/deleteTodo", (req, res) => {
  const { id } = req.query;
  console.log("del todo id::::", id);

  // delete the todo using the todo id
  todos.forEach((todo, index) => {
    if (todo.id === id) {
      todos.splice(index, 1);
    }
  });
  console.log("deletedTodos ARRAY: ", todos);
  res.send({ message: "todo deleted" });
});

app.post("/editTodo", (req, res) => {
  const { editedtodo } = req.body;
  console.log("edited todo id::::", editedtodo);

  // edit the todo using the todo id
  todos.forEach((todo, index) => {
    if (todo.id === editedtodo.id) {
      todos.splice(index, 1, editedtodo);
    }
  });
  console.log("UpdatedTodos ARRAY: ", todos);
  res.send({ message: "Todo Edit" });
});

module.exports = app;
