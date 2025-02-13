const mongoose = require('mongoose');
const express = require("express");

const app = express();
const port = 3000;


console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error.message);
  });




app.get("/", (req, res) => {
  res.send("Health check");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
