# Think41 Entry Level Project
# 💬 Conversational AI E-commerce Assistant

An intelligent full-stack conversational agent designed to assist users with e-commerce queries using LLM integration, MongoDB storage, and session-based interaction.

---

## 🚀 Features

- ✅ Real-time chat with AI (Groq's LLM)
- 🧠 Clarifies missing information
- 💾 Saves user conversations and sessions
- 🧑 Supports multiple users
- 🌐 Frontend-backend integration
- 🐳 Fully Dockerized setup

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Express.js (Node.js)
- **Database**: MongoDB
- **LLM**: Groq API (Mixtral/LLama3)
- **Containerization**: Docker + Docker Compos
---

## 📁 Project Structure
conversational-ai-app/
├── backend/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── server.js
│ ├── Dockerfile
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── App.jsx
│ │ └── index.js
│ ├── Dockerfile
│ ├── vite.config.js
│ └── package.json
├── docker-compose.yml
└── README.md



## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
(https://github.com/RounakRajSingh620/Think41-Entry-L2.git)
## ⚙️ Setup Instructions

docker compose up --build
🟢 Frontend: http://localhost:5173

🔵 Backend: http://localhost:5000

🗄 MongoDB: auto-starts with Compose

🧑‍💻 Author
Rounak Raj Singh
B.Tech CSE | Full Stack Developer
📫 GitHub: github.com/RounakRajSingh620
🔗 LinkedIn: linkedin.com/in/rounak-raj-singh/
