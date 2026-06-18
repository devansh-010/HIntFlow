const hints = require("../data/hints");
const { analyzeCode } = require("../services/codeAnalysisService");
const { generateHintWithAI } = require("../services/nimService");

const generateHint = async (req, res) => {

  // Extract values from request body
  const { problem, code, language, hintLevel, examples, constraints } = req.body;

  // Analyze student code
  const analysis = analyzeCode(code);

  // Find requested problem (optional — may not exist in hints.js)
  const selectedProblem = hints[problem];

  // Get fallback static hint, or build a generic one
  const fallbackHint = selectedProblem?.[hintLevel]
    || `Provide a Hint Level ${hintLevel} hint for this problem.`;

  // Default to fallback hint
  let finalHint = fallbackHint;

  try {
    const aiHint = await generateHintWithAI(
      problem,
      code,
      language,
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
    console.warn("AI hint generation failed, using fallback hint");
    // Fall back to static hint
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