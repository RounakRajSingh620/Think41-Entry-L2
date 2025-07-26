const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");
const getLLMResponse = require("../utils/llm");

router.post("/", async (req, res) => {
  const { userId, message } = req.body;

  let convo = await Conversation.findOne({ userId });
  if (!convo) {
    convo = new Conversation({ userId, messages: [] });
  }

  convo.messages.push({ content: message, sender: "user" });

  const aiReply = await getLLMResponse(message);
  convo.messages.push({ content: aiReply, sender: "ai" });

  await convo.save();
  res.json({ reply: aiReply });
});

module.exports = router;
