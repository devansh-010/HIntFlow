const hints = {
  "Two Sum": {
    1: "Think about whether previous elements can help solve the problem.",
    2: "A hash map may help you store information efficiently.",
    3: "Look for the complement while traversing the array.",
    4: "Store numbers as keys and indices as values."
  },

  "Valid Parentheses": {
    1: "Think about how opening and closing brackets relate.",
    2: "You may need a way to remember unmatched opening brackets.",
    3: "A stack could help keep track of bracket order.",
    4: "Push opening brackets and pop when matching closing brackets appear."
  }
};

module.exports = hints;