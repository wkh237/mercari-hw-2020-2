import React from 'react';
import styled from 'styled-components';
import { consumeTopMatched } from '../utils/predict';

export const meta: ElementMeta = {
  type: 'cuttingEdge',
  percentage: 3,
  position: 'center',
  inputs: [],
  keywords: [[]],
};

export const defaultProps: ElementPropDesciptor = {
  colors: ['$border'],
  values: [],
};

export const predict: ValuePredictor = (suggest, dict, skip) => {
  const consumedWords: string[] = [];
  const rseed = Math.random() < 0.5;
  if (rseed) {
    const value = consumeTopMatched(suggest.valueSuggestions[0], dict, consumedWords, skip);
    return { fulfill: !!value, values: [value], consumedWords };
  }
  return { fulfill: false, values: [], consumedWords: [] };
};

const CuttingEdge = ({ colors = [] }: ElementPropDesciptor) => {
  return (
    <StyledCuttingEdge colors={colors} dotColor={[]}>
      <div />
      <ul>
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
      <div />
    </StyledCuttingEdge>
  );
};

const StyledCuttingEdge = styled.div<{
  colors: string[];
  dotColor: string[];
}>`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: space-around;
  > ul {
    padding-inline-start: 20px;
    color: ${(props) => props.dotColor[3] || '#fff'};
    li {
      margin-top: -8px;
    }
  }
  div:first-child {
    width: 20px;
    height: 20px;
    border: 4px solid ${(props) => props.colors[0]};
    border-radius: 50%;
    position: absolute;
    top: -13px;
    background-color: ${(props) => props.colors[3] || '#efefef'};
    right: 20%;
  }
  div:last-child {
    width: 20px;
    height: 20px;
    border: 4px solid ${(props) => props.colors[0]};
    border-radius: 50%;
    position: absolute;
    bottom: -13px;
    background-color: ${(props) => props.colors[3] || '#efefef'};
    right: 20%;
  }
`;

export default CuttingEdge;
