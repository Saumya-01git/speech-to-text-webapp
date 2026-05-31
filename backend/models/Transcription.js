import mongoose from "mongoose";

const transcriptionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      default: "Recorded Audio",
    },

    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transcription = mongoose.model(
  "Transcription",
  transcriptionSchema
);

export default Transcription;