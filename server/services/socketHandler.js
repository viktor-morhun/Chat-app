const { Server } = require("socket.io");
const axios = require("axios");
const Chat = require("../models/Chat");
const Message = require("../models/Message");

const socketHandler = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });
  const QUOTES_WS_URL = process.env.QUOTES_WS_URL;
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    const sendRandomMessage = async () => {
      try {
        const chats = await Chat.find();
        if (chats.length > 0) {
          const randomChat = chats[Math.floor(Math.random() * chats.length)];
          const response = await axios.get(QUOTES_WS_URL);
          const quote = response.data.data.quote;

          const message = new Message({
            chat: randomChat._id,
            content: quote,
            sender: "bot",
          });
          await message.save();

          randomChat.messages.push(message._id);
          await randomChat.save();

          io.emit("random-message", message);
        }
      } catch (err) {
        console.error("Error sending random message:", err.message);
      }
    };

    const intervalId = setInterval(sendRandomMessage, 6000);

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
      clearInterval(intervalId);
    });
  });
};

module.exports = socketHandler;
