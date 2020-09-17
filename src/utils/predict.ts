export const predictFirstMatchText: ValuePredictor = (suggestion, dict, skipDict) => {
  const consumedWords: string[] = [];
  let result: [string, number] = ['', 0];
  suggestion.valueSuggestions[0].forEach((s) => {
    if (s.sum > result[1] && (skipDict || dict[s.word])) {
      result = [s.word, s.sum];
    }
  });
  if (result[0]) consumedWords.push(result[0]);
  return { fulfill: !!result[0], values: [result[0] || ''], consumedWords };
};

export const consumeTopMatched = (
  matches: KeywordMatchResult[],
  dictRef: Record<string, boolean>,
  consumedWordsRef: string[],
  skipDict?: boolean,
) => {
  if (!matches) return '';
  let res: [string, number] = ['', 0];
  matches.forEach((s) => {
    if ((dictRef[s.word] || skipDict) && s.sum > res[1]) {
      res = [s.word, s.sum];
    }
  });
  // if matched word is not empty, mark the word as used in dictionary
  if (res[0]) {
    consumedWordsRef.push(res[0]);
    dictRef[res[0]] = false;
  }
  return res[0];
};

export const isValuesNonEmpty = (...values: string[]) =>
  values.reduce((fulfill: boolean, str) => !!str && fulfill, true);

export const getBasicPredictor = (count: number) => {
  const predictor: ValuePredictor = (suggest, dict, skipDict) => {
    const consumedWords: string[] = [];
    const values: string[] = [];
    for (let i = 0; i < count; i++) {
      values.push(consumeTopMatched(suggest.valueSuggestions[i], dict, consumedWords, skipDict));
    }
    return { fulfill: isValuesNonEmpty(...values), values, consumedWords };
  };
  return predictor;
};
