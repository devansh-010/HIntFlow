const analyzeCode = (code) => {

  const matches = code.match(/for/g) || [];

  const hasNestedLoops = matches.length >= 2;

  let feedback = "No specific feedback available.";

  if (hasNestedLoops) {
    feedback = "Your solution appears to use a brute-force approach.";
  }

  return {
    hasNestedLoops,
    approach: hasNestedLoops ? "Brute Force" : "Unknown",
    feedback
  };
};

module.exports = {
  analyzeCode
};