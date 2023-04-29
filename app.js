const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
mongoose.connect("mongodb://127.0.0.1:27017/JoinUs", {
  useNewUrlParser: true,
});
const port = 3000;

//define mongooes schema
const joinSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  university: String,
  profession: String,
  address: String,
});

const Join = mongoose.model("Join", joinSchema);

app.use("/static", express.static("static")); //serving static files
app.use(express.urlencoded({ extended: true })); // use extended option

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/index.html", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/about.html", (req, res) => {
  res.sendFile(__dirname + "/about.html");
});
app.get("/join.html", (req, res) => {
  res.sendFile(__dirname + "/join.html");
});

app.post("/join", (req, res) => {
  console.log(req.body); // print data to terminal
  var myData = new Join(req.body);
  myData
    .save()
    .then(() => {
      const message = "Your form has been submitted.";
      res.send(`
      <html>
        <head>
          <script>
            alert("${message}");
            window.location.href = "/join.html";
          </script>
        </head>
        <body>
        </body>
      </html>
    `);
    })
    .catch(() => {
      res.status(400).send("item was not saved to the database");
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
