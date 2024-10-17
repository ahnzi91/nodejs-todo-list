const Task = require("../model/Task");

const taskController = {};

// Create List
taskController.createTask = async (req, res) => {
  // task, isComplete => FE에서 넘어오는 데이터
  // req.body에 데이터가 담겨져 있다.

  try {
    const { task, isComplete } = req.body;
    const newTask = new Task({ task, isComplete });
    await newTask.save();

    res.status(200).json({ status: "Success", data: newTask });
  } catch (error) {
    res.status(400).json({ status: "Fail", error: error });
  }
};

// Read Lists
taskController.getTask = async (req, res) => {
  try {
    // Task Model에서 모든 List를 전달받아야 한다.
    const taskList = await Task.find({}).select("-__v");

    res.status(200).json({ status: "Success", data: taskList });
  } catch (error) {
    res.status(400).json({ status: "Fail", error: error });
  }
};

// Update List
taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, isComplete } = req.body;

    // 해당 Task를 찾아서 업데이트
    const updateTask = await Task.findByIdAndUpdate(
      id,
      { task, isComplete },
      { new: true, runValidators: true }
    );

    if (!updateTask) {
      return res.status(404).json({ status: "Fail", error: "Task not found" });
    }

    res.status(200).json({ status: "Success", data: updateTask });
  } catch (error) {
    res.status(400).json({ status: "Fail", error: error });
  }
};

// Delete Task
taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTask = await Task.findByIdAndDelete(id);

    if (!deleteTask) {
      return res.status(404).json({ status: "Fail", error: "Task not found" });
    }

    res.status(200).json({ status: "Success", message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ status: "Fail", error: error });
  }
};

module.exports = taskController;
