// taskRoutes.js
const express = require("express");
const Task = require("../Schemas/TaskTable");

const router = express.Router();

// Express route to handle getting all tasks
router.get("/", async (req, res) => {
  try {
    // Retrieve all tasks from the database
    const allTasks = await Task.find();

    // Send the tasks as a JSON response
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Express route to handle creating a new task
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    // Extract task details from the request body
    const { header, task, date, urgency, time } = req.body;

    // Create a new task using the Task model
    const newTask = new Task({
      header,
      task,
      date,
      urgency,
      time,
    });

    // Save the task to the database
    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Express route to handle updating a task
router.put("/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { header, task, date, urgency, time, isCheckedTask } = req.body;

    // Update the task in the database
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        header,
        task,
        date,
        urgency,
        time,
        isCheckedTask,
      },
      { new: true, select: "-__v" }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Express route to handle deleting a task
router.delete("/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;

    // Delete the task from the database
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
