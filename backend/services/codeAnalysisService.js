const analyzeCode = (code) => {

  const matches = code.match(/for/g) || [];

  const hasNestedLoops = matches.length >= 2;

  return {
    hasNestedLoops,
    approach: hasNestedLoops ? "Brute Force" : "Unknown"
  };
};

module.exports = {
  analyzeCode
};