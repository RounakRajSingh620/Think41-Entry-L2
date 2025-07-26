import { useState, useRef, useEffect } from "react";
import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userId] = useState("user123"); // Static user ID
  const [sessionId, setSessionId] = useState("");
  const chatEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

      // Set or reuse session ID
      setSessionId(res.data.session_id);
    } catch  {
      const errMsg = {
        sender: "ai",
        text: "⚠️ Error reaching the server. Please try again later.",
      };
      setMessages((prev) => [...prev, errMsg]);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <h2>💬 E-commerce AI Assistant</h2>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.sender === "user" ? "user-msg" : "ai-msg"}
          >
            <strong>{msg.sender === "user" ? "You" : "Assistant"}:</strong>{" "}
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="input-box">
        <input
          type="text"
          value={input}
          placeholder="Ask anything about our products..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
