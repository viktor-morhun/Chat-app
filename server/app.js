const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

const corsOptions = {
  origin: "https://chat-app-reenbit.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

module.exports = app;
