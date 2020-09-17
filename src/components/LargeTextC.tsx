import React from 'react';
import styled from 'styled-components';
import { predictFirstMatchText } from '../utils/predict';

export const meta: ElementMeta = {
  type: 'text',
  percentage: 25,
  position: 'any',
  inputs: ['text'],
  keywords: [['$len:2:2', 'タダ', 'おまけ', 'フリー']],
};

export const defaultProps: ElementPropDesciptor = {
  color: '$foreground',
  values: ['無料'],
};

export const predict: ValuePredictor = predictFirstMatchText;

const LargeTextC = ({ color, values }: { color: string; values: string[] }) => (
  <StyledContainer color={color} contentEditable>{values[0]}</StyledContainer>
);

const StyledContainer = styled.div<{ color: string }>`
  display: flex;
  flex-direction: row;
  position: relative;
  align-self: center;
  justify-content: center;
  color: ${(props) => props.color};
  font-size: 68px;
  padding: 0px 4px;
  letter-spacing: -2px;
  font-weight: bolder;
  white-space: nowrap;
  font-family: CPFont;
`;

export default LargeTextC;
