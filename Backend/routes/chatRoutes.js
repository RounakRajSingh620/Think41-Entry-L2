const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const Conversation = require("../models/Conversation");
const { getLLMResponse } = require("../utils/llm");

// POST /api/chat
router.post("/", async (req, res) => {
  try {
    const { message, user_id, session_id } = req.body;

    if (!message || !user_id) {
      return res.status(400).json({ error: "Message and user_id are required." });
    }

    // Generate session_id if not provided
    const session = session_id || uuidv4();

    // Get AI response
    const aiResponse = await getLLMResponse(message);

    // Update or create conversation
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
