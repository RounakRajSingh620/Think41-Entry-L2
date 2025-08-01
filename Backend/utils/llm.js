const axios = require("axios");

async function getLLMResponse(messages) {
  const apiKey = process.env.GROQ_API_KEY;
  const url = "https://api.groq.com/openai/v1/chat/completions";

  const payload = {
    model: "llama3-70b-8192",
    messages,
    temperature: 0.7
  };

  try {
    const res = await axios.post(url, payload, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });

    return res.data.choices[0].message.content;
  } catch (error) {
    console.error("LLM API Error:", error.response?.data || error.message);
    return "Sorry, I'm unable to respond right now.";
  }
}

module.exports = { getLLMResponse };
