const Chat = require("../models/Chat");

exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find().populate("messages");
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createChat = async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const chat = new Chat({ firstName, lastName });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateChat = async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const chat = await Chat.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName },
      { new: true }
    );
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteChat = async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
