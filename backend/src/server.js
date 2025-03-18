const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/database");
const taskRoutes = require("./routes/task.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("Database connection error:", err));
