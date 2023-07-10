const express = require("express");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
const dotenv = require("dotenv");
const connectDB = require("./dbConfig/db");
const bcrypt = require("bcrypt");
const userObj = require("./models/User");
const passport = require("passport");
const initialize = require("./passportConfig");
const session = require("express-session");
const flash = require("express-flash");

const app = express();

dotenv.config();
const PORT = process.env.PORT;
connectDB();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(flash());
initialize(passport);
app.use(
  session({
    secret: process.env.mySecret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// https://todoappauth.vercel.app

app.get("/", checkAuthenticated, (req, res) => {
  // console.log(req.isAuthenticated(), req.user);
  return res.send({ message: "redirect to home" });
});

app.get("/checkauth", (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ message: "auth" });
  }
});

app.get("/logout", (req, res) => {
  req.logOut(() => {});
  console.log(req.isAuthenticated());
  res.send({ message: "redirect to login" });
});
// register route
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  // console.log("register route", req.body);

  try {
    const hashedPass = await bcrypt.hash(password, 12);
    // console.log("hashedpassword===" + hashedPass);

    const user = await userObj.findOne({ username });
    console.log(user);
    if (user) {
      return res.send({ message: false });
    }

    const newUser = await userObj.create({
      username,
      email,
      password: hashedPass,
    });
    // console.log("newUser", newUser);

    await newUser.save();
    return res.status(200).send({ message: true });
  } catch (error) {
    console.log(error);
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    successFlash: true,
    failureRedirect: "/failure",
    successRedirect: "/success",
  })
);

app.get("/failure", (req, res) => {
  console.log("failure>>>>", req.isAuthenticated());
});
app.get("/success", (req, res) => {
  // console.log(req.user);
  if (req.isAuthenticated()) {
    console.log("authenticated");
    res.send({ message: "Login Success" });
  }
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

function checkAuthenticated(req, res, next) {
  console.log("into check auth", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }

  return res.send({ message: "redirect to login" });
}

// *************************** Connect app to MongoDB ********************
app.listen(PORT, () => {
  console.log("<<< Server is up and running >>>");
});
module.exports = app;
