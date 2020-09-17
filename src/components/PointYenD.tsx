import React from 'react';
import { isValuesNonEmpty } from '../utils/predict';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';
import { isNumber, getNumberPart } from '../utils/text';

export const meta: ElementMeta = {
  type: 'point',
  percentage: 40,
  position: 'any',
  inputs: ['text'],
  keywords: [['$num'], ['¥', '円', '分', 'ポイント']],
};

export const defaultProps: ElementPropDesciptor = {
  colors: ['$secondary'],
  values: ['1000'],
};

export const predict: ValuePredictor = (suggest, dict) => {
  const consumedWords: string[] = [];
  let result: [number, string] = [0, ''];
  suggest.valueSuggestions[0]?.forEach((s) => {
    if (isNumber(s.word) && dict[s.word]) {
      if (s.sum > result[0]) result = [s.sum, getNumberPart(s.word)];
    }
  });
  let max2 = 0;
  suggest.valueSuggestions[1]?.forEach((s) => {
    if (meta.keywords[1].includes(s.word) && s.sum > 1) max2 = s.sum;
  });
  return {
    fulfill: isValuesNonEmpty(result[1]) && result[1].length <= 4 && max2 > 0,
    values: [result[1]],
    consumedWords,
  };
};

const StyledPointYen = styled.div<{ textColor: string }>`
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
    sans-serif;
  color: ${(props) => props.textColor};
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1;
  max-width: ${meta.percentage}%;
  min-width: ${meta.percentage}%;
`;

const StyledValue = styled.div<{ spacing: number }>`
  font-size: 60px;
  font-weight: 700;
  letter-spacing: -${(props) => props.spacing || 0}px;
`;

const StyledPointYenWord = styled.div`
  div:first-child {
    font-size: 32px;
    font-weight: 700;
    span:first-child {
      margin-right: 2px;
    }
  }
  div:nth-child(2) {
    font-size: 16px;
    font-weight: 700;
  }
`;

const PointYen = ({ values, colors }: { values: string[]; colors: string[] }) => {
  const [amount] = values;
  const [secondary] = colors || [];
  let textColor = tinycolor(secondary);
  return (
    <StyledPointYen textColor={textColor.toHex8String()}>
      <StyledValue spacing={12.5 * (amount.length - 2)} contentEditable>{amount}</StyledValue>
      <StyledPointYenWord>
        <div>
          <span contentEditable>円</span>
          <span contentEditable>分</span>
        </div>
        <div contentEditable>ポイント</div>
      </StyledPointYenWord>
    </StyledPointYen>
  );
};

export default PointYen;
