const express = require("express");
const ejs = require("ejs");

// const bodyParser = require("body-parser");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//set view engine to ejs
app.set("view engine", "ejs");

// using res.render to load up an ejs view file

const PORT = 3000;

let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
let todos = [];
let index = 0;
app.get("/", (req, res) => {
  // getting date in a required format
  const today = new Date().toLocaleDateString("en-US", options);
  res.render("pages/index", { today: today, todos: todos, index: index });
});

app.post("/", (req, res) => {
  // getting item from form request on root route
  let newTodo = {
    text: req.body.addItem,
    completed: false,
  };
  // pushing items into todos array
  todos.push(newTodo);
  // and redirecting to our home route
  res.redirect("/");
});
app.listen(PORT, () => {
  console.log("Server is up and running");
});

app.post("/select-item", (req, res) => {
  let index = req.body.index;
  console.log(req.body);
  // console.log(index, todos);
  todos[index].completed = !todos[index].completed;
  res.sendStatus(200);
});
