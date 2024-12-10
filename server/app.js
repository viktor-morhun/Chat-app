const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

const corsOptions = {
  origin: "*"};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

module.exports = app;
