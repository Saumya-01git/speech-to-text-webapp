import dotenv from "dotenv";
dotenv.config();

import express from "express";
import fs from "fs";
import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const audioPath = req.body.filePath;

    const transcription = await client.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "whisper-1",
    });

    res.json({
      text: transcription.text,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Transcription failed",
    });
  }
});

export default router;