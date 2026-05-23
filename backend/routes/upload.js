import express from "express";
import multer from "multer";

const router = express.Router();

// storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// test upload route
router.post("/", upload.single("audio"), (req, res) => {
  try {
    console.log(req.file);
    res.json({
      message: "File uploaded successfully 🚀",
      file: req.file
    });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;