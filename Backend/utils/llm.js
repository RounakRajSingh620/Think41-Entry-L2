const axios = require("axios");

async function getLLMResponse(message) {
  const res = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "mixtral-8x7b-32768",
      messages: [{ role: "user", content: message }]
    },
    {
      headers: {
        Authorization: `Bearer YOUR_GROQ_API_KEY`
      }
    }
  );
  return res.data.choices[0].message.content;
}

module.exports = getLLMResponse;
