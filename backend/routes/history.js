import express from "express";
import Transcription from "../models/Transcription.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const history = await Transcription.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await Transcription.deleteMany({});
    res.json({ message: "All history cleared" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to clear history" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Transcription.findByIdAndDelete(req.params.id);
    res.json({ message: "History item deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete history item" });
  }
});

export default router;