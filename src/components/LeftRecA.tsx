import React from 'react';
import styled from 'styled-components';
import { consumeTopMatched, isValuesNonEmpty } from '../utils/predict';

const LeftRecA = ({ colors, values, borderType }: ElementPropDesciptor) => {
  const [borderColor, primaryColor] = colors || [];
  return (
    <StyledContainer color={borderType ? '#fff' : primaryColor}>
      <StyledSVG width="139" height="90" viewBox="0 0 139 90">
        <path
          fill={borderType ? borderColor : '#fff'}
          d="M128.073 90H0V0H123.314C110.1 12.6769 123.94 18.1303 138.547 20.0801C132.506 23.1045 128 27.5474 128 32.5C128 36.9952 131.712 41.0706 136.915 44.0465C130.501 46.3994 126 49.8172 126 54.4C126 58.6883 129.941 63.2962 135.702 67.1501C127.081 69.6743 121.368 74.0838 121.061 79.3946C120.839 83.231 123.474 86.9251 128.073 90Z"
        />
      </StyledSVG>
      {values.map((s, i) => (
        <div key={i} contentEditable>{s}</div>
      ))}
    </StyledContainer>
  );
};

export const defaultProps: ElementPropDesciptor = {
  colors: ['$border', '$primary'],
  values: ['新規登錄者', '限定'],
};

export const meta: ElementMeta = {
  type: 'text',
  percentage: 20,
  position: 'left',
  inputs: ['text', 'text', 'text'],
  keywords: [['$len:5', '新規', '登錄者', '新規登錄者'], ['限定', '$len:3:2', 'のみ', '限る']],
};

export const predict: ValuePredictor = (suggestion, dict, skpiDict) => {
  const consumedWords: string[] = [];
  const result2 = consumeTopMatched(suggestion.valueSuggestions[1], dict, consumedWords, skpiDict);
  const result1 = consumeTopMatched(suggestion.valueSuggestions[0], dict, consumedWords, skpiDict);
  return { fulfill: isValuesNonEmpty(result1, result2) && result2.length <= 2, values: [result1, result2], consumedWords };
};

const StyledSVG = styled.svg`
  position: absolute;
  right: -2%;
  z-index: 2;
`;

const StyledContainer = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  line-height: 27px;
  max-width: ${meta.percentage + 1.5}%;
  min-width: ${meta.percentage + 1.5}%;
  flex: ${meta.percentage};
  justify-content: center;
  position: relative;
  color: ${(props) => props.color || 'white'};
  padding: 2px 6px;
  font-family: Roboto;
  > svg {
    transform: scale(1.1);
  }
  > div:nth-child(2) {
    font-size: 16px;
    letter-spacing: 1.5px;
    font-weight: bold;
  }
  > div:nth-child(3) {
    font-size: 36px;
    letter-spacing: 3px;
    font-weight: bold;
  }
  > div:nth-child(4) {
    font-size: 18px;
    letter-spacing: 3.3px;
    font-weight: bold;
  }
  > div {
    white-space: nowrap;
    z-index: 2;
  }
`;

export default LeftRecA;
