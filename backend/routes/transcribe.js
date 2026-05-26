import dotenv from "dotenv";
dotenv.config();

import Transcription from "../models/Transcription.js";
import express from "express";
import multer from "multer";
import fs from "fs";
import { createClient } from "@deepgram/sdk";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

router.post("/", upload.single("audio"), async (req, res) => {
  try {

    const audioFile = fs.readFileSync(req.file.path);

    const { result, error } =
      await deepgram.listen.prerecorded.transcribeFile(
        audioFile,
        {
          model: "nova-2",
          smart_format: true,
        }
      );

    if (error) {
      console.log(error);

      return res.status(500).json({
        message: "Transcription failed",
      });
    }

    const text =
      result.results.channels[0].alternatives[0].transcript;

    try {
  await Transcription.create({
    text,
    fileName: req.file.originalname,
  });

  console.log("Saved to MongoDB ✅");

} catch (dbError) {

  console.log("MongoDB Save Failed ❌");
  console.log(dbError);
}

res.json({
  text,
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;