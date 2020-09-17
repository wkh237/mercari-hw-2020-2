import React from 'react';
import styled from 'styled-components';

export const meta: ElementMeta = {
  percentage: 15,
  inputs: ['text'],
  position: 'any',
  type: 'image',
  keywords: [['mercari', 'メルカリ']],
};

export const defaultProps: ElementPropDesciptor = {
  values: [require('../assets/imgs/mercari-box.png')],
};

export const predict: ValuePredictor = (suggest, dict) => {
  let res: [string, number] = ['', 0];
  const consumedWords: string[] = [];
  suggest.valueSuggestions[0].forEach((s) => {
    if (dict[s.word] && s.sum > 0.8) {
      if (s.sum > res[1]) {
        if (s.topMatch === 'mercari' || s.topMatch === 'メルカリ')
          res = [require('../assets/imgs/mercari-box.png'), s.sum];
        consumedWords.push(s.word);
      }
    }
  });
  return { fulfill: !!res[0], values: [res[0]], consumedWords };
};

const ImageA = ({ values }: ElementPropDesciptor) => {
  return <StyledImage src={values[0]} />;
};

const StyledImage = styled.img`
  height: calc(100% - 20px);
  width: 15%;
`;

export default ImageA;
