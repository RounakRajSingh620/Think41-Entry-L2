import { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userId] = useState("user123"); // hardcoded for demo
  const [sessionId, setSessionId] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        user_id: userId,
        session_id: sessionId,
        message: input,
      });

      const aiMsg = { sender: "ai", text: res.data.response };
      setMessages((prev) => [...prev, aiMsg]);
      setSessionId(res.data.session_id); // store session
    } catch  {
      const errMsg = { sender: "ai", text: "⚠️ Error contacting the server." };
      setMessages((prev) => [...prev, errMsg]);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <h2>E-commerce Assistant</h2>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === "user" ? "user-msg" : "ai-msg"}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
