import React from 'react';
import { consumeTopMatched, isValuesNonEmpty } from '../utils/predict';
import styled from 'styled-components';
import { isNumber } from '../utils/text';

export const meta: ElementMeta = {
  type: 'text',
  percentage: 8,
  position: 'center',
  inputs: ['text'],
  keywords: [['$len:3:2', '実質', '抽選で']],
};

export const defaultProps: ElementPropDesciptor = {
  colors: ['$foreground', '$background'],
  values: ['抽選で'],
};

export const predict: ValuePredictor = (suggest, dict, skipDict) => {
  const consumedWords: string[] = [];
  const value = consumeTopMatched(suggest.valueSuggestions[0], dict, consumedWords, skipDict);
  return { fulfill: isValuesNonEmpty(value) && !isNumber(value) && value.length <= 3, values: [value], consumedWords };
};

const VertTextBubbleA = ({ colors, values }: { colors: string[]; values: string[] }) => {
  const [, textColor] = colors;
  return (
    <StyledContainer color={textColor}>
      <StyledSVG viewBox="0 0 230 332">
        <svg viewBox="0 0 230 332" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M188.881 224.011C192.837 205.953 195 186.406 195 166C195 74.3207 151.348 0 97.5 0C43.6522 0 0 74.3207 0 166C0 257.679 43.6522 332 97.5 332C133.249 332 164.504 299.243 181.476 250.398C189.089 250.851 196.747 249.89 201 249C213 246.5 235.3 239.3 228.5 230.5C214.528 233.775 200.416 229.85 188.881 224.011Z"
            fill="#fff"
          />
        </svg>
      </StyledSVG>
      <StyledContent>
        {values[0].split('').map((s, i) => (
          <div key={i}>{s}</div>
        ))}
      </StyledContent>
    </StyledContainer>
  );
};

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  font-size: 18px;
  font-weight: bolder;
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  width: 80%;
  height: 100%;
`;

const StyledContainer = styled.div<{ color: string }>`
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
    sans-serif;
  color: ${(props) => props.color};
  text-orientation: upright;
  padding: 4px 6px;
  padding-right: 0;
  min-width: ${meta.percentage}%;
  max-width: ${meta.percentage}%;
  min-height: 100%;
  display: flex;
  align-self: stretch;
  flex-direction: column;
`;
const StyledSVG = styled.svg`
  left: 0;
  top: 10%;
  height: 80%;
  width: 100%;
  position: absolute;
  z-index: 1;
`;

export default VertTextBubbleA;
