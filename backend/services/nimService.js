const axios = require("axios");

const generateHintWithAI = async (
  problem,
  code,
  analysis,
  hintLevel,
  fallbackHint
) => {
  try {
    const prompt = `
You are HintFlow, an AI DSA mentor.

Rules:
- Never give the full solution.
- Never give complete code.
- Help the student think.
- Give hints according to the hint level.

Hint Levels:

Level 1:
Give only a conceptual direction.
Do not mention specific algorithms or data structures.

Level 2:
Mention a useful data structure or technique.
Do not explain implementation details.

Level 3:
Explain the approach the student should consider.
Do not provide complete code.

Level 4:
Provide step-by-step guidance.
Never provide the final solution or complete code.

Problem:
${problem}

Reference Hint:
${fallbackHint}

Detected Approaches:
${analysis.approaches.join(", ")}

Student Code:
${code}

Current Hint Level:
${hintLevel}

Generate exactly one hint.
`;

    const response = await axios.post(
      "https://integrate.api.nvidia.com/v1/chat/completions",
      {
        model: "meta/llama-3.3-70b-instruct",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 150
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NIM_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error(
      "NIM Error:",
      error.response?.data || error.message
    );

    return "Unable to generate AI hint.";
  }
};

module.exports = {
  generateHintWithAI
};