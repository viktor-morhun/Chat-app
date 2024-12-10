const Message = require("../models/Message");
const Chat = require("../models/Chat");
const axios = require("axios");

const QUOTES_URL = process.env.QUOTES_URL;

exports.createMessage = async (req, res) => {
  const { chatId, content, sender } = req.body;

  try {
    const message = new Message({ chat: chatId, content, sender });
    await message.save();

    const chat = await Chat.findById(chatId);
    chat.messages.push(message._id);
    await chat.save();

    const response = await axios.get(QUOTES_URL);
    const quote = response.data.data.quote;

    const botMessage = new Message({
      chat: chatId,
      content: quote,
      sender: "bot",
    });
    await botMessage.save();

    chat.messages.push(botMessage._id);
    await chat.save();

    res.status(201).json({ userMessageId: message._id, botMessage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMessage = async (req, res) => {
  const { content } = req.body;

  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
