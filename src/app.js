const mongoose = require("mongoose");
const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer();
const routes = require("./routes");
const nodemailer = require("nodemailer");
const cors = require("cors");
const {
  PORT,
  MONGODB_URI,
  GMAIL_PASS,
  GMAIL_USER,
  VERIFICATION_TEAM_EMAIL,
} = require("./config.js");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error.message);
  });

app.use(cors());

app.get("/", (req, res) => {
  res.send("Health check");
});

app.use(express.json());

app.post("/verifications", async (req, res) => {
  try {

    const { user, story } = req.body;

    // Validate input
    if (!user || !story) {
      return res
        .status(400)
        .json({ error: "Missing user or story in request body" });
    }

    // Create transporter using Gmail (you can use other services too)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    console.log(transporter);


    // Email content
    const mailOptions = {
      from: GMAIL_USER,
      to: VERIFICATION_TEAM_EMAIL,
      subject: "New Verification Request",
      html: `
        <h2>New Verification Request Received</h2>
        <h3>User Details:</h3>
        <pre>${JSON.stringify(user, null, 2)}</pre>
        <h3>User Story:</h3>
        <p>${story}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Verification request sent successfully" });
  } catch (error) {
    console.error("Verification request failed:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "dogs",
    });

    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading image to Cloudinary" });
  }
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
