const express = require("express");
require("dotenv").config();
const serverless = require("serverless-http");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const router = require("./Routers");

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use(express.static("profiles"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.DB_URL, {})
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("", router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running ....${port}`);
});
