const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const Conversation = require("../models/Conversation");
const { getLLMResponse } = require("../utils/llm");

router.post("/", async (req, res) => {
  try {
    const { message, user_id = "guest_user", session_id } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required." });

    const session = session_id || uuidv4();

    // Get existing messages (if any)
    const existing = await Conversation.findOne({ user_id, session_id: session });

    let messages = [];

    if (existing) {
      // Use past messages
      messages = existing.messages.map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text
      }));
    } else {
      // Add system message if new conversation
      messages.push({
        role: "system",
        content: "You are a helpful e-commerce assistant. Ask clarifying questions before giving answers."
      });
    }

    // Append new user message
    messages.push({ role: "user", content: message });

    // Get AI response from LLM
    const aiResponse = await getLLMResponse(messages);

    // Update DB conversation
    await Conversation.findOneAndUpdate(
      { user_id, session_id: session },
      {
        $push: {
          messages: [
            { sender: "user", text: message },
            { sender: "ai", text: aiResponse }
          ]
        }
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ session_id: session, response: aiResponse });
  } catch (err) {
    console.error("Chat Route Error:", err);
    res.status(500).json({ error: "Something went wrong in chat route." });
  }
});

module.exports = router;
