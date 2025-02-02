const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const { chats } = require("./data/data");
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");

dotenv.config();

mongoose.connect(
  "mongodb://localhost:27017/ChatApp",
  console.log("MongoDb Connected!")
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/chat',chatRoute)

app.use("/api/user", userRoute);

app.use("/api/message", messageRoute);

app.use((req, res) => {
  res.redirect("/"); // Redirect to home route
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Running on port: ${PORT}`));
