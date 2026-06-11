const analyzeCode = (code) => {

  // Detect for-loops
  const matches = code.match(/for/g) || [];
  const hasNestedLoops = matches.length >= 2;

  // Detect hash maps
  const hashMapKeywords = [
    "unordered_map",
    "HashMap",
    "dict"
  ];

  let usesHashMap = false;

  for (const keyword of hashMapKeywords) {
    if (code.includes(keyword)) {
      usesHashMap = true;
      break;
    }
  }

  // Track all detected approaches
  const approaches = [];

  if (hasNestedLoops) {
    approaches.push("Brute Force");
  }

  if (usesHashMap) {
    approaches.push("Hash Map");
  }

  // Generate feedback
  let feedback = "No specific feedback available.";

  if (hasNestedLoops && usesHashMap) {
    feedback =
      "I can see both brute-force loops and hash map usage. Think about whether the hash map can eliminate the inner loop.";
  }
  else if (hasNestedLoops) {
    feedback =
      "Your solution appears to use a brute-force approach.";
  }
  else if (usesHashMap) {
    feedback =
      "Good direction. I can see hash map usage in your solution.";
  }

  return {
    hasNestedLoops,
    usesHashMap,
    approaches,
    feedback
  };
};

module.exports = {
  analyzeCode
};