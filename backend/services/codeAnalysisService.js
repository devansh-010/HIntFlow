const analyzeCode = (code) => {

  const matches = code.match(/for/g) || [];

  return {
    hasNestedLoops: matches.length >= 2
  };
};

module.exports = {
  analyzeCode
};