const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");

const app = express();

app.use(bodyParser.json());
app.use("/api", indexRouter);

const mongoURI = `mongodb://localhost:27017/todo-demo`;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected!");
  })
  .catch((error) => console.log("DB connection fail", error));

app.listen(5001, () => {
  console.log("Server is on 5001");
});
