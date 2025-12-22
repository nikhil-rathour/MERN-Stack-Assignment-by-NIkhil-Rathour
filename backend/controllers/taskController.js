const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || title.trim() === "") {
      return res.status(400).json({ msg: "Task title is required" });
    }
    
    const task = await Task.create({ ...req.body, userId: req.userId });
    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title || title.trim() === "") {
      return res.status(400).json({ msg: "Task title is required" });
    }
    
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.json({ msg: "Task deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
