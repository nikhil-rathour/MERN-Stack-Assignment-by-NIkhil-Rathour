const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const PORT = 5000

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/tasks", require("./routes/taskRoutes"));

app.get("/", (req, res) => res.send("TODO Backend Positive"));
app.listen(5000, () => console.log(`Server running on ${PORT}`));
