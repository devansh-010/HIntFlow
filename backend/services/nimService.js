const axios = require("axios");

const generateHintWithAI = async (
  problem,
  code,
  language,
  analysis,
  hintLevel,
  fallbackHint,
  examples = [],
  constraints = ""
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

Examples:
${examples.join("\n\n")}

Constraints:
${constraints}

Programming Language:
${language}

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

const generateChatResponse = async (
  problem,
  code,
  language,
  currentHint,
  hintLevel,
  question,
  chatHistory = []
) => {
  try {

    const conversation = chatHistory
      .map(
        msg => `${msg.role}: ${msg.content}`
      )
      .join("\n");

    const prompt = `
You are HintFlow, an AI DSA mentor.

Hint Levels:

Level 1:
Only conceptual guidance.
Do not reveal specific data structures, algorithms, or implementation details.

Level 2:
You may mention useful data structures or techniques.
Do not explain implementation details.

Level 3:
You may explain the approach.
Do not provide complete code.

Level 4:
You may provide detailed step-by-step guidance.
Do not provide the full solution.

Problem:
${problem}

Programming Language:
${language}

Student Code:
${code}

Current Hint:
${currentHint}

Hint Level:
${hintLevel}

Conversation History:
${conversation}

Student Question:
${question}

Answer the student's question clearly.

Use the current hint as context.

Do not provide the full solution unless explicitly requested.

Focus on helping the student learn.

IMPORTANT:
- Respect the current hint level.
- Do not reveal information beyond the current hint level.
- If the student's question would reveal a higher-level hint, respond with guidance appropriate to the current level.
- Build upon the current hint instead of introducing more advanced concepts.
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
        max_tokens: 300
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

    return "Unable to generate response.";
  }
};

module.exports = {
  generateHintWithAI,
  generateChatResponse
};