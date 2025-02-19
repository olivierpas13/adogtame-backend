const dotenv = require("dotenv");

dotenv.config();
const {
  PORT,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  GMAIL_USER,
  GMAIL_PASS,
  VERIFICATION_TEAM_EMAIL
} = process.env;

const MONGODB_URI =
  process.env.NODE_ENV === "development"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = {
  PORT,
  MONGODB_URI,
  GMAIL_USER,
  GMAIL_PASS,
  VERIFICATION_TEAM_EMAIL,
  CLOUD_NAME: CLOUDINARY_CLOUD_NAME,
  API_KEY: CLOUDINARY_API_KEY,
  API_SECRET: CLOUDINARY_API_SECRET,
};
