import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { body, validationResult } from "express-validator";
import { hashpassword, meGlobalhu } from "./midlewares.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use(meGlobalhu);

const validateData = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
];

app.get("/", validateData, hashpassword, (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("---Main Function---" + req.hashpassword);
  res.send("Middlewares");
});

app.all("*", (req, res) =>
  res.send("Oops! the link you are trying to reach doesn't exist")
);

app.listen(PORT, () => console.log(`Server is up and running::${PORT}`));
