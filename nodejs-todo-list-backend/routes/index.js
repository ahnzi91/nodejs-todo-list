const express = require("express");
const router = express.Router();
const taskRouter = require("./taskRouter");

router.use("/tasks", taskRouter);

module.exports = router;
