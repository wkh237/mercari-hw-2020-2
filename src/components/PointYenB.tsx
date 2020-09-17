import React from 'react';
import { getBasicPredictor } from '../utils/predict';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';

export const meta: ElementMeta = {
  type: 'point',
  percentage: 45,
  position: 'any',
  inputs: ['text', 'text'],
  keywords: [['最大', 'max'], ['$num:6:2']],
};

export const defaultProps: ElementPropDesciptor = {
  colors: ['$secondary'],
  values: ['最大', '1000'],
};

export const predict: ValuePredictor = getBasicPredictor(meta.keywords.length);

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

const StyledValue = styled.div`
  font-size: 60px;
  font-weight: 700;
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

const StyledPointYenAdjective = styled.div`
  writing-mode: vertical-lr;
  font-size: 25px;
  font-weight: 700;
`;

const PointYenB = ({ values, colors }: { values: string[]; colors: string[] }) => {
  const [left, amount] = values;
  const [secondary] = colors || [];
  let textColor = tinycolor(secondary);
  return (
    <StyledPointYen textColor={textColor.toHex8String()}>
      {left && <StyledPointYenAdjective>{left}</StyledPointYenAdjective>}
      <StyledValue>{amount}</StyledValue>
      <StyledPointYenWord>
        <div>
          <span>円</span>
          <span>分</span>
        </div>
        <div>ポイント</div>
      </StyledPointYenWord>
    </StyledPointYen>
  );
};

export default PointYenB;
