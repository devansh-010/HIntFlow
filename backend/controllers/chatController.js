const {
  generateChatResponse
} = require("../services/nimService");

const chatWithMentor = async (req, res) => {
  try {

    const {
      problem,
      code,
      currentHint,
      question,
      chatHistory
    } = req.body;

    const response =
      await generateChatResponse(
        problem,
        code,
        currentHint,
        question,
        chatHistory
      );

    res.json({
      response
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to get chat response"
    });

  }
};

module.exports = {
  chatWithMentor
};