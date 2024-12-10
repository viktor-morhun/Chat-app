const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

module.exports = app;
