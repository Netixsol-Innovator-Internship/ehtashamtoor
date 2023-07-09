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
// const cookieParser = require("cookie-parser");

const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: process.env.mySecret,
    resave: false,
    saveUninitialized: false,
  })
);
// app.use(cookieParser(process.env.mySecret));
app.use(passport.initialize());
app.use(passport.session());

initialize(passport);

// console.log(PORT);
app.get("/", (req, res) => {
  console.log(req.isAuthenticated());
  // return res.send({ message: "redirect to home" });
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
    successRedirect: "/success",
    failureRedirect: "/failure",
  })
);

app.get("/success", (req, res) => {
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    res.status(200).json({ message: "Login successful", user: req.user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.get("/failure", (req, res) => {
  console.log(req.isAuthenticated())
  res.status(401).json({ message: "Login failed" });
});

// (req, res, next) => {
//   passport.authenticate("local",
//   (err, user, info) => {
//     if (err) {
//       // console.log(err);
//       throw err;
//     }
//     if (info) {
//       // console.log(info);
//       return res.send({ message: info.message });
//     }
//     if (user) {
//       // console.log(user);
//       req.logIn(user, (err) => {
//         if (err) throw err;
//         req.user = user;
//         return res.send({ message: "Login Success", user });
//       });
//     }
//   })(req, res, next);
// }

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
function checkNotAuthenticated(req, res, next) {
  console.log("into not check auth", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return res.send({ message: "No user present" });
  }

  return next();
}

// *************************** Connect app to MongoDB ********************
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("<<< Server is up and running >>>");
  });
});

module.exports = app;
