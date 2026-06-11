const hints = require("../data/hints");
const { analyzeCode } = require("../services/codeAnalysisService");

const generateHint = (req, res) => {

  // Extract values from request body
  const { problem, code, language, hintLevel } = req.body;
  const analysis = analyzeCode(code);

  // Find the requested problem
  const selectedProblem = hints[problem];

  // Check if problem exists
  if (!selectedProblem) {
    return res.status(404).json({
      error: "Problem not found"
    });
  }

  // Find the requested hint level
  const hint = selectedProblem[hintLevel];
  let personalizedHint = hint;

  if (analysis.approach === "Brute Force") {
    personalizedHint =
      `${analysis.feedback} ${hint}`;
  }

  // Check if hint level exists
  if (!hint) {
    return res.status(400).json({
      error: "Invalid hint level"
    });
  }

  // Return successful response
  res.json({
    problem,
    language,
    code,
    hintLevel,
    hint: personalizedHint,
    analysis
  });
};

module.exports = {
  generateHint
};