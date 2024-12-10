const express = require("express");
const { createMessage, updateMessage, deleteMessage } = require("../controllers/messageController");
const router = express.Router();

router.post("/", createMessage);
router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);

module.exports = router;
