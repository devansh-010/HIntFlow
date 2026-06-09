const hints = require("../data/hints");

const generateHint = (req, res) => {

  // Extract values from request body
  const { problem, hintLevel } = req.body;

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

  // Check if hint level exists
  if (!hint) {
    return res.status(400).json({
      error: "Invalid hint level"
    });
  }

  // Return successful response
  res.json({
    problem,
    hintLevel,
    hint
  });
};

module.exports = {
  generateHint
};