const hints = require("../data/hints");
const { analyzeCode } = require("../services/codeAnalysisService");
const { generateHintWithAI } = require("../services/nimService");

const generateHint = async (req, res) => {

  // Extract values from request body
  const { problem, code, language, hintLevel, examples, constraints } = req.body;

  // Analyze student code
  const analysis = analyzeCode(code);

  // Find requested problem
  const selectedProblem = hints[problem];

  if (!selectedProblem) {
    return res.status(404).json({
      error: "Problem not found"
    });
  }

  // Get fallback static hint
  const fallbackHint = selectedProblem[hintLevel];

  if (!fallbackHint) {
    return res.status(400).json({
      error: "Invalid hint level"
    });
  }

  // Default to fallback hint
  let finalHint = fallbackHint;

  try {
    const aiHint = await generateHintWithAI(
      problem,
      code,
      analysis,
      hintLevel,
      fallbackHint,
      examples,
      constraints
    );

    if (aiHint) {
      finalHint = aiHint;
    }

  } catch (error) {
    console.log("Using fallback hint");
  }

  res.json({
    problem,
    language,
    code,
    hintLevel,
    hint: finalHint,
    analysis
  });
};

module.exports = {
  generateHint
};