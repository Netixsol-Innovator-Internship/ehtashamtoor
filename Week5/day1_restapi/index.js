import express from "express";
import bodyParser from "body-parser";

import usersRoutes from "./routes/users.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use("/users", usersRoutes);


app.all("*", (req, res) => res.send("Oops! the link you are trying to reach doesn't exist"));

app.listen(PORT, () => console.log(`Server is up and running`));
