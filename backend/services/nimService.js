const axios = require("axios");

const testNimConnection = async () => {
  try {
    const response = await axios.post(
      "https://integrate.api.nvidia.com/v1/chat/completions",
      {
        model: "meta/llama-3.3-70b-instruct",
        messages: [
          {
            role: "user",
            content: "Say hello from NVIDIA NIM"
          }
        ],
        max_tokens: 50
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NIM_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("NIM Error:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = {
  testNimConnection
};