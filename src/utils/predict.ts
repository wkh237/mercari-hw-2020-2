export const predictFirstMatchText: ValuePredictor = (suggestion) => {
  let result = suggestion.valueSuggestions[0][0];
  suggestion.valueSuggestions[0].forEach((s) => {
    if (s.sum > result.sum) {
      result = s;
    }
  });
  return { fulfill: !!result?.word, values: [result.word] };
};