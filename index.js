// index.js
const express = require("express");
const connectToDatabase = require("./db");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express and MongoDB!");
});

// Mount the task routes
app.use("/tasks", taskRoutes);

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectToDatabase();
});
