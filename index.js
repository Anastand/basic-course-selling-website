const express = require("express");
const urouter = require("./routes/users");
const crouter = require("./routes/courses");
const arouter = require("./routes/admin");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use('/user', urouter);
app.use('/admin', arouter);
app.use('/course', crouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});