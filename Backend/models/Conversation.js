const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: { type: String, enum: ["user", "ai"], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ConversationSchema = new mongoose.Schema({
  user_id: { type: String, required: true },        
  session_id: { type: String, required: true },     
  messages: [MessageSchema],                        
  created_at: { type: Date, default: Date.now }     
});

module.exports = mongoose.model("Conversation", ConversationSchema);
