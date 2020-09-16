import React from 'react';
import { jaggedCircle } from '../utils/svg';
import styled from 'styled-components';
import { ValueSuggestion } from '../Input';

export const meta: ElementMeta = {
  position: 'left',
  type: 'text',
  percentage: 14.3,
  inputs: ['text'],
  keywords: [['殘り', '殘', 'のこり', 'あと'], ['$num'], ['$date']],
};

export const defaultProps: ElementPropDesciptor = {
  colors: ['$primary', '$background', '$secondary'],
  values: ['のこり', '3', '日'],
};

interface Props extends ElementPropDesciptor {
  suggestion: ValueSuggestion;
}

export const predict = (suggestion: ValueSuggestion): { fulfill: boolean; values: string[] } => {
  const predictFirst = () => {
    let answer: [number, string] = [0, ''];
    suggestion.valueSuggestions[0]?.forEach((s) => {
      // if top match from string score, assume the word is the best choice
      if (s.sum > answer[0]) answer = [s.sum, s.word];
    });
    return answer[1];
  };
  const predictSecond = () => {
    let answer: [number, string] = [0, ''];
    suggestion.valueSuggestions[1]?.forEach((s) => {
      // if top match from string score, assume the word is the best choice
      if (s.sum > answer[0]) answer = [s.sum, s.word];
    });
    return answer[1];
  };
  const predictThird = () => {
    let answer: [number, string] = [0, ''];
    suggestion.valueSuggestions[2]?.forEach((s) => {
      // if top match from string score, assume the word is the best choice
      if (s.sum > answer[0]) answer = [s.sum, s.word];
    });
    return answer[1].substr(0, 1);
  };
  const values = [predictFirst(), predictSecond(), predictThird()];
  return { fulfill: !!values[0] && !!values[1] && !!values[2], values };
};

const JaggedCircleText = ({ colors, values, borderType, suggestion }: Props) => {
  const [primary, bg, second] = colors || [];
  const isVariation = Math.random() > 0.5;

  let finalColors: string[] = [];
  if (isVariation) {
    finalColors = ['#fff', second];
  } else {
    if (borderType) {
      finalColors = [bg, primary];
    } else {
      finalColors = [primary, '#fff'];
    }
  }
  return (
    <StyledJaggedCircleTextA>
      <StyledJaggedCircle viewBox="0 0 20 20">
        <path d={jaggedCircle(20)} fill={finalColors[1]} />
      </StyledJaggedCircle>
      <StyledText color={finalColors[0]} style={{ top: '23%', left: '4%', fontSize: 20 }}>
        {values[0]}
      </StyledText>
      <StyledText color={finalColors[0]} style={{ top: '42%', left: '3%', fontSize: 36 }}>
        {values[1]}
      </StyledText>
      <StyledText color={finalColors[0]} style={{ top: '46%', left: '40%', fontSize: 28 }}>
        {values[2]}
      </StyledText>
    </StyledJaggedCircleTextA>
  );
};

const StyledJaggedCircleTextA = styled.div`
  max-width: ${meta.percentage}%;
  min-width: ${meta.percentage}%;
  position: relative;
  display: flex;
  align-self: stretch;
`;

const StyledText = styled.div<{ color: string }>`
  position: absolute;
  color: ${(props) => props.color};
  font-size: 20px;
  transform: rotateZ(-10deg);
  font-weight: 900;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
    sans-serif;
`;

const StyledJaggedCircle = styled.svg`
  position: absolute;
  display: block;
  top: -30%;
  left: -65%;
  height: 160%;
  width: 160%;
  filter: drop-shadow(3px 3px 8px rgba(0, 0, 0, 0.2));
`;

export default JaggedCircleText;
