import React, { useState, useEffect } from 'react';
import Elements from './components';
import styled from 'styled-components';
import 'string_score';

type ElementKey = keyof typeof Elements;
type DescriptorMatchResult = Record<string, number>;
interface KeywordMatchResult {
  topMatch: string;
  sum: number;
  word: string;
  matches: DescriptorMatchResult;
}
interface InputProps {
  commitChange: (suggestions: ElementSuggestion) => void;
}
export type ElementSuggestion = Record<
  ElementKey,
  {
    score: number;
    valueSuggestions: Record<number, KeywordMatchResult[]>;
  }
>;
const ElementKeys = Object.keys(Elements);
const DescriptorWeight = {
  $len: 0.5,
  $num: 1.5,
  $date: 1.5,
};

let debounce: NodeJS.Timeout | null = null;

const matchElements = (words: string[]) => {
  const q = [...words];
  const ranksByWord: Record<string, Record<ElementKey, KeywordMatchResult[]>> = {};
  while (q.length) {
    const word = q.shift();
    if (!word) break;
    // match elements with the word
    // word -> elementA --> kw1 --> d1, d2 ,d3 ...
    //                  --> kw2 --> d1, d2 ,d3 ...
    //                  --> kw3 --> d1, d2 ,d3 ...
    for (let id of ElementKeys) {
      // match the word with each keywords of the element and get a score
      const kw = Elements[id].meta.keywords;
      const result: Array<KeywordMatchResult> = [];
      for (let descriptors of kw) {
        let top: [string, number] = ['', 0];
        let sum = 0;
        // a map that records scores for each desciptor
        const scoreMap = descriptors.reduce<DescriptorMatchResult>((acc, des) => {
          let score = 0;
          // use length score
          if (des.startsWith('$len')) {
            const [, max, min] = des.split(':');
            // stric text length $len:n:n
            if (max === min && word.length === +max) {
              score = DescriptorWeight.$len;
            } 
            // ranged text length $len:n1:n2 or $len:n1
            else {
              const diff = Math.abs(word.length - +max);
              const matchedLen = Math.max(+max - diff, 0);
              score = (matchedLen / +max) * DescriptorWeight.$len;
              // the score would be zero if lower bound is defined and word length smaller than lower bound
              if (min !== undefined && word.length < +min) {
                score = 0;
              }
            }
          } else if (des === '$date') {
            if (word === '日' || word === '月' || word === '年' || word === '分' || word === '週')
              score = DescriptorWeight.$date;
          } else if (des === '$num') {
            if (/[一二三四五六七八九十百千萬億零0123456789１２３４５６７８９０]/.test(word))
              score = DescriptorWeight.$num;
          }
          // use string score
          else {
            score = `${word}`.score(des, 0.5);
          }
          // update top match if the score is larger than current one
          if (score > top[1]) {
            top = [des, score];
          }
          // add score to sum with extra weight
          if (sum >= 1) sum += score * 0.1;
          else sum += score;
          acc[des] = score;
          return acc;
        }, {});
        result.push({
          topMatch: top[0],
          sum: sum / kw.length,
          word,
          matches: scoreMap,
        });
      }
      if (result.length > 0) {
        ranksByWord[word] = ranksByWord[word] || {};
        ranksByWord[word][id] = result;
      }
    }
  }
  console.log(ranksByWord);
  const elementSuggestions: ElementSuggestion = {};
  for (let word in ranksByWord) {
    const elementMatches = ranksByWord[word];
    for (let elementId in elementMatches) {
      elementSuggestions[elementId] = elementSuggestions[elementId] || {
        score: 0,
        valueSuggestions: [],
      };
      ranksByWord[word][elementId].forEach((d, i) => {
        if (d.sum > 0) {
          elementSuggestions[elementId].valueSuggestions[i] = elementSuggestions[elementId].valueSuggestions[i] || [];
          elementSuggestions[elementId].valueSuggestions[i].push(d);
          elementSuggestions[elementId].score += elementSuggestions[elementId].score >= 1 ? d.sum * 0.1 : d.sum;
        }
      });
    }
  }
  console.log(elementSuggestions);
  return elementSuggestions;
};

function Input({ commitChange }: InputProps) {
  const [value, setInputValue] = useState<string>('');

  useEffect(() => {
    if (debounce) clearTimeout(debounce);
    // calculate score and commit update
    debounce = setTimeout(() => {
      const suggestions = matchElements(value.split(/[ 　]/));
      commitChange(suggestions);
    }, 1000);
  }, [value, commitChange]);

  return (
    <StyledContainer>
      <StyledForm>
        <input
          type="text"
          placeholder="keywords separated by spaces .."
          onChange={(e) => {
            const val = e.target.value;
            setInputValue(val);
          }}
        />
        <button
          onClick={() => {
            const suggestions = matchElements(value.split(/[ 　]/));
            commitChange(suggestions);
          }}
        >
          Shuffle
        </button>
      </StyledForm>
    </StyledContainer>
  );
}

const StyledForm = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 100%;
  margin-bottom: 24px;
  background-color: inherit;
  button {
    align-self: stretch;
    border-radius: 0;
    border: 0;
    color: #4dc9ff;
    font-size: 10px;
    border-radius: 50px;
    height: 50px;
    width: 50px;
    font-weight: bold;
    text-align: center;
    outline: 0;
    cursor: pointer;
    border: 3px solid #4dc9ff;
    background-color: white;
    &:hover {
      background-color: #4dc9ff;
      color: white;
    }
    &:active {
      opacity: 0.8;
    }
  }
  > input {
    flex: 1;
    padding: 4px 10px;
    margin-right: 8px;
    font-size: 20px;
    border-radius: 12px;
    outline: 0;
    background-color: #efefef;
    width: 100%;
    flex: 1;
    border: 0;
    border: 2px solid transparent;
    &:focus {
      border-color: red;
    }
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0;
  margin: 0;
`;

export default Input;
