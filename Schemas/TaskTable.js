const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true,
    trim: true,
  },
  task: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
  },
  urgency: {
    type: Number,
    enum: [0, 1, 2],
  },
  isCheckedTask: {
    type: Boolean,
    default: false,
  },
  time: {
    type: String,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
