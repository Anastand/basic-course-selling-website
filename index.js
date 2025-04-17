require('dotenv').config();
const express = require("express");
const urouter = require("./routes/users");
const crouter = require("./routes/courses");
const arouter = require("./routes/admin");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

async function connection() {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log("bitch we connected")
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
    // await only works in async or try this in es6
  } catch (e) {
    console.log("bitch we aint connected")
  }
}

app.use('/user', urouter);
app.use('/admin', arouter);
app.use('/course', crouter);

connection();