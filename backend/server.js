import dotenv from "dotenv";
dotenv.config();

import historyRoutes from "./routes/history.js";
import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import uploadRoute from "./routes/upload.js";
import transcribeRoute from "./routes/transcribe.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/upload", uploadRoute);
app.use("/transcribe", transcribeRoute);
app.use("/history", historyRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});