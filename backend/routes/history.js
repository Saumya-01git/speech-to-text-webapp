import express from "express";
import Transcription from "../models/Transcription.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {

    const history = await Transcription.find()
      .sort({ createdAt: -1 });

    res.json(history);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch history",
    });
  }
});

export default router;